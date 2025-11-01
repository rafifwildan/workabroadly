import type { Request, Response } from "express";
import crypto from "crypto";
import Transaction from "../models/Transaction";
import User from "../models/User";

// Type definition untuk Midtrans Snap API response
interface MidtransSnapResponse {
  token: string;
  redirect_url: string;
}

// Produk yang tersedia (sama seperti Stripe sebelumnya)
const products = [
  {
    id: "basic",
    name: "Basic Plan",
    description: "100 tokens for career coaching",
    price: 50000,
    tokens: 100,
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "500 tokens for career coaching",
    price: 200000,
    tokens: 500,
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "1000 tokens for career coaching",
    price: 350000,
    tokens: 1000,
  },
];

// GET /api/midtrans/products - Ambil daftar produk
export async function getProducts(req: Request, res: Response) {
  try {
    res.json({ products });
  } catch (error: any) {
    console.error("[Midtrans Error]:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

// POST /api/midtrans/create-transaction - Buat transaksi baru
export async function createTransaction(req: Request, res: Response) {
  try {
    const { productId, userId, paymentType = "bank_transfer" } = req.body;

    // Validasi input
    if (!productId || !userId) {
      return res.status(400).json({ error: "Product ID and User ID are required" });
    }

    // Cari produk
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Cek user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    // Siapkan data untuk Midtrans API
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: product.price,
      },
      customer_details: {
        email: user.email,
        first_name: user.name,
      },
      item_details: [
        {
          id: product.id,
          price: product.price,
          quantity: 1,
          name: product.name,
        },
      ],
    };

    // NOTE: Tidak set payment_type di sini!
    // Biarkan user pilih method apapun di Snap page.
    // Payment type yang benar akan dikirim via webhook notification.

    // Call Midtrans Snap API
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const authString = Buffer.from(serverKey + ":").toString("base64");

    const response = await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(parameter),
    });

    const snapData = await response.json() as MidtransSnapResponse;

    if (!response.ok) {
      console.error("[Midtrans API Error]:", snapData);
      return res.status(response.status).json({ 
        error: "Failed to create transaction with Midtrans",
        details: snapData 
      });
    }

    // Simpan transaksi ke database
    const transaction = await Transaction.create({
      orderId: orderId,
      userId: userId,
      productId: product.id,
      amount: product.price,
      tokens: product.tokens,
      status: "pending",
      // paymentType akan di-update via webhook (sesuai pilihan user di Snap)
      transactionId: snapData.token, // Snap token dari Midtrans
    });

    // Return response
    res.json({
      success: true,
      orderId: orderId,
      token: snapData.token,
      redirect_url: snapData.redirect_url,
      transaction: transaction,
    });

  } catch (error: any) {
    console.error("[Midtrans Error]:", error);
    res.status(500).json({ error: "Failed to create transaction", message: error.message });
  }
}

// POST /api/midtrans/notification - Webhook dari Midtrans
export async function handleNotification(req: Request, res: Response) {
  try {
    const notification = req.body;
    
    console.log("[Midtrans Notification]:", JSON.stringify(notification, null, 2));

    // Verifikasi signature (PENTING untuk keamanan!)
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const orderId = notification.order_id;
    const statusCode = notification.status_code;
    const grossAmount = notification.gross_amount;
    const signatureKey = notification.signature_key;

    // Generate hash untuk verifikasi
    const hash = crypto
      .createHash("sha512")
      .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
      .digest("hex");

    // Verifikasi signature
    if (hash !== signatureKey) {
      console.error("[Midtrans] Invalid signature!");
      return res.status(403).json({ error: "Invalid signature" });
    }

    // Cari transaksi di database
    const transaction = await Transaction.findOne({ orderId: orderId });
    if (!transaction) {
      console.error("[Midtrans] Transaction not found:", orderId);
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Update status transaksi berdasarkan notifikasi
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    console.log(`[Midtrans] Transaction ${orderId} status: ${transactionStatus}, fraud: ${fraudStatus}`);

    // Logic untuk update status
    if (transactionStatus === "capture") {
      if (fraudStatus === "accept") {
        transaction.status = "settlement";
      }
    } else if (transactionStatus === "settlement") {
      transaction.status = "settlement";
    } else if (transactionStatus === "cancel" || transactionStatus === "deny" || transactionStatus === "expire") {
      transaction.status = transactionStatus;
    } else if (transactionStatus === "pending") {
      transaction.status = "pending";
    }

    // Update payment info
    transaction.paymentType = notification.payment_type;
    transaction.transactionId = notification.transaction_id;
    
    // Simpan VA number jika ada
    if (notification.va_numbers && notification.va_numbers.length > 0) {
      transaction.vaNumber = notification.va_numbers[0].va_number;
    }

    await transaction.save();

    // Jika pembayaran berhasil, tambahkan tokens ke user
    if (transaction.status === "settlement") {
      const user = await User.findById(transaction.userId);
      if (user) {
        user.tokens += transaction.tokens;
        await user.save();
        console.log(`[Midtrans] Added ${transaction.tokens} tokens to user ${user.email}`);
      }
    }

    res.json({ success: true, message: "Notification processed" });

  } catch (error: any) {
    console.error("[Midtrans Notification Error]:", error);
    res.status(500).json({ error: "Failed to process notification", message: error.message });
  }
}

// GET /api/midtrans/transaction/:orderId - Cek status transaksi
export async function getTransactionStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;

    const transaction = await Transaction.findOne({ orderId: orderId });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Optional: Query ke Midtrans untuk update status terbaru
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const authString = Buffer.from(serverKey + ":").toString("base64");

    const response = await fetch(`https://api.sandbox.midtrans.com/v2/${orderId}/status`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authString}`,
      },
    });

    const statusData = await response.json();

    res.json({
      transaction: transaction,
      midtrans_status: statusData,
    });

  } catch (error: any) {
    console.error("[Midtrans Error]:", error);
    res.status(500).json({ error: "Failed to get transaction status", message: error.message });
  }
}

// POST /api/midtrans/manual-webhook - Manual trigger webhook for localhost testing
// WARNING: Only use this in development! Remove in production!
export async function manualTriggerWebhook(req: Request, res: Response) {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ error: "orderId is required" });
    }

    // Cari transaksi
    const transaction = await Transaction.findOne({ orderId: orderId });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Update status transaksi menjadi settlement
    transaction.status = "settlement";
    await transaction.save();

    // Tambah tokens ke user
    const user = await User.findById(transaction.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.tokens += transaction.tokens;
    await user.save();
    
    console.log(`[Manual Webhook] Transaction ${orderId} status updated to settlement`);
    console.log(`[Manual Webhook] Added ${transaction.tokens} tokens to user ${user.email}`);

    res.json({ 
      success: true, 
      message: "Webhook triggered manually - transaction updated to settlement",
      transaction: {
        orderId: transaction.orderId,
        status: transaction.status,
        amount: transaction.amount,
        tokens: transaction.tokens
      },
      user: {
        email: user.email,
        tokens: user.tokens
      }
    });

  } catch (error: any) {
    console.error("[Manual Webhook Error]:", error);
    res.status(500).json({ error: "Failed to trigger webhook", message: error.message });
  }
}

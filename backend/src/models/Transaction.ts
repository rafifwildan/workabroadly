import mongoose, { Document, Schema } from "mongoose";

// Interface untuk TypeScript
export interface ITransaction extends Document {
  orderId: string;           // Order ID unik (contoh: "ORDER-123456")
  userId: string;            // ID user yang beli
  productId: string;         // ID produk (basic/pro/premium)
  amount: number;            // Harga dalam IDR
  tokens: number;            // Jumlah tokens yang dibeli
  status: string;            // Status: pending, settlement, expire, cancel
  paymentType?: string;      // Tipe pembayaran: bank_transfer, gopay, dll
  transactionId?: string;    // Transaction ID dari Midtrans
  vaNumber?: string;         // Virtual Account number (kalau pakai VA)
  createdAt: Date;
  updatedAt: Date;
}

// Schema MongoDB
const TransactionSchema = new Schema<ITransaction>(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    tokens: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "settlement", "expire", "cancel", "deny"],
    },
    paymentType: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    vaNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
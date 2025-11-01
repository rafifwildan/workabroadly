import { Router } from "express";
import { 
  getProducts, 
  createTransaction, 
  handleNotification,
  getTransactionStatus,
  manualTriggerWebhook
} from "../controllers/midtransController";

const router = Router();

// GET /api/midtrans/products - Get available products
router.get("/products", getProducts);

// POST /api/midtrans/create-transaction - Create new transaction
router.post("/create-transaction", createTransaction);

// POST /api/midtrans/notification - Webhook from Midtrans
router.post("/notification", handleNotification);

// GET /api/midtrans/transaction/:orderId - Check transaction status
router.get("/transaction/:orderId", getTransactionStatus);

// POST /api/midtrans/manual-webhook - Manual webhook trigger (DEVELOPMENT ONLY!)
// WARNING: Remove this in production!
if (process.env.NODE_ENV !== "production") {
  router.post("/manual-webhook", manualTriggerWebhook);
}

export default router;

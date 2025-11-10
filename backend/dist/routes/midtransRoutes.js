"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const midtransController_1 = require("../controllers/midtransController");
const router = (0, express_1.Router)();
// GET /api/midtrans/products - Get available products
router.get("/products", midtransController_1.getProducts);
// POST /api/midtrans/create-transaction - Create new transaction
router.post("/create-transaction", midtransController_1.createTransaction);
// POST /api/midtrans/notification - Webhook from Midtrans
router.post("/notification", midtransController_1.handleNotification);
// GET /api/midtrans/transaction/:orderId - Check transaction status
router.get("/transaction/:orderId", midtransController_1.getTransactionStatus);
// POST /api/midtrans/manual-webhook - Manual webhook trigger (DEVELOPMENT ONLY!)
// WARNING: Remove this in production!
if (process.env.NODE_ENV !== "production") {
    router.post("/manual-webhook", midtransController_1.manualTriggerWebhook);
}
exports.default = router;

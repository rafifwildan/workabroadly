"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const translateController_js_1 = require("../controllers/translateController.js");
const router = express_1.default.Router();
// Translate route (protected)
router.post("/", translateController_js_1.handleTranslation);
exports.default = router;
// authenticateToken,

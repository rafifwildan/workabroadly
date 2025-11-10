"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleplayController_js_1 = require("../controllers/roleplayController.js");
const progressController_js_1 = require("../controllers/progressController.js");
const router = express_1.default.Router();
router.post("/start", roleplayController_js_1.startRoleplay);
router.post("/answer", roleplayController_js_1.answerStep);
router.post("/end", roleplayController_js_1.endRoleplay);
router.get("/:userId", roleplayController_js_1.getUserRoleplays);
router.get("/progress/:userId", progressController_js_1.getUserProgress);
exports.default = router;

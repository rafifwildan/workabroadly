"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scenarioController_js_1 = require("../controllers/scenarioController.js");
const router = express_1.default.Router();
router.get("/", scenarioController_js_1.getAllScenarios);
router.get("/:id", scenarioController_js_1.getScenarioById);
router.post("/", scenarioController_js_1.createScenario);
exports.default = router;

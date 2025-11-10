"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllScenarios = getAllScenarios;
exports.getScenarioById = getScenarioById;
exports.createScenario = createScenario;
const RoleplayScenario_js_1 = __importDefault(require("../models/RoleplayScenario.js"));
async function getAllScenarios(req, res) {
    const scenarios = await RoleplayScenario_js_1.default.find().sort({ createdAt: -1 });
    res.json(scenarios);
}
async function getScenarioById(req, res) {
    const scenario = await RoleplayScenario_js_1.default.findById(req.params.id);
    if (!scenario)
        return res.status(404).json({ error: "Scenario not found" });
    res.json(scenario);
}
async function createScenario(req, res) {
    const newScenario = await RoleplayScenario_js_1.default.create(req.body);
    res.status(201).json(newScenario);
}

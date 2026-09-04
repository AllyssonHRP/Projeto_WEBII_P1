"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Situations_1 = require("../entity/Situations");
const router = express_1.default.Router();
router.get("/situations", (req, res) => {
    res.send("Bem vindo a tela API de situações!");
});
router.post("/situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = req.body;
        const newSituationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const newSituation = newSituationRepository.create(data);
        yield newSituationRepository.save(newSituation);
        res.status(201).json({
            messagem: "Situação criada com sucesso!",
            situation: newSituation
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao criar situação!",
        });
    }
}));
// Exportar a instrução da rota
exports.default = router;

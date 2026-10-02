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
// Buscar todas as situações
router.get("/situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        // Obter o número da página a partir da query string, padrão é 1
        const page = Number(req.query.page) || 1;
        // Limite de situações por página
        const limite = 1;
        const totalSituations = yield situationRepository.count();
        if (totalSituations === 0) {
            res.status(400).json({
                messagem: "Nenhuma situação encontrada!",
            });
            return;
        }
        // Calcular o número da última página
        const lastPage = Math.ceil(totalSituations / limite);
        if (page > lastPage) {
            res.status(400).json({
                messagem: "Página não encontrada! ${lastPage} páginas disponíveis.",
            });
            return;
        }
        // Calcular o offset para a consulta
        const offset = (page - 1) * limite;
        // Buscar as situações com paginação
        const situations = yield situationRepository.find({
            take: limite,
            skip: offset,
            order: {
                id: "DESC",
            }
        });
        res.status(200).json({
            currentPage: page,
            lastPage,
            totalSituations,
            situations,
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao buscar situações!",
        });
        return;
    }
}));
// Buscar uma situação específica pelo ID
router.get("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situations = yield situationRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!situations) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }
        res.status(200).json(situations);
        return;
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao buscar situações!",
        });
        return;
    }
}));
// Atualizar uma situação específica pelo ID
router.put("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situations = yield situationRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!situations) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }
        situationRepository.merge(situations, data);
        const updatedSituation = yield situationRepository.save(situations);
        res.status(200).json({
            messagem: "Situação atualizada com sucesso!",
            situation: updatedSituation
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao atualizar situações!",
        });
        return;
    }
}));
// Deletar uma situação específica pelo ID
router.delete("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situations = yield situationRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!situations) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }
        yield situationRepository.remove(situations);
        res.status(200).json({
            messagem: "Situação removida com sucesso!",
        });
    }
    catch (error) {
        res.status(500).json({
            messagem: "Erro ao remover situações!",
        });
    }
}));
// Criar uma nova situação
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

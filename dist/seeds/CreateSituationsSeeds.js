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
Object.defineProperty(exports, "__esModule", { value: true });
const Situations_1 = require("../entity/Situations");
class CreateSituationsSeeds {
    run(dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Iniciando a criação das situações...");
            const situationRepository = dataSource.getRepository(Situations_1.Situation);
            const existingCount = yield situationRepository.count();
            if (existingCount > 0) {
                console.log("As situações já foram criadas anteriormente. Pulando a criação.");
                return;
            }
            const situations = [
                { name: "Ativo" },
                { name: "Inativo" },
                { name: "Pendente" },
            ];
            yield situationRepository.save(situations);
            console.log("Seed concluído com sucesso! Situações criadas com sucesso.");
        });
    }
}
exports.default = CreateSituationsSeeds;

import {DataSource} from "typeorm";
import {Situation} from "../entity/Situations"

export default class CreateSituationsSeeds {
    public async run(dataSource: DataSource): Promise<void> {

        console.log("Iniciando a criação das situações...");

        const situationRepository = dataSource.getRepository(Situation);
        const existingCount = await situationRepository.count();

        if (existingCount > 0) {
            console.log("As situações já foram criadas anteriormente. Pulando a criação.");
            return;
        }

        const situations = [
            { name: "Ativo" },
            { name: "Inativo" },
            { name: "Pendente" },
        ];

        await situationRepository.save(situations as any);
        console.log("Seed concluído com sucesso! Situações criadas com sucesso.");

    }
}
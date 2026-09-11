import express, { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";

const router = express.Router()

// Buscar todas as situações
router.get("/situations", async (req: Request, res: Response) => {
  try {
    const situationRepository = AppDataSource.getRepository(Situation);
    const situations = await situationRepository.find();
    res.status(200).json(situations)
    return;
  } catch (error) {
    res.status(500).json({
      messagem: "Erro ao buscar situações!",
    });
    return;
  }
});

// Buscar uma situação específica pelo ID
router.get("/situations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const situationRepository = AppDataSource.getRepository(Situation);
    const situations = await situationRepository.findOneBy({ id: parseInt(id) })
    if (!situations) {
      res.status(404).json({
        messagem: "Situação não encontrada!",
      });
      return;
    }
    res.status(200).json(situations)
    return;
  } catch (error) {
    res.status(500).json({
      messagem: "Erro ao buscar situações!",
    });
    return;
  }
});

// Atualizar uma situação específica pelo ID
router.put("/situations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    var data = req.body;
    const situationRepository = AppDataSource.getRepository(Situation);
    const situations = await situationRepository.findOneBy({ id: parseInt(id) })
    if (!situations) {
      res.status(404).json({
        messagem: "Situação não encontrada!",
      });
      return;
    }
    situationRepository.merge(situations, data);
    const updatedSituation = await situationRepository.save(situations);
    res.status(200).json({
      messagem: "Situação atualizada com sucesso!",
      situation: updatedSituation
    });
  } catch (error) {
    res.status(500).json({
      messagem: "Erro ao atualizar situações!",
    });
    return;
  }
});

// Deletar uma situação específica pelo ID
router.delete("/situations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const situationRepository = AppDataSource.getRepository(Situation);
    const situations = await situationRepository.findOneBy({ id: parseInt(id) })
    if (!situations) {
      res.status(404).json({
        messagem: "Situação não encontrada!",
      });
      return;
    }
    await situationRepository.remove(situations);
    res.status(200).json({
      messagem: "Situação removida com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      messagem: "Erro ao remover situações!",
    });
  }
});

// Criar uma nova situação
router.post("/situations", async (req: Request, res: Response) => {
  try {
    var data = req.body;
    const newSituationRepository = AppDataSource.getRepository(Situation);
    const newSituation = newSituationRepository.create(data);
    await newSituationRepository.save(newSituation);

    res.status(201).json({
      messagem: "Situação criada com sucesso!",
      situation: newSituation
    });
  } catch (error) {

    res.status(500).json({
      messagem: "Erro ao criar situação!",
    });
  }

});

// Exportar a instrução da rota

export default router;
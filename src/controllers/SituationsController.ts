import express, { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";

const router = express.Router()

router.get("/situations", (req: Request, res: Response) => {
  res.send("Bem vindo a tela API de situações!");
});

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
import express, { Request, Response } from "express";

import { AppDataSource } from "../data-source";

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo ao meu servidor Express com TypeScript!");
});

// Exportar a instrução da rota

export default router;
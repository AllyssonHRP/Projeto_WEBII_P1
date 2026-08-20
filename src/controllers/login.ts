import express, { Request, Response } from "express";

import { AppDataSource } from "../data-source";

const router = express.Router()

AppDataSource.initialize().then(() => {
  console.log("Conexão com o banco de dados estabelecida com sucesso!");
}).catch((err) => {
  console.error("Erro na conexão com o banco de dados!", err)
});

router.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo ao meu servidor Express com TypeScript!");
});

// Exportar a instrução da rota

export default router;
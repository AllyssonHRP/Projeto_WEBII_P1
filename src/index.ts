import express from "express";

import dotenv from "dotenv";

dotenv.config();

const app = express();

import AuthController from "./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";

app.use("/", SituationsController);
app.use("/", AuthController);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});
import express from 'express';
import cors from 'cors';
import { consultarProdutos } from './produtos.js';
import { verificarSaude } from './health.js';

export function criarApp(pool) {
  const app = express();

  app.use(cors());
  app.get('/produtos', consultarProdutos(pool));
  app.get('/health', verificarSaude(pool));

  app.use((erro, _req, res, next) => {
    if (res.headersSent) return next(erro);
    console.error(erro);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  });

  return app;
}

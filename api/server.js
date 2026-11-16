import { criarApp } from './app.js';
import { criarPool } from './db.js';

const porta = Number(process.env.PORT || 3001);
const pool = criarPool(process.env.DATABASE_URL);
pool.on('error', (erro) => console.error('Erro no pool:', erro));

const servidor = criarApp(pool).listen(porta, () => {
  console.log(`API disponível em http://localhost:${porta}`);
});

function encerrar() {
  servidor.close(async (erro) => {
    try {
      await pool.end();
      if (erro) throw erro;
    } catch (falha) {
      console.error(falha);
      process.exitCode = 1;
    }
  });
}

process.once('SIGINT', encerrar);
process.once('SIGTERM', encerrar);

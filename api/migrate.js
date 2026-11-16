import { pathToFileURL } from 'node:url';
import { criarPool } from './db.js';

export async function migrar(url) {
  const pool = criarPool(url);
  try {
    const cliente = await pool.connect();
    try {
      await cliente.query('BEGIN');
      await cliente.query(`
        CREATE TABLE IF NOT EXISTS produtos (
          id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          nome TEXT NOT NULL UNIQUE,
          preco NUMERIC(12, 2) NOT NULL
        )
      `);
      await cliente.query(`
        INSERT INTO produtos (nome, preco)
        VALUES ('Caderno', 19.90), ('Caneta', 4.50), ('Mochila', 89.90)
        ON CONFLICT (nome) DO NOTHING
      `);
      await cliente.query('COMMIT');
    } catch (erro) {
      await cliente.query('ROLLBACK');
      throw erro;
    } finally {
      cliente.release();
    }
  } finally {
    await pool.end();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await migrar(process.env.DIRECT_URL);
  console.log('Banco preparado.');
}

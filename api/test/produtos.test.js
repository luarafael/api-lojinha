import assert from 'node:assert/strict';
import { once } from 'node:events';
import test from 'node:test';
import { criarApp } from '../app.js';
import { criarPool } from '../db.js';
import { migrar } from '../migrate.js';

test('GET /produtos retorna os três produtos do PostgreSQL', async (t) => {
  await migrar(process.env.TEST_DIRECT_URL);
  const pool = criarPool(process.env.TEST_DATABASE_URL);
  let servidor;

  t.after(async () => {
    try {
      if (servidor?.listening) {
        await new Promise((resolve, reject) => {
          servidor.close((erro) => erro ? reject(erro) : resolve());
        });
      }
    } finally {
      await pool.end();
    }
  });

  servidor = criarApp(pool).listen(0, '127.0.0.1');
  await once(servidor, 'listening');

  const { port } = servidor.address();
  const resposta = await fetch(`http://127.0.0.1:${port}/produtos`);
  assert.equal(resposta.status, 200);

  const produtos = await resposta.json();
  assert.deepEqual(produtos.map(({ nome, preco }) => ({ nome, preco })), [
    { nome: 'Caderno', preco: 'R$ 19,90' },
    { nome: 'Caneta', preco: 'R$ 4,50' },
    { nome: 'Mochila', preco: 'R$ 89,90' },
  ]);
  assert.ok(produtos.every(({ id }) => Number.isInteger(id)));
  assert.ok(produtos[0].id < produtos[1].id);
  assert.ok(produtos[1].id < produtos[2].id);
});

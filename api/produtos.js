import { formatarPreco } from './preco.js';

export function consultarProdutos(pool) {
  return async (_req, res, next) => {
    try {
      const { rows } = await pool.query(
        'SELECT id, nome, preco FROM produtos ORDER BY id',
      );

      res.json(rows.map(({ id, nome, preco }) => ({
        id,
        nome,
        preco: formatarPreco(preco),
      })));
    } catch (erro) {
      next(erro);
    }
  };
}

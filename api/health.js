export function verificarSaude(pool) {
  return async (_req, res) => {
    try {
      await pool.query('SELECT 1');
      res.status(200).json({ ok: true });
    } catch {
      res.status(503).json({ ok: false });
    }
  };
}

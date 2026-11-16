import pg from 'pg';

export function criarPool(connectionString) {
  if (!connectionString) {
    throw new Error('Informe a URL de conexão do PostgreSQL.');
  }

  return new pg.Pool({ connectionString, connectionTimeoutMillis: 5000 });
}

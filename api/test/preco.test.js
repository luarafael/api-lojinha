import assert from 'node:assert/strict';
import test from 'node:test';
import { formatarPreco } from '../preco.js';

test('formata preços em reais com duas casas decimais', () => {
  assert.equal(formatarPreco(19.9), 'R$ 19,90');
  assert.equal(formatarPreco(4.5), 'R$ 4,50');
  assert.equal(formatarPreco('89.90'), 'R$ 89,90');
});

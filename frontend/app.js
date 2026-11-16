const lista = document.querySelector('#produtos');
const status = document.querySelector('#status');

async function buscarProdutos() {
  const resposta = await fetch('http://localhost:3001/produtos');

  if (!resposta.ok) {
    throw new Error(`A API retornou HTTP ${resposta.status}.`);
  }

  return resposta.json();
}

async function exibirProdutos() {
  try {
    const produtos = await buscarProdutos();

    for (const { nome, preco } of produtos) {
      const item = document.createElement('li');
      item.textContent = `${nome}: ${preco}`;
      lista.append(item);
    }

    status.textContent = produtos.length ? '' : 'Nenhum produto disponível.';
  } catch {
    status.textContent = 'Não foi possível carregar os produtos.';
  }
}

exibirProdutos();

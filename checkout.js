import { apgarDoLocalStorage, desenharProdutoCarrinhoSimples, lerLocalStorage, salvarLocalStorage, catalago } from "./src/utilidades"; 

function desenharProdutosCheckout(){
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

    for (const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoCarrinhoSimples(idProduto, "container-produto-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }

    const precoCarrinho = document.getElementById("preco-total-checkout");
    let precoTotalCarrinho = 0;

    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
        precoTotalCarrinho += catalago.find(p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }

    precoCarrinho.innerHTML = `Total: $ ${precoTotalCarrinho}`;
}

function finalizarCompra(evento){
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade,
    }
    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
    salvarLocalStorage('historico', historicoDePedidosAtualizado);
    apgarDoLocalStorage("carrinho");
    window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener('submit', (evt) => finalizarCompra(evt));
import { desenharProdutoCarrinhoSimples, lerLocalStorage } from "./src/utilidades";

function criarPedidoHistorico(pedidoComData){
    const elementoPedido = `<p class="text-xl text-bold my-4">${new Date(pedidoComData.dataPedido).toLocaleDateString("pt-BR", {hour: "2-digit", minute: "2-digit"})}<p/>
    <section id="container-pedido-${pedidoComData.dataPedido}" class="bg-slate-300 p-3 rounded-md"><section/>`;
    const main = document.getElementsByTagName("main")[0];
    main.innerHTML += elementoPedido;

    for(const idProduto in pedidoComData.pedido){
        desenharProdutoCarrinhoSimples(idProduto, `container-pedido-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto]);
    }
}

function renderizarHistoricoPedidos(){
    const historico = lerLocalStorage("historico");
    for(const pedidosComData of historico){
        criarPedidoHistorico(pedidosComData);
    }
}

renderizarHistoricoPedidos();
import { catalago, lerLocalStorage, salvarLocalStorage } from "./utilidades";

const idsProdutoCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};

function abrirCarrinho(){
    document.getElementById("carrinho").classList.remove("right-[-360px]");
    document.getElementById("carrinho").classList.add("right-[0px]");
}

function fecharCarrinho(){
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout(){
    if(Object.keys(idsProdutoCarrinhoQuantidade).length === 0){
        return;
    }
    window.location.href = "./checkout.html";
}

export function inicializarCarrinho(){
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoIrParaCheckout = document.getElementById("finalizar-compra-checkout");

    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
    botaoIrParaCheckout.addEventListener('click', irParaCheckout);
    
    renderizarProdutosCarrinho();
    atualizarPrecoCarrinho();
}

function removerDoCarrinho(idProduto){
    delete idsProdutoCarrinhoQuantidade[idProduto];
    salvarLocalStorage("carrinho", idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
}

function incrementaQuantidadeProduto(idProduto){
    idsProdutoCarrinhoQuantidade[idProduto]++;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function decrementaQuantidadeProduto(idProduto){
    if(idsProdutoCarrinhoQuantidade[idProduto]===1) {
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoQuantidade[idProduto]--;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerHTML = idsProdutoCarrinhoQuantidade[idProduto];
}

function atualizarPrecoCarrinho(){
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;

    for (const idProdutoNoCarrinho in idsProdutoCarrinhoQuantidade){
        precoTotalCarrinho += catalago.find(p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoQuantidade[idProdutoNoCarrinho];
    }

    precoCarrinho.innerHTML = `Total: $ ${precoTotalCarrinho}`;
}

function desenharProdutoNoCarrinho(idProduto) {
    const produto = catalago.find((p) => p.id === idProduto);

    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");

    const elementoArticle = document.createElement("article");
    const articleClasses = ['flex', 'bg-slate-100', 'rounded-lg', 'p-1', 'relative']
    for (const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass);
    }

    const cartaoProdutoCarrinho = `
    <img src="./assets/img/${produto.imagem}.jpg" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justify-between">
        <p class="text-slate-900 text-sm">${produto.nome}</p>
        <p class="text-slate-400 text-xs">${produto.marca}</p>
        <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg border-2 rounded-lg px-2 py-1">
        <button id="decrementar-produto-${produto.id}">-<button/>
        <p id="quantidade-${produto.id}" class='ml-2 border-2 p-1'>${idsProdutoCarrinhoQuantidade[produto.id]}<p/>
        <button id="incrementar-produto-${produto.id}" class='ml-2'>+<button/>
    </div>
    <button id="remover-produto-${produto.id}" class="absolute top-0 right-2">
        <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
    </button>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);

    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click', () => decrementaQuantidadeProduto(produto.id));
    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click', () => incrementaQuantidadeProduto(produto.id));    
    document.getElementById(`remover-produto-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
}

function renderizarProdutosCarrinho() {
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = "";
    
    for (const idProduto in idsProdutoCarrinhoQuantidade){
        desenharProdutoNoCarrinho(idProduto);
    }
}

export function adicionarAoCarrinho(idProduto){
    if (idProduto in idsProdutoCarrinhoQuantidade){
        incrementaQuantidadeProduto(idProduto);
        return;
    }

    idsProdutoCarrinhoQuantidade[idProduto] = 1;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoQuantidade);
    atualizarPrecoCarrinho();
    desenharProdutoNoCarrinho(idProduto);
}
export const catalago = [
    {
        id: "1", 
        marca: 'Zara', 
        nome: 'Camisa Larga com Bolsos', 
        preco: 70, 
        imagem: 'product-1', 
        feminino: false, 
    }, 
    { 
        id: "2", 
        marca: 'Zara', 
        nome: 'Casaco Reto com Lã', 
        preco: 85, 
        imagem: 'product-2', 
        feminino: true, 
    }, 
    { 
        id: "3", 
        marca: 'Zara', 
        nome: 'Jaqueta com Efeito Camurça', 
        preco: 60, 
        imagem: 'product-3', 
        feminino: false, 
    }, 
    { 
        id: "4", 
        marca: 'Zara', 
        nome: 'Sobretudo em Mescla de Lã', 
        preco: 160, 
        imagem: 'product-4', 
        feminino: false, 
    }, 
    { 
        id: "5", 
        marca: 'Zara', 
        nome: 'Camisa Larga Acolchoada de Veludo Cotelê', 
        preco: 110, 
        imagem: 'product-5', 
        feminino: false, 
    }, 
    { 
        id: "6", 
        marca: 'Zara', 
        nome: 'Casaco de Lã com Botões', 
        preco: 170, 
        imagem: 'product-6', 
        feminino: true, 
    }, 
    { 
        id: "7", 
        marca: 'Zara', 
        nome: 'Casaco com Botões', 
        preco: 75, imagem: 'product-7', 
        feminino: true, 
    }, 
    { 
        id: "8", 
        marca: 'Zara', 
        nome: 'Colete Comprido com Cinto', 
        preco: 88, 
        imagem: 'product-8', 
        feminino: true, 
    },
];

export function salvarLocalStorage(chave, info){
    localStorage.setItem(chave, JSON.stringify(info));
}

export function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave));
}

export function apgarDoLocalStorage(chave){
    localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto) {
    const produto = catalago.find((p) => p.id === idProduto);

    const containerProdutosCarrinho = document.getElementById(idContainerHtml);

    const elementoArticle = document.createElement("article");
    const articleClasses = ['flex', 'bg-stone-200', 'rounded-lg', 'p-1', 'relative', "mb-2", "w-96"]
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
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg px-2 py-1">
        <p id="quantidade-${produto.id}" class='ml-2 border-2 border-slate-500 p-1'>${quantidadeProduto}<p/>
    </div>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);
}
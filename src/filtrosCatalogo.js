const catalagoProdutos = document.getElementById("container-produto");

function exibirTodos(){
    const produtosEscondidos = Array.from(catalagoProdutos.getElementsByClassName("hidden"));
    for (const produto of produtosEscondidos){
        produto.classList.remove("hidden");
    }
}

function escondeMasculinos(){
    const produtosMasculinos = Array.from(catalagoProdutos.getElementsByClassName("masculino"));
    
    exibirTodos();
    for(const produto of produtosMasculinos){
        produto.classList.add("hidden");
    }
}

function escondeFemininos(){
    const produtosFemininos = Array.from(catalagoProdutos.getElementsByClassName("feminino"));
    
    exibirTodos();
    for(const produto of produtosFemininos){
        produto.classList.add("hidden");
    }
}

export function inicializarFiltros(){
    document.getElementById("exibir-feminino").addEventListener('click', escondeMasculinos);
    document.getElementById("exibir-masculino").addEventListener('click', escondeFemininos);
    document.getElementById("exibir-todos").addEventListener('click', exibirTodos);
}
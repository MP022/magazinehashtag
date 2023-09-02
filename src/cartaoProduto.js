import { catalago } from "./utilidades";
import { adicionarAoCarrinho } from "./menuCarrinho";

export function renderizarCatalogo(){
    for(const produtoCatalago of catalago){
        const cartaoProduto = 
        `<div id="card-produto-${produtoCatalago.id}" class='border-solid w-48 m-2 flex flex-col p-2 justify-between group shadow-xl shadow-slate-400 rounded-lg ${produtoCatalago.feminino ? 'feminino' : 'masculino'}'>
            <img
                src="./assets/img/${produtoCatalago.imagem}.jpg" 
                alt="Produto 1 do Magazine Hashtag"
                class="group-hover:scale-110 duration-300 my-3 rounded-lg"
            />
            <p class='text-sm'>${produtoCatalago.marca}</p>
            <p class='text-sm'>${produtoCatalago.nome}</p>
            <p class='text-sm'>$${produtoCatalago.preco}</p>
            <button id='adicionar-${produtoCatalago.id}' class="bg-slate-950 text-slate-200 hover:bg-slate-700">
                <i class="fa-solid fa-cart-plus"></i>
            </button>
        </div>`;

        document.getElementById("container-produto").innerHTML += cartaoProduto;
    }

    for (const produtoCatalogo of catalago){
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adicionarAoCarrinho(produtoCatalogo.id));
    }
}

// Função para exibir os filmes com filtro de título
function exibirFilmes(containerId, botoes = [], filtroTitulo = "", filtroGenero = "") {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Filtra apenas pelo título
    const filmesFiltrados = filmes.filter(filme => 
        filme.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
        (filtroGenero === "" || (filme.genero?.toLowerCase() || '') === filtroGenero.toLowerCase()) // Filtra pelo gênero
    ); 

    //Cria a estrutura de exibição dos filmes com os botões de ação (alugar e remover) e se necessário o filtro de gênero e título
    container.innerHTML = filmesFiltrados.map((filme, index) => `
        <div class="filme">
            <img src="${filme.imagem}" alt="${filme.titulo}">
            <p>${filme.titulo}</p>
            <p><strong>Gênero:</strong> ${filme.genero}</p>
            ${botoes.map(botao => `<button onclick="${botao.func}(${index})">${botao.text}</button>`).join('')}
        </div>
    `).join('');
}

document.addEventListener("DOMContentLoaded", () => { //Espera o DOM carregar para executar o código
    exibirFilmes("filmes-lista");
    exibirFilmes("filmes-lista-admin", [{ text: "Remover", func: "removerFilme" }]);
    exibirFilmes("filmes-aluguel", [{ text: "Alugar", func: "alugarFilme" }]);

    const form = document.getElementById("form-add-filme");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const titulo = document.getElementById("titulo").value; // Pega o título do filme
            const imagem = document.getElementById("imagem").value; // Pega a imagem do filme
            const genero = document.getElementById("genero").value; // Pega o gênero do filme
            filmes.push({ titulo, imagem, genero }); // Adiciona o gênero junto ao título e imagem
            localStorage.setItem("filmes", JSON.stringify(filmes)); // Salva no localStorage
            exibirFilmes("filmes-lista-admin", [{ text: "Remover", func: "removerFilme" }]);
            form.reset();
        });
    }

    // Filtro de pesquisa por título
    const pesquisaInput = document.getElementById("pesquisa-filme"); 
    if (pesquisaInput) {
        pesquisaInput.addEventListener("input", () => {
            const termo = pesquisaInput.value;
            const filtroGenero = document.getElementById("filtro-genero").value; // Pega o filtro de gênero
            const genero = filtroGenero === "todos" ? "" : filtroGenero;
            exibirFilmes("filmes-lista", [], termo); // Exibe os filmes filtrados por título
            exibirFilmes("filmes-lista-admin", [{ text: "Remover", func: "removerFilme" }], termo, genero);
            exibirFilmes("filmes-aluguel", [{ text: "Alugar", func: "alugarFilme" }], termo, genero);
        });
    }

    // filtro de pesquisa por gênero
    const filtroGenero = document.getElementById("filtro-genero");
    if (filtroGenero) {
        filtroGenero.addEventListener("change", () => {
            const genero = filtroGenero.value;
            const pesquisaInput = document.getElementById("pesquisa-filme"); // Pega o input de pesquisa
            const termo = pesquisaInput.value
            exibirFilmes("filmes-lista", [], "", termo, genero); // Exibe os filmes filtrados por gênero
            exibirFilmes("filmes-lista-admin", [{ text: "Remover", func: "removerFilme" }], "",termo, genero);
            exibirFilmes("filmes-aluguel", [{ text: "Alugar", func: "alugarFilme" }], "",termo, genero);
        });
    }

});

function alugarFilme(index) {
    alert(`Você alugou o filme: ${filmes[index].titulo}`); // Exibe um alerta com o título do filme
}

function removerFilme(index) {
    filmes.splice(index, 1); // Remove o filme da lista
    localStorage.setItem("filmes", JSON.stringify(filmes)); // Atualiza o localStorage
    exibirFilmes("filmes-lista-admin", [{ text: "Remover", func: "removerFilme" }]);
}

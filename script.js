const filmes = JSON.parse(localStorage.getItem("filmes")) || [{
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    imagem: "https://br.web.img3.acsta.net/medias/nmedia/18/92/91/32/20224832.jpg", 
    genero: "Fantasia"
},
{
    titulo: "O Poderoso Chefão",
    imagem: "https://ingresso-a.akamaihd.net/prd/img/movie/o-poderoso-chefao-50-anos/008274f7-a76d-484f-8b5b-1c639c2ce46b.jpg", 
    genero: "Crime"
},
{
    titulo: "Matrix",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQHcTCyMucK7uemubWm_RX8xcMSYKmz9fsWw&s", 
    genero: "Ficção Científica"
},
{
    titulo: "Titanic",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/2/22/Titanic_poster.jpg", 
    genero: "Drama/Romance"
},
{
    titulo: "Vingadores: Ultimato",
    imagem: "https://br.web.img3.acsta.net/pictures/19/04/26/17/30/2428965.jpg", 
    genero: "Ação"
},
{
    titulo: "Forrest: O Contador de Histórias",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/thumb/c/c0/ForrestGumpPoster.jpg/240px-ForrestGumpPoster.jpg", 
    genero: "Drama"
},
{
    titulo: "O Rei Leão",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfRsXIMEsvQTXiXBhPw2sRbB5u6FuFTUKG7g&s", 
    genero: "Animação"
},
{
    titulo: "Star Wars: O Império Contra-Ataca",
    imagem: "https://m.media-amazon.com/images/M/MV5BY2ViMjFhMDMtNTA4Yi00NGJjLTk0ZTktNGVkZjJjMGY4ZTFkXkEyXkFqcGc@._V1_.jpg", 
    genero: "Ficção Científica"
},
{
    titulo: "Jurassic Park",
    imagem: "https://preview.redd.it/xflrnkg1t9ae1.jpeg?width=640&crop=smart&auto=webp&s=f061e01798f35e775f3fe1d00e681947dc5f21bf", 
    genero: "Aventura/Ficção Científica"
},
{
    titulo: "O Lobo de Wall Street",
    imagem: "O Lobo de Wall Street", 
    genero: "Comédia/Drama"
}];

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

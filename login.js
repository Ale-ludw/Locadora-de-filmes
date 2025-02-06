let dados = JSON.parse(localStorage.getItem("dados")) || [
    {user: "admin", pass: "1234"}
]

addEventListener("DOMContentLoaded", () => {
    document.getElementById("login").addEventListener('click', logar)
})

function logar() {
    const user = document.getElementById('username').value
    const pass = document.getElementById('password').value

    if(user==='' || pass===''){
        return alert("preencha todos os campos")
    }

    let verificar = dados.find(dado => dado.user === user && dado.pass === pass)

    if (verificar) {
        alert("login efetuado! Bem vindo Admin!")
        window.location.replace("admin.html")
    } else {
        alert("Usuário ou senha incorretos")
    }
}


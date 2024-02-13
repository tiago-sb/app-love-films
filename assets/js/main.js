// const chaveApi = 'b1f5e8f68e3b210d2407f5b49240d934'
// const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=DRAKE&api_key=${chaveApi}&format=json`

// fetch(url)
//     .then((response) => response.json())
//     .then(dados => console.log(dados))
const hamburguer = document.querySelector(".header .menu-hamburguer")

hamburguer.addEventListener("click", () => {
    const botao = document.querySelector(".header .navegacao")
    const clicado = botao.classList.contains("navegacao-escolhida")
    if(clicado) { botao.classList.remove('navegacao-escolhida') }
    else { botao.classList.add('navegacao-escolhida') }
})

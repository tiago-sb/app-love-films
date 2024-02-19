const hamburguer = document.querySelector(".header .menu-hamburguer")

hamburguer.addEventListener("click", () => {
    const botao = document.querySelector(".header .navegacao")
    const clicado = botao.classList.contains("navegacao-escolhida")
    if(clicado) { botao.classList.remove('navegacao-escolhida') }
    else { botao.classList.add('navegacao-escolhida') }
})

document.querySelector(".paraCima").addEventListener("click", () => {
    window.location.href = '#home'
})

document.addEventListener("scroll", () => {
    const botao = document.querySelector(".paraCima")
    if(window.scrollY > 600) { botao.style.display = 'flex'; }
    else { botao.style.display = "none";  }
})
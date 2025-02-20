const resultados_pesquisa = document.querySelector("main.busca_filme")
const parametros_busca = new URLSearchParams(window.location.search)
const termo_pesquisa = parametros_busca.get("q")
const botao_busca = document.querySelector("#pesquisa > img")

const hamburguer = document.querySelector(".header .menu-hamburguer")
const botaoSubir = document.querySelector(".paraCima")

const logo = document.querySelector("body > header > div.homeBusca > a")
const home = document.querySelector("#navegacao-Id > ul > li:nth-child(1)")
const contato = document.querySelector("#navegacao-Id > ul > li:nth-child(2)")

const filmes = document.querySelectorAll("body main.busca_filme div.filme-card")

hamburguer.addEventListener("click", () => {
  const botao = document.querySelector(".header .navegacao")
  const clicado = botao.classList.contains("navegacao-escolhida")

  if (clicado) {
    botao.classList.remove("navegacao-escolhida")
  } else {
    botao.classList.add("navegacao-escolhida")
  }
})

botaoSubir.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

document.addEventListener("scroll", () => {
  const botao = document.querySelector(".paraCima")
  if (window.scrollY > 600) { botao.style.display = 'flex'; }
  else { botao.style.display = "none"; }
})

document.addEventListener("DOMContentLoaded", () => {
  home.addEventListener("click", () => {
    window.location.href = "index.html"
  })

  logo.addEventListener("click", () => {
    window.location.href = "index.html"
  })

  contato.addEventListener("click", () => {
    window.location.href = "index.html"
  })
})
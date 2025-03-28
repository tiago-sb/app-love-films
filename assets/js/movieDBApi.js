const card = document.getElementById('card')

document.addEventListener("DOMContentLoaded", async () => {
  const [filmes_populares, filmes_por_vir, filmes_mais_votados, filmes_em_cartaz] = await Promise.all([
    fetchFilmes('popular'), 
    fetchFilmes('upcoming'), 
    fetchFilmes('top_rated'), 
    fetchFilmes('now_playing')
  ])

  carregarInformacaoIndex(filmes_populares.results, 
    filmes_por_vir.results, 
    filmes_mais_votados.results, 
    filmes_em_cartaz.results
  )
  
  const filmesCards = document.querySelectorAll('div.homeContent div.filme-card-home')
  
  filmesCards.forEach(card_filme => {
    card_filme.addEventListener('click', () => {
      const filmeId = card_filme.getAttribute('data-id')
      carregarResultadosFilmes(filmeId)
    })
  })
})

async function fetchFilmes(endpoint) {
  const resposta_servidor = await fetch(`https://app-love-films.vercel.app/api/server.js/movies/${endpoint}`, { method: 'GET' })

  if (resposta_servidor.ok) {
    return resposta_servidor.json();
  } else {
    console.error('Erro ao buscar filmes:', resposta_servidor.statusText);
  }
}

function carregarInformacaoIndex(popular, por_vir, mais_votados, em_cartaz) {
  const container = document.getElementById("home")
  
  container.innerHTML = ""

  criarSecao("Populares", popular)
  criarSecao("Por Vir", por_vir)
  criarSecao("Mais Votados", mais_votados)
  criarSecao("Em Cartaz", em_cartaz)
}

function criarSecao(titulo_secao, lista_filmes) {
  const container = document.getElementById("home")

  if (lista_filmes.length === 0) {
    return
  }

  let conteudo_secao = `
    <h2>${titulo_secao}</h2>
    <div class="homeContent">
  `
  lista_filmes.forEach(filme => {
    conteudo_secao += `
      <div class="filme-card-home" data-id="${filme.id}">
        <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}" />
        <p>${filme.title}</p>
      </div>
    `
  })
  conteudo_secao += `</div>`
  container.innerHTML += conteudo_secao
}

document.addEventListener("DOMContentLoaded", () => {
  const filme_id = localStorage.getItem("detalhesFilme")
  const filmes = JSON.parse(localStorage.getItem("filmesBusca") || "[]")
  
  carregarInformacoesFilme(filme_id, filmes)
})

async function carregarInformacoesFilme(filme_id, filmes){
  if (filme_id && filmes) {
    const filme = filmes.find(f => f.id == filme_id)
    
    if (filme) {
      const [response_elenco, response_recomendacoes] = await Promise.all([
        fetch(`https://app-love-films.vercel.app/api/server.js/movies/${filme.id || filme}/credits`, {method: 'GET'}),
        fetch(`https://app-love-films.vercel.app/api/server.js/movies/${filme.id || filme}/recommendations`, {method: 'GET'})
      ])
  
      const elenco = await response_elenco.json()
      let conteudo_elenco = ""

      const recomendacoes = await response_recomendacoes.json()
      let conteudo_recomendacoes = ""

      elenco.cast.forEach(ator => {
        conteudo_elenco += `
          <div>
            <img src="https://image.tmdb.org/t/p/w500${ator.profile_path}" alt="${ator.name}" />
            <p><b>${ator.character}</b></p>
            <p><b>(${ator.name})</b></p>
          </div>
        `
      })
  
      recomendacoes.results.forEach(filme_recomendado => {
        conteudo_recomendacoes += `
          <div class="filme-card" data-id="${filme_recomendado.id}">
            <img src="https://image.tmdb.org/t/p/w500${filme_recomendado.backdrop_path}" alt="${filme_recomendado.original_title}" />
            <p><b>${filme_recomendado.original_title}</b></p>
          </div>
        `
      })
      
      card.innerHTML = `
        <div class="card-content">
          <div class="card-contenteudo-informacao" style="background-image: url('https://image.tmdb.org/t/p/w500${filme.backdrop_path}'); 
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 100%;
            height: 100%;">
            <h1>${filme.title}</h1>
            <div class="card-conteudo-dados">
              <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.original_title}" />
              <div class="card-contenteudo-informacao-filme">
                <div class="media-votos">
                  <p><b>Média de Votos</b></p>
                  <h2>${(filme.vote_average).toFixed(1) || "Não disponível"}</h2>
                </div>
                <hr>
                <div class="descricao-filme">
                  <h2>Descrição</h2>
                  <p>${filme.overview || "Não disponível."}</p>
                </div>
                <hr>
                <div class="detalhes-filme">
                  <div class="detalhes-filme-conteudo">
                    <h3><b>Data de Lançamento</b></h3>
                    <p>${filme.release_date || "Não disponível"}</p>
                  </div>
                  <div class="detalhes-filme-conteudo">
                    <h3><b>Popularidade</b></h3>
                    <p>${filme.popularity || "Não disponível"}</p>
                  </div>
                  <div class="detalhes-filme-conteudo">
                    <h3><b>Idioma Original</b></h3>
                    <p>${filme.original_language.toUpperCase()}</p>
                  </div>
                  <div class="detalhes-filme-conteudo">
                    <h3><b>Quantidade de Votos</b></h3>
                    <p>${filme.vote_count || "Não disponível"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="card-content-elenco">
            <h1>Elenco Principal</h1>
            <div class="card-filme-informacao">
              ${conteudo_elenco}   
            </div>
          </div>
  
          <div class="card-content-recomendados">
            <h1>Títulos Semelhantes</h1>
            <div class="card-filme-informacao">
              ${conteudo_recomendacoes}   
            </div>
          </div>
        </div>
      `
      
      async function detalhamento(filme_id) {
        const result = await fetch(`https://app-love-films.vercel.app/api/server.js/movie/${filme_id}`, {method: 'GET'})
        const dados_filme = await result.json()
        
        return dados_filme
      }

      document.querySelectorAll(".filme-card").forEach(card => {
        card.addEventListener("click", async () => {
          const filmeId = card.getAttribute("data-id")
          const detalhes = await detalhamento(filmeId)
          localStorage.setItem("detalhesFilme", JSON.stringify(detalhes))
          localStorage.setItem("filmesBusca", JSON.stringify(recomendacoes))
          window.location.href = "informacao.html"
        })
      })
    } else {
      card.innerHTML = `<h2>Carregando...</h2>`
    }
  } else {
    card.innerHTML = `<h2>Nenhuma informação disponível.</h2>`
  }
}

async function detalhamentoFilme(filme_id) {
  const result = await fetch(`https://app-love-films.vercel.app/api/server.js/movie/${filme_id}`, {method: 'GET'})
  const dados_filme = await result.json()
  
  return dados_filme
}

async function carregarResultadosFilmes(filmeId){
  try{
    const filme = await detalhamentoFilme(filmeId)
    if (filme) {
      localStorage.setItem('detalhesFilme', JSON.stringify(filme))
      window.location.href = "informacao.html"
    }   
  } catch(error){
    console.error(error)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  botao_busca.addEventListener("click", (e) => {
    e.preventDefault()
    const pesquisa_input = document.querySelector("#busca")
    const termo = pesquisa_input.value.trim()

    if (termo) {
      window.location.href = `busca.html?q=${encodeURIComponent(termo)}`
    } else {
      resultados_pesquisa.innerHTML = "<h3>Nenhum termo de busca foi informado.</h3>"
    }
  })

  if (termo_pesquisa) {
    exibirResultadoBusca(termo_pesquisa)
  }
})

async function exibirResultadoBusca(termo) {
  try {
    const response = await fetch(`https://app-love-films.vercel.app/api/server.js/search?q=${termo}`, {method: 'GET'})

    const filmes = await response.json()
    localStorage.setItem("filmesBusca", JSON.stringify(filmes.results))

    filmes.results.forEach(filme => {
      resultados_pesquisa.innerHTML += `
        <div class="filme-card" data-id="${filme.id}">
          <div class="filme-titulo"> 
            <h2>${filme.title}</h2>
          </div>
          <div class="filme-descricao">
            <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" alt="${filme.title}" />
            <span>
              <p>${filme.overview || "overview Não disponível"}</p>
              <p>Data de Lançamento: ${filme.release_date || "Não disponível"}</p>
              <p>Popularidade: ${filme.popularity || "Não disponível"}</p>
            </span>
          </div>
        </div>
      `
    })

    document.querySelectorAll(".filme-card").forEach(card => {
      card.addEventListener("click", () => {
        const filmeId = card.getAttribute("data-id")
        localStorage.setItem("detalhesFilme", filmeId)
        window.location.href = `informacao.html`
      })
    })
  } catch (error) {
    console.error("Erro ao buscar filmes:", error)
    resultados_pesquisa.innerHTML = `<h2>Erro ao buscar os resultados. Tente novamente mais tarde.</h2>`
  }
}
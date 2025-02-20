document.addEventListener("DOMContentLoaded", async () => {
  const card = document.getElementById('card')
  let filme = localStorage.getItem('detalhesFilme')

  if (filme) {
    try {
      filme = JSON.parse(filme)
    } catch (error) {
      console.warn(error)
    }
  }

  if (filme) {
    const [response_elenco, response_recomendacoes] = await Promise.all([
      fetch(`http://localhost:3001/movies/${filme.id || filme}/credits`, {method: 'GET'}),
      fetch(`http://localhost:3001/movies/${filme.id || filme}/recommendations`, {method: 'GET'}) 
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
          <img src="https://image.tmdb.org/t/p/w500${filme_recomendado.backdrop_path}" 
            alt="${filme_recomendado.original_title}" />
          <p><b>${filme_recomendado.original_title}</b></p>
        </div>
      `
    })
    
    card.innerHTML = `
      <div class="card-content">
        <div class="card-contenteudo-informacao" 
          style="background-image: url('https://image.tmdb.org/t/p/w500${filme.backdrop_path}'); 
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          width: 100%;
          height: 100%;">
          <h1>${filme.title}</h1>
          <div class="card-conteudo-dados">
            <img src="https://image.tmdb.org/t/p/w500${filme.poster_path}" 
              alt="${filme.original_title}" />
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

    
    
    async function detalhamentoFilme(filme_id) {
      const result = await fetch(`http://localhost:3001/movie/${filme_id}`, {method: 'GET'})
      const dados_filme = await result.json()
      
      return dados_filme
    }

    document.querySelectorAll(".filme-card").forEach(card => {
      card.addEventListener("click", async () => {
        const filmeId = card.getAttribute("data-id")
        const detalhes = await detalhamentoFilme(filmeId)
        localStorage.setItem("detalhesFilme", JSON.stringify(detalhes))
        window.location.href = "informacao.html"
      })
    })
  } else {
    card.innerHTML = `<h2>Carregando...</h2>`
  }
})
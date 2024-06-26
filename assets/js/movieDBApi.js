const chave = b7a8f1771226dd30a84f93f9f307bfab;
const url = "https://api.themoviedb.org/3/search/movie?"

document.querySelector("div.mainApp .search-films button").addEventListener("click", async () => {
        const film = document.querySelector("div.mainApp .search-films input").value
        const container = document.querySelector("div.mainApp div.film-information")
        
        const response = await fetch(`${url}api_key=${chave}&query=${film}`)
        const data = await response.json()
        
        const filmId = data.results[0].id
        const detailFilms = `https://api.themoviedb.org/3/movie/${filmId}?api_key=${chave}`
        const imagesUrl = `https://api.themoviedb.org/3/movie/${filmId}/images?api_key=${chave}`

        Promise.all([fetch(detailFilms), fetch(imagesUrl)])
                .then(responseDetail => Promise.all(responseDetail.map((detailsFilm) => detailsFilm.json())))
                .then(([details, images]) => {
                        const imageUrl = `https://image.tmdb.org/t/p/w500${images.posters[0].file_path}`
                        
                        container.innerHTML =`
                                <h2>${details.title}</h2>
                                <div class="informations-film"> 
                                        <img src="${imageUrl}" alt="Poster de ${details.title}">
                                        <div> 
                                                <p class="lancFilm">Data de Lançamento: ${details.release_date}</p>
                                                <p class="sinoFilm">Sinopse: "${details.overview}"</p>
                                                <p class="lancFilm">Nota: ${details.vote_average}</p>
                                                <p class="lancFilm">Popularidade: ${details.popularity}</p>
                                        </div>        
                                </div>        
                        
                                
                        `
                })                       
})

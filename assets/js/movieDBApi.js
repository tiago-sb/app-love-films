const chave = "f728320fd6129584a46499cc8c184523";
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
                        
                        container.innerHTML = `
                                <h2>${details.title}</h2>
                                <img src="${imageUrl}" alt="Poster de ${details.title}">
                                <p class="lancFilm">Data de Lançamento: ${details.release_date}</p>
                                <p class="sinoFilm">Sinopse: "${details.overview}"</p>
                                <p class="lancFilm">Nota: ${details.vote_average}</p>
                                <p class="lancFilm">Popularidade: ${details.popularity}</p>
                        `
                })                       
})
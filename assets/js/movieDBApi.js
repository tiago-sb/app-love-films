const chave = "f728320fd6129584a46499cc8c184523";
const url = "https://api.themoviedb.org/3"

document.querySelector("div.mainApp .search-films button").addEventListener("click", async () => {
        const film = document.querySelector("div.mainApp .search-films input").value
        const response = await fetch(`${url}/movie/popular?api_key=${chave}`)
        const data = await response.json()
        
        console.log(data)
})
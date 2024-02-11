const pessoa = {
    login: String,
    photo: String,
    namePes: String,
    location: String,
    bioPes: String,
}

getUrlUser()

async function getUrlUser() {
    const url = "https://api.github.com/users/tiago-sb"

    const response = await fetch(url)
    const profileDados = await response.json()

    pessoa.login = profileDados.login
    pessoa.photo = profileDados.avatar_url
    pessoa.namePes = profileDados.name
    pessoa.location = profileDados.location
    pessoa.bioPes = profileDados.bio

    creatUser()    
}

function creatUser() {
    document.querySelector("main.main").innerHTML = `
        <section class="profile">
            <div class="image">
                <img class="image" src="${pessoa.photo}">
            </div>

            <div class="conteudo">
                <h2>${pessoa.namePes}</h2>
                <p>${pessoa.location}</p>
                <div class="bioUser"> 
                    "${pessoa.bioPes}"
                </div>
            </div>
        </section>
    `
}
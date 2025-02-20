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
  pessoa.bioPes = profileDados.bio

  creatUser()
}

function creatUser() {
  document.querySelector("div#about").innerHTML = `
    <section class="profile">
      <div class="image">
        <img class="image" src="${pessoa.photo}">
      </div>

      <div class="conteudo">
        <h2>${pessoa.namePes}</h2>
        <div class="bioUser">
          "${pessoa.bioPes}"
        </div>
        <div class="linksContact">
          <a href="https://criarmeulink.com.br/u/1690329618" target="_blank">
            <img src="assets/css/images/icons/email.svg" alt="email">
          </a>
          <a href="https://api.whatsapp.com/send?phone=5577999662311&text=Ola" target="_blank">
            <img src="assets/css/images/icons/whatssApp.svg" alt="whatssApp">
          </a>
          <a href="https://www.instagram.com/tiagobella.05/" target="_blank">
            <img src="assets/css/images/icons/instagram.svg" alt="instagram">
          </a>
          <a href="https://twitter.com/wtftsb_" target="_blank">
            <img src="assets/css/images/icons/twitter-x.svg" alt="twitter-x">
          </a>
        </div>
      </div>
    </section>
  `
}
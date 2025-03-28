const axios = require('axios')

const apiKey = process.env.TMDB_API_KEY
const tmdbUrl = 'https://api.themoviedb.org/3/movie'

module.exports = async (req, res) => {
  const { category } = req.query

  try {
    const response = await axios.get(`${tmdbUrl}/${category}`, {
      params: { language: 'pt-BR', page: 1 },
      headers: { Authorization: `Bearer ${apiKey}` }
    })

    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `Erro ao buscar filmes ${category}` })
  }
}
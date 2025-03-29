const axios = require('axios')

const apiKey = process.env.TMDB_API_KEY
const tmdbUrl = 'https://api.themoviedb.org/3/movie'

module.exports = async (req, res) => {
  const { id } = req.query

  const response = await axios.get(`${tmdbUrl}/${id}/recommendations`, {
    params: { language: 'pt-BR', page: 1 },
    headers: { Authorization: `Bearer ${apiKey}` }
  })
  try {
    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      error: `Erro ao buscar recomendações do filme com id ${id} - ${response}`
    })
  }
} 
const axios = require('axios')

const apiKey = process.env.TMDB_API_KEY

module.exports = async (req, res) => {
  try {
    const searchTerm = req.query.q

    if (!searchTerm) {
      return res.status(400).json({ error: 'Termo de pesquisa não fornecido' })
    }

    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        query: searchTerm,
        include_adult: false,
        language: 'pt-BR',
        page: 1
      },
      headers: { Authorization: `Bearer ${apiKey}` }
    })

    res.json(response.data)
  } catch (error) {
    console.error('Erro ao buscar filmes:', error)
    res.status(500).json({ error: 'Erro ao buscar filmes' })
  }
}
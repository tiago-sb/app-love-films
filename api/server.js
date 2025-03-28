const axios = require('axios')

const apiKey = process.env.TMDB_API_KEY
const tmdbUrl = 'https://api.themoviedb.org/3/movie'

module.exports = async (req, res) => {
  const { id } = req.query

  try {
    const response = await axios.get(`${tmdbUrl}/${id}`, {
      params: { language: 'pt-BR', page: 1 },
      headers: { Authorization: `Bearer ${apiKey}` }
    })

    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `Erro ao buscar filme` })
  }
}

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

module.exports = async (req, res) => {
  const { id } = req.query  // Mudando para query params

  try {
    const response = await axios.get(`${tmdbUrl}/${id}/credits`, {
      params: { language: 'pt-BR', page: 1 },
      headers: { Authorization: `Bearer ${apiKey}` }
    })

    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `Erro ao buscar elenco do filme com id ${id}` })
  }
}

module.exports = async (req, res) => {
  const { id } = req.query

  try {
    const response = await axios.get(`${tmdbUrl}/${id}/recommendations`, {
      params: { language: 'pt-BR', page: 1 },
      headers: { Authorization: `Bearer ${apiKey}` }
    })

    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `Erro ao buscar recomendações do filme com id ${id}` })
  }
}
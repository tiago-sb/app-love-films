require('dotenv').config()

const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(cors())

const port = process.env.PORT || 3001

const apiKey = process.env.TMDB_API_KEY
const tmdbUrl = 'https://api.themoviedb.org/3/movie'

app.get('/movie/:id', async (req, res) => {
  const { id } = req.params

  try {
    const response = await axios.get(`${tmdbUrl}/${id}`, {
      params: {language: 'pt-BR', page: 1},
      headers: {Authorization: `Bearer ${apiKey}`}
    })

    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `Erro ao buscar filme` })
  }
})

app.get('/search', async (req, res) => {
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
      headers: {Authorization: `Bearer ${apiKey}`}
    })

    res.json(response.data)
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
})

app.get('/movies/:category', async (req, res) => {
  const { category } = req.params
  
  try {
    const response = await axios.get(`${tmdbUrl}/${category}`, {
      params: {language: 'pt-BR', page: 1},
      headers: {Authorization: `Bearer ${apiKey}`}
    })

    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `Erro ao buscar filmes ${category}` })
  }
})

app.get('/movies/:id/credits', async (req, res) => {
  const { id } = req.params
  
  try {
    const response = await axios.get(`${tmdbUrl}/${id}/credits`, {
      params: {language: 'pt-BR', page: 1},
      headers: { Authorization: `Bearer ${apiKey}`}
    })

    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: `Erro ao buscar elenco do filme com id ${id}` })
  }
})

app.get('/movies/:id/recommendations', async (req, res) => {
  const { id } = req.params
  
  try {
    const response = await axios.get(`${tmdbUrl}/${id}/recommendations`, {
      params: {language: 'pt-BR', page: 1},
      headers: {Authorization: `Bearer ${apiKey}`}
    })

    res.json(response.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: `Erro ao buscar elenco do filme com id ${id}`})
  }
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
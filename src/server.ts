import express from 'express'

const app = express()

app.get('/api', (request, response) => {
  return response.json({
    message: "Boas meus putos"
  })
})

app.post('/api', (request, response) => {
  return response.json({
    message: "Recebeu os dados rei"
  })
})

app.listen(3333, () => console.log("Chegou aqui rei"))
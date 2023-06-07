import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import './database/config.js'

// Configuracion del servidor Express
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Directorio Publico
app.use(express.static('public'))

// Middlewares

// Rutas

// Manejo de errores

// Iniciar el servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running, port: ${port}`)
})

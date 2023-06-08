import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import './database/config.js'
import router from './routes/product.js'

// Configuracion del servidor Express
const app = express()
app.use(cors())
app.use(bodyParser.json())

// Directorio Publico
app.use(express.static('public'))

// Middlewares
app.use(morgan('dev'))

// Rutas
app.use('/api', router)

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Error del servidor'
  })
})

// Iniciar el servidor
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running, port: ${port}`)
})

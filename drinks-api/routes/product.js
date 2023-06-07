import { Router } from 'express'
import { verifyApiKey } from '../middlewares/apiKey.js'
import { createProduct, getProducts } from '../controllers/product.js'

const router = Router()

router.get('/drinks', getProducts)

router.get('/drinks/drink')

router.post('/drinks', verifyApiKey, createProduct)

router.put('/drinks/:id')

router.delete('/drinks/:id')

export default router

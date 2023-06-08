import { Router } from 'express'
import { verifyApiKey } from '../middlewares/apiKey.js'
import { verifyEnums } from '../middlewares/product.js'
import { createProduct, getProduct, getProducts, modifyProduct } from '../controllers/product.js'

const router = Router()

router.get('/drinks', getProducts)

router.get('/drinks/drink', getProduct)

router.post('/drinks', verifyApiKey, createProduct)

router.put('/drinks/:id', [verifyApiKey, verifyEnums], modifyProduct)

router.delete('/drinks/:id')

export default router

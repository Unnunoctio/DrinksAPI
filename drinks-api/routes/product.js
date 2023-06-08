import { Router } from 'express'
import { verifyApiKey } from '../middlewares/apiKey.js'
import { verifyEnums } from '../middlewares/product.js'
import { createProduct, deleteProduct, getProduct, getProducts, modifyProduct } from '../controllers/product.js'

const router = Router()

router.get('/drinks', getProducts)

router.get('/drinks/drink', getProduct)

router.post('/drinks', verifyApiKey, createProduct)

router.post('/drinks/excel')

router.put('/drinks/:id', [verifyApiKey, verifyEnums], modifyProduct)

router.delete('/drinks/:id', verifyApiKey, deleteProduct)

export default router

import { Router } from 'express'
import { getProducts } from '../controllers/product.js'

const router = Router()

router.get('/drinks', getProducts)

router.post('/drinks')

router.put('/drinks/:id')

router.delete('/drinks/:id')

export default router

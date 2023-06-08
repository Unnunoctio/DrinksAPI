import multer from 'multer'
import { Router } from 'express'
import { verifyApiKey } from '../middlewares/apiKey.js'
import { verifyEnums } from '../middlewares/product.js'
import { addManyProducts, createProduct, deleteProduct, getProduct, getProducts, modifyProduct } from '../controllers/product.js'

// Configurar multer para manejar la carga de archivos
const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.get('/drinks', getProducts)

router.get('/drinks/drink', getProduct)

router.post('/drinks', verifyApiKey, createProduct)

router.post('/drinks/excel', [verifyApiKey, upload.single('excel-file')], addManyProducts)

router.put('/drinks/:id', [verifyApiKey, verifyEnums], modifyProduct)

router.delete('/drinks/:id', verifyApiKey, deleteProduct)

export default router

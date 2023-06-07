import { response } from 'express'
import Product from '../models/Product.js'

const getProducts = async (req, res = response) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const products = await Product.find().skip(skip).limit(limit)
    res.status(200).json({
      products
    })
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener los productos'
    })
  }
}

export {
  getProducts
}

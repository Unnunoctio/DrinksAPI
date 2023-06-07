import { response } from 'express'
import Product from '../models/Product.js'

const getProducts = async (req, res = response) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const products = await Product.find().skip(skip).limit(limit)
    if (products.length === 0) {
      return res.status(400).json({
        error: 'Error al obtener los productos'
      })
    }

    res.status(200).json({
      products
    })
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener los productos'
    })
  }
}

const createProduct = async (req, res = response) => {
  try {
    const { alcoholicGrade, subCategory, madeIn, ...rest } = req.body

    const product = new Product({
      ...rest,
      alcoholic_grade: alcoholicGrade,
      sub_category: subCategory,
      made_in: madeIn
    })

    await product.save()
    res.status(201).json({
      product
    })
  } catch (error) {
    res.status(400).json({
      error: 'Error al crear un producto',
      details: error.message
    })
  }
}

export {
  getProducts,
  createProduct
}

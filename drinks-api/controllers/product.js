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
    res.status(400).json({
      error: 'Error al obtener los productos'
    })
  }
}

const getProduct = async (req, res = response) => {
  try {
    const { alcoholic_grade: alcoholicGrade, content, ...rest } = req.query
    const query = {
      ...rest
    }
    if (alcoholicGrade) query.alcoholic_grade = parseFloat(alcoholicGrade)
    if (content) query.content = parseInt(content)

    const products = await Product.find(query)

    res.status(200).json({
      products
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: 'Error al obtener el producto'
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

const modifyProduct = async (req, res = response) => {
  try {
    const { alcoholicGrade, subCategory, madeIn, ...rest } = req.body

    const product = {
      ...rest,
      alcoholic_grade: alcoholicGrade,
      sub_category: subCategory,
      made_in: madeIn
    }

    const productDB = await Product.findByIdAndUpdate(req.params.id, product, { new: true })
    if (!productDB) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      })
    }

    res.status(200).json({
      product: productDB
    })
  } catch (error) {
    res.status(400).json({
      error: 'Error al actualizar el producto',
      details: error.message
    })
  }
}

export {
  getProducts,
  getProduct,
  createProduct,
  modifyProduct
}

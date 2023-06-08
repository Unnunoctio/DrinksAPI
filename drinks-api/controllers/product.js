import { response } from 'express'
import ExcelJS from 'exceljs'
import Product from '../models/Product.js'
import { categoryEnum, packageEnum, strainEnum, varietyEnum } from '../assets/productEnums.js'

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

const addManyProducts = async (req, res = response) => {
  try {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(req.file.buffer)

    const worksheet = workbook.getWorksheet('Data')
    const data = []

    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i)
      // eslint-disable-next-line no-unused-vars
      const [_, name, brand, alcoholicGrade, content, packageData, category, subCategory, madeIn, variety, bitterness, strain, vineyard] = row.values
      if (!name) continue

      const existingProduct = await Product.findOne({
        name,
        brand,
        alcoholic_grade: parseFloat(alcoholicGrade),
        content: parseInt(content),
        package: packageData
      })
      if (existingProduct) continue
      if (!packageEnum.includes(packageData)) continue
      if (!categoryEnum.includes(category)) continue
      if (!subCategory.includes(subCategory)) continue
      if (variety && !varietyEnum.includes(variety)) continue
      if (strain && !strainEnum.includes(strain)) continue

      const product = {
        name,
        brand,
        alcoholic_grade: parseFloat(alcoholicGrade),
        content: parseInt(content),
        package: packageData,
        category,
        sub_category: subCategory
      }
      if (madeIn) product.made_in = madeIn
      if (variety) product.variety = variety
      if (bitterness) product.bitterness = bitterness
      if (strain) product.strain = strain
      if (vineyard) product.vineyard = vineyard

      data.push(product)
    }

    const productsDB = await Product.insertMany(data)

    res.status(200).json({
      products: productsDB
    })
  } catch (error) {
    res.status(400).json({
      error: 'Error al agregar los datos'
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

const deleteProduct = async (req, res = response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({
        error: 'Producto no encontrado'
      })
    }

    res.status(200).json({
      product
    })
  } catch (error) {
    res.status(400).json({
      error: 'Error al eliminar el producto',
      details: error.message
    })
  }
}

export {
  getProducts,
  getProduct,
  createProduct,
  addManyProducts,
  modifyProduct,
  deleteProduct
}

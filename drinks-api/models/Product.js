import { Schema, model } from 'mongoose'
import { categoryEnum, packageEnum, strainEnum, subCategoryEnum, varietyEnum } from '../assets/productEnums.js'

const productSchema = Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  alcoholic_grade: { type: Number, required: true },
  content: { type: Number, required: true },
  package: { type: String, required: true, trim: true, enum: packageEnum },
  category: { type: String, required: true, trim: true, enum: categoryEnum },
  sub_category: { type: String, required: true, trim: true, enum: subCategoryEnum },
  made_in: { type: String, trim: true },
  variety: { type: String, trim: true, enum: varietyEnum }, // Cervezas
  bitterness: { type: String, trim: true }, // Cervezas
  strain: { type: String, trim: true, enum: strainEnum }, // Vinos
  vineyard: { type: String, trim: true } // Vinos
})

export default model('Product', productSchema)

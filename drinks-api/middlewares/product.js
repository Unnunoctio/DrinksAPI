import { categoryEnum, packageEnum, strainEnum, subCategoryEnum, varietyEnum } from '../assets/productEnums.js'

const verifyEnums = (req, res, next) => {
  const { package: packageData, category, subCategory, variety, strain } = req.body

  if (packageData && !packageEnum.includes(packageData)) {
    return res.status(400).json({ error: 'package no valido' })
  }
  if (category && !categoryEnum.includes(category)) {
    return res.status(400).json({ error: 'category no valido' })
  }
  if (subCategory && !subCategoryEnum.includes(subCategory)) {
    return res.status(400).json({ error: 'subCategory no valido' })
  }
  if (variety && !varietyEnum.includes(variety)) {
    return res.status(400).json({ error: 'variety no valido' })
  }
  if (strain && !strainEnum.includes(strain)) {
    return res.status(400).json({ error: 'strain no valido' })
  }

  next()
}

export {
  verifyEnums
}

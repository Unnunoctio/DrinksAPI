const verifyApiKey = (req, res, next) => {
  const apiKey = process.env.API_KEY
  const headerApiKey = req.headers['x-api-key']

  if (headerApiKey === apiKey) {
    next()
  } else {
    res.status(401).json({
      error: 'No autorizado'
    })
  }
}

export {
  verifyApiKey
}

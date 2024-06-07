const express = require('express')

const productosRouter = require('./productos.router')
const comentariosRouter = require('./comentario.router')
//const usersRouter = require('./users.router')
//const categoriaRouter = require('./categorias.router')

function routerApi(app){


  //ruta maestra
  const router = express.Router()

  //utilizar enponit espesifico
  app.use('/api/v1' , router)

router.use('/productos', productosRouter)
router.use('/comentarios', comentariosRouter)
//router.use('/categorias', categoriaRouter)
//router.use('/users', usersRouter)
}

module.exports = routerApi

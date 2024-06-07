const express = require ('express');
const cors = require('cors')
const routerApi = require ('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.hander')

const app = express()
const port = 3000;
//para usar el metodo Json con post delete put patch
app.use(express.json());
// http response 100, 200, 300 , 400
const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) =>{
    if(whitelist.includes(origin)){
      callback(null, true)
    }else {
      callback(new Error('no permitido'))
    }

  }
}
app.use(cors())

app.get('/', (req, res)=>{
  res.send('Hola Mundo desde mi server de express :)')
})

app.get('/nueva-ruta', (req, res)=>{
  res.send('Hola soy una nueva ruta :)')
})

app.listen(port, ()=>{
  console.log(`El servidor esta corriendo en el puerto` + port)
})


routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

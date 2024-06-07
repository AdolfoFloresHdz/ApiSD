const express = require('express');

const ProductosService = require('./../services/productos.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductosSchema,
  updateProductosSchema,
  getProductosSchema,
} = require('./../schemas/productos.shcema');

const router = express.Router();
const service = new ProductosService();

router.get('/', async (req, res) => {
  const productos = await service.find();
  res.json(productos);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un Filter');
});

//error 404 de manera dinamica
//todos los parametros que se resivan por get los enviara un STRING
//no olvidar poner un string
router.get('/:id',
validatorHandler(getProductosSchema, 'params')
,async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await service.findOne(id);
    res.json(producto);
  } catch (error) {
    next(error);
  }

  //f (id === '999'){
  // res.status(404).json({
  // message : 'not foud'
  // });
  //else{
  // res.status(200).json({
  //   id,
  //   name: "Holi x2",
  //   producto: ":)"
  // });
  //
});

//METODOS POST
router.post('/',
validatorHandler(createProductosSchema, 'body'),
 async (req, res) => {
  const body = req.body;
  const newProducto = await service.create(body);
  res.status(201).json(newProducto);
});

//METODOS PATCH
router.patch('/:id',
validatorHandler(getProductosSchema, 'params'),
validatorHandler(updateProductosSchema, 'body'),
async (req, res, next) => {
  //resivir el ID
  try {
    const { id } = req.params;
    const body = req.body;
    const producto = await service.update(id, body);
    res.json(producto);
  } catch (error) {
    next(error);
  }
});

//METODOS PUT
router.put('/:id', (req, res) => {
  //resivir el ID
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

//METODOS DELETE
router.delete('/:id', async (req, res) => {
  //resivir el ID
  const { id } = req.params;
  const rta = await service.delete(id, body);

  res.json(rta);
});

module.exports = router;

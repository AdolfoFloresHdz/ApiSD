const express = require('express');

const ComentarioService = require('../services/comentario.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createComentarioSchema,
  updateComentarioSchema,
  getComentarioSchema,
} = require('../schemas/comentario.schema');

const router = express.Router();
const service = new ComentarioService();

router.get('/', async (req, res) => {
  const comentarios = await service.find();
  res.json(comentarios);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un Filter');
});

// Error 404 de manera dinámica
// Todos los parámetros que se reciban por GET los enviará un STRING
// No olvidar poner un string
router.get('/:id',
validatorHandler(getComentarioSchema, 'params'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const comentario = await service.findOne(id);
    res.json(comentario);
  } catch (error) {
    next(error);
  }
});

// MÉTODOS POST
router.post('/',
validatorHandler(createComentarioSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newComentario = await service.create(body);
  res.status(201).json(newComentario);
});

// MÉTODOS PATCH
router.patch('/:id',
validatorHandler(getComentarioSchema, 'params'),
validatorHandler(updateComentarioSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const comentario = await service.update(id, body);
    res.json(comentario);
  } catch (error) {
    next(error);
  }
});

// MÉTODOS PUT
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

// MÉTODOS DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;

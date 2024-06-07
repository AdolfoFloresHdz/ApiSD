// esquemas con Joi
const Joi = require('joi');

const id = Joi.string().uuid();
const id_publicacion = Joi.string().uuid();
const id_usuario = Joi.string().uuid();
const texto = Joi.string().min(1).max(100);
const fecha = Joi.date();

const createComentarioSchema = Joi.object({
  id_publicacion: id_publicacion.required(),
  id_usuario: id_usuario.required(),
  texto: texto.required(),
  fecha: fecha.required(),
});

const updateComentarioSchema = Joi.object({
  id_publicacion: id_publicacion,
  id_usuario: id_usuario,
  texto: texto,
  fecha: fecha,
});

const getComentarioSchema = Joi.object({
  id: id.required(),
});

module.exports = { createComentarioSchema, updateComentarioSchema, getComentarioSchema };

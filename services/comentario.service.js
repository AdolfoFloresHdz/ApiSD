const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ComentarioService {

  constructor() {
    this.comentarios = [];
    this.generate();
  }

  // Método y forma asíncrona
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.comentarios.push({
        id: faker.string.uuid(),
        id_publicacion: faker.string.uuid(),
        id_usuario: faker.string.uuid(),
        texto: faker.lorem.sentence(),
        fecha: faker.date.recent(),
      });
    }
  }

  async create(data) {
    const newComentario = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.comentarios.push(newComentario);
    return newComentario;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.comentarios);
      }, 5000);
    });
  }

  async findOne(id) {
    const comentario = this.comentarios.find(item => item.id === id);
    if (!comentario) {
      throw boom.notFound('Comentario no encontrado');
    }
    // regla de negocio
    if (comentario.isBlock) {
      throw boom.conflict('Comentario está bloqueado');
    }
    return comentario;
  }

  async update(id, changes) {
    const index = this.comentarios.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Comentario no encontrado');
    }
    // Obtener el comentario
    const comentario = this.comentarios[index];
    this.comentarios[index] = {
      ...comentario, // Comentarios
      ...changes     // Cambios
    };
    return this.comentarios[index];
  }

  // Buscar el ID
  async delete(id) {
    const index = this.comentarios.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Comentario no encontrado');
    }
    this.comentarios.splice(index, 1);
    return { id };
  }

}

module.exports = ComentarioService;

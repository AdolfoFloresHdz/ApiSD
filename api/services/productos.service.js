const { faker } = require('@faker-js/faker');
const boom = require ('@hapi/boom')

class ProductosService {

  constructor() {
    this.productos = []
    this.generte()
  }

  //metodo y fomra asincrona async
  generte() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.productos.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProducto = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.productos.push(newProducto)
    return newProducto
  }

  find() {
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        resolve(this.productos)
      }, 5000);
    })
  }

  async findOne(id) {

    const producto = this.productos.find(item => item.id === id)
    if (!producto){
      //tipo de errores bomm
     throw boom.notFound('producto no encontrado')
    }
    //regla de negocio
    if(producto.isBlock){
      throw boom.conflict('producto esta blokeado ')
    }
    return producto
  }

  async update(id, changes) {
    const index = this.productos.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('producto no encontrado')
    }
    //tener el producto
    const producto = this.productos[index]
    this.productos[index] = //split operation
    {//persistir todos los productos
      ...producto,//productos
      ...changes  //cambios
    }
    return this.productos[index]
  }
  //busca el id
  async delete(id) {
    const index = this.productos.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('producto no encontrado')
    }
    this.productos.splice(index, 1)
    return { id }
  }

}
module.exports = ProductosService

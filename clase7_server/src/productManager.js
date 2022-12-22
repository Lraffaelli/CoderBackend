const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.productos = [];
  }

  async addId(item){
    if(this.productos.length < 1){
      item.id = 1
    }else{
      item.id = await this.productos[this.productos.length-1]['id']+1
    }
}

  async addProduct(item) {
    
    let newId = await this.addId(item)
    console.log(newId)
    
    const newObj= {...item, id:newId}
    console.log(newObj)
    this.productos.push(newObj)
    try {     
      await fs.promises.writeFile(
        this.path, JSON.stringify(this.productos,null, 2)        
      );
      return newObj

    } catch (err) {
      console.log(`Error al leer el archivo: ${err}`);
    }
  }

  async writeFile() {
    try {
      const data = await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.productos, null, 2)
      );
      return data;
    } catch (error) {
      console.log("Error de lectura", error);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.path, "utf-8");
      let productos = JSON.parse(contenido);
      return productos;
    } catch {
      console.log("Error de lectura", error);
    }
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile( this.path, "utf-8");

      let productos = JSON.parse(data);

      const producto = productos.find((producto) => producto.id === id);

      if (producto) {
        return producto;
      } else {
        return console.log("El producto no existe");
      }
    } catch (error) {
      console.log(`Error al leer el archivo: ${error}`);
    }
  }
  

  async deleteById(id) {
    try {
      let data = await fs.promises.readFile( this.path, "utf-8");

      let productos = JSON.parse(data);
        const newProducto = productos.filter((item) => item.id !== id);
  
        await fs.promises.writeFile(this.path,
          JSON.stringify(newProducto, null, 2)
        ); 
           
    } catch (error) {
      console.log(`Error al leer el archivo: ${error}`);
    }
  }
  async deleteAll(){
    try {
      const data = await fs.promises.writeFile(
        this.path,
        JSON.stringify([], null, 2)
      );
      console.log(data);
    } catch (error) {
      console.log("Error de lectura", error);
    }
  }

}

module.exports ={ProductManager}

/* const contenedor = new ProductManager("productos.txt");
//console.log(contenedor)
contenedor.save("casa","descripcion de producto", 24,"http//imagen.jpg", "AR34",10);
contenedor.save("lata","descripcion de producto", 34,"http//imagen.jpg", "SX89",7);
contenedor.save("escuadra","descripcion de producto", 122,"http//imagen.jpg", "GT44",15);
 */
/* contenedor.writeFile();
contenedor.getAll()  */
//contenedor.deleteById(1)
//contenedor.deleteAll()

/* contenedor.writeFile();

contenedor.deleteById(1)
contenedor.updateById(2,'title'); */





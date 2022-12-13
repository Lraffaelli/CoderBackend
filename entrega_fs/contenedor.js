const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.productos = [];
  }

  addId(item){
    if(this.productos.length < 1){
      item.id= 1
    }else{
      item.id= this.productos[this.productos.length-1]['id']+1
    }
}

  save(title, description,price, thumbnail,code,stock) {
    let item = {};
    this.addId(item)
    item.title = title;
    item.description= description;
    item.price = price;
    item.thumbnail = thumbnail;
    item.code= code;
    item.stock= stock;
    this.productos.push(item);
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
      console.log(contenido);
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


const contenedor = new ProductManager("productos.txt");
//console.log(contenedor)
contenedor.save("casa","descripcion de producto", 24,"http//imagen.jpg", "AR34",10);
contenedor.save("lata","descripcion de producto", 34,"http//imagen.jpg", "SX89",7);
contenedor.save("escuadra","descripcion de producto", 122,"http//imagen.jpg", "GT44",15);

/* contenedor.writeFile();
contenedor.getAll()  */
//contenedor.deleteById(1)
//contenedor.deleteAll()

contenedor.writeFile();

contenedor.deleteById(1)
contenedor.updateById(2,'title');





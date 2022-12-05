
class ProductManager{
    constructor(){
        this.products = [];
    }

    addId(product){
        if(this.products.length < 1){
            product['id']= 1
        }else{
            product['id']= this.products[this.products.length-1]['id']+1
        }
    }
    

    addProduct(title,description,price,thumbnail,code,stock){
        let product ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock:stock || 1
        }
        this.addId(product)
        
        const values = Object.values(product)
        values.forEach(value =>{
            if(value.length<0){
                console.log('Todos los campos son obligatorios')
            }
        })
        console.log(values)
        
        this.products.push(product);
        return this.products
        
      
    }
    getAllProducts(){
        return this.products;
    }

     getProductById(id){
        const findProduct =  this.products.find(product => product.id==id)
        return findProduct
    }
}

const productos = new ProductManager()
productos.addProduct('Laptop', 'laptop Gamer',1200,'http//images.com/','AR23',10)
//productos.addProduct('Mouse', 'Mouse Gamer',300,'http//images.com/','AR23')
console.log(productos.getAllProducts())

//console.log(productos.getProductById(2))
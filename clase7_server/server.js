const express = require('express');
const app = express();
const {ProductManager} = require('./src/productManager')

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

const products = new ProductManager('./productos.json')  

app.get('/productos', async(req,res)=>{
    let productos = await products.getAll()
    res.send(productos)
})

app.post('/productos', async(req,res)=>{
    let product=req.body
    products.addProduct(product)
    res.send(product)
})

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})
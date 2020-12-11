const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
require('../models/project');
require('../connection/conn');
const PORT = process.env.PORT || 3000;
const Product = require('../models/project');


//setting th views directory
app.set('views', path.join(__dirname, '../views/products'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../public')))


//for method-override
app.use(methodOverride('_method'))
//for getting data from the form input
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//getting the product
app.get('/products', async (req, res) => {
    const getProduct = await Product.find()
    res.render("allproduct", { getProduct })

})

// new product page
app.get('/products/new', (req, res) => {
    res.render("newproduct")
})


//Showing by id
app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const idProduct = await Product.findById(id)
    res.render("showbyid", { idProduct })
})

//Creating and storing the product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.redirect(`/products/${newProduct.id}`)
})

//getting edit form
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('edit', { product })
})


//Update the product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true, useFindAndModify: false })
    res.redirect(`/products/${product.id}`)
})

//deleting the product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})


app.listen(PORT, () => {
    console.log(`Server Running On The ${PORT} port`);
});

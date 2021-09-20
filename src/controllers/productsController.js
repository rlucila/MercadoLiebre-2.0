const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require ('../utils/toThousand');
const toDiscount = require ('../utils/toDiscount.js');
const firstLetter = require('../utils/firstLetter');

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		return res.render ('products', {
			products,
			toThousand,
			toDiscount
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		return res.render ('detail',{
			product : products.find(product => product.id === +req.params.id),
			toThousand,
			toDiscount
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name, price, discount,category,description} = req.body;
		let product = {
            id : products[products.length - 1].id + 1,
            name : name.trim(),
            price : +price,
            discount : +discount,
            category,
			description : description.trim(), 
            image : 'default-image.png'
        }
		products.push(product)

        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(products,null,3),'utf-8');	

		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		return res.render ('product-edit-form',{
			product : products.find(product => product.id === +req.params.id)
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const {name, price, discount,category,description} = req.body;
		let productModified = {
            id : +req.params.id,
            name : name.trim(),
            price : +price,
            discount : +discount,
            category,
			description : description.trim(), 
            image : 'default-image.png'
        }
		let productsModified = products.map(product => product.id === +req.params.id ? productModified : product);

        fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(productsModified,null,3),'utf-8');	

		return res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let productsModified = products.filter(product => product.id !== +req.params.id)

		fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'),JSON.stringify(productsModified,null,3),'utf-8');
		
		return res.redirect('/products')
	}
};

module.exports = controller;
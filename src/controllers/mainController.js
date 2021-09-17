const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require ('../utils/toThousand');
const toDiscount = require ('../utils/toDiscount.js');
const firstLetter = require('../utils/firstLetter');

const controller = {
	index: (req, res) => {
		return res.render('index',{
		products,
		toThousand,
		toDiscount
	    })
	},
	search: (req, res) => {
		// Do the magic
		return res.render ('results', {
			products : products.filter( product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase())),
			toDiscount,
			toThousand
		})
	},
};

module.exports = controller;

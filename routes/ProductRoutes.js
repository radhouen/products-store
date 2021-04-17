const mongoose = require("mongoose");
const { clearKey } = require("../services/cache");
const Product = mongoose.model("Product");
const express = require('express');
let router = express.Router();

router.route("/").get( async (req, res) => {
    console.log(req.query);
    let size = req.query.size;
    let page = req.query.page;
    let price = req.query.price ? +req.query.price : 0;
    let averageScore = req.query.averageScore ? +req.query.averageScore : 0 ; 
    let productName = req.query.productName ? { productName: req.query.filter } : {};
    let products;
    products = await Product.find(productName).where('price').gt(price).where('averageScore').gt(averageScore).limit(+size).skip(+size * +page).cache();
    console.log("value from the cache server", products);
    res.send(products);
  });

  router.route("/").post(async (req, res) => {
    const { productName, price, averageScore } = req.body;
    const product = new Product({
      productName,
      price,
      averageScore
    });
    try {
      await product.save();
      clearKey(Product.collection.collectionName);
      res.send(product);
    } catch (err) {
      res.send(400, err);
    }
  });

module.exports = router;


const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const productchema = new Schema({
  productName: String,
  price: Number,
  averageScore: Number
});
productchema.plugin(mongoosePaginate);
mongoose.model("Product", productchema);



const mongoose = require('mongoose');
const config = require("../config.js");

mongoose.connect(`${config.mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema, model } = require('mongoose');

const coinSchema = new Schema({
  userID: { type: String, required: true },
  coins: { type: Number, default: 0 },
});

module.exports = model('Coin', coinSchema);
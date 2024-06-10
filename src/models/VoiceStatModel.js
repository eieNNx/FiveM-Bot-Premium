const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const config = require("../config.js");

mongoose.connect(`${config.mongourl}`, { useNewUrlParser: true, useUnifiedTopology: true });

const VoiceStatSchema = mongoose.Schema({
  userId: { type: String, required: true },
  duration: { type: Number, default: 0 },
});

module.exports = model('VoiceStatModel', VoiceStatSchema);

var mongoose = require('mongoose');

// sub document schema for player detail
var playerDetailSchema = new mongoose.Schema({ 
	phone: String,
	mail: String
});

// document schema for player
exports.playerSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	nickname: String,
	picture: String,
	details: playerDetailSchema
});
var mongoose = require('mongoose');

// sub document schema for tournament player
var tournamentPlayerSchema = new mongoose.Schema({ 
	player_id: String,
	pos: Number,
	points: Number,
	money: Number,
	pay: Number
});

// sub document schema for tournament detail
var tournamentDetailSchema = new mongoose.Schema({ 
	location: String,
	tables: { type: Number, default: 1 },
	final: { type: Boolean, default: 0 }
});

// document schema for tournament
exports.tournamentSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	year: Number,
	date: { type: Date, default: Date.now },
	details: tournamentDetailSchema,
	results: [tournamentPlayerSchema]
});

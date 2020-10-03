





// Mongo init
var mongo = require('mongodb');
/* var Server = mongo.Server;
var Db = mongo.Db; */
var BSON = mongo.BSONPure;
// Mongo Lab URI
var uri = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
//var uri = 'mongodb://MongoLab-52:A_Lw.v09UhRjTy_wkkJv0re8HZj3F6.i.7Wwz57nbFs-@ds045107.mongolab.com:45107/MongoLab-52';
//var uri = 'mongodb+srv://MongoLab-52:X4g8mrGi10xc7Ong@mongolab-52.u0rrv.azure.mongodb.net/MongoLab-52?retryWrites=true&w=majority';

var jwt = require('jsonwebtoken');
const { pipeline } = require('stream');
var tokenSign = '454354356457 vhhegj68888';

var db = null;
var mongoClient = mongo.MongoClient;

mongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function(error, client){       
	console.log("connected, db: " + client.db().databaseName);
	db = client.db();
	db.addListener("error", function(error){
	console.log("Error connecting to MongoLab");
	});
});





////Upload
//var http = require("http");
//var url = require("url");
//var multipart = require("multipart");
//var sys = require("sys");
//var fs = require("fs");
//
////Handle file upload
//function upload_file(req, res) {
//	// Request body is binary
//	req.setBodyEncoding("binary");
//
//	// Handle request as multipart
//	var stream = parse_multipart(req);
//
//	var fileName = null;
//	var fileStream = null;
//
//	// Set handler for a request part received
//	stream.onPartBegin = function(part) {
//		sys.debug("Started part, name = " + part.name + ", filename = " + part.filename);
//
//		// Construct file name
//		fileName = "./uploads/" + stream.part.filename;
//
//		// Construct stream used to write to file
//		fileStream = fs.createWriteStream(fileName);
//
//		// Add error handler
//		fileStream.addListener("error", function(err) {
//			sys.debug("Got error while writing to file '" + fileName + "': ", err);
//		});
//
//		// Add drain (all queued data written) handler to resume receiving request data
//		fileStream.addListener("drain", function() {
//			req.resume();
//		});
//	};
//
//	// Set handler for a request part body chunk received
//	stream.onData = function(chunk) {
//		// Pause receiving request data (until current chunk is written)
//		req.pause();
//
//		// Write chunk to file
//		// Note that it is important to write in binary mode
//		// Otherwise UTF-8 characters are interpreted
//		sys.debug("Writing chunk");
//		fileStream.write(chunk, "binary");
//	};
//
//	// Set handler for request completed
//	stream.onEnd = function() {
//		// As this is after request completed, all writes should have been queued by now
//		// So following callback will be executed after all the data is written out
//		fileStream.addListener("drain", function() {
//			// Close file stream
//			fileStream.end();
//			// Handle request completion, as all chunks were already written
//			upload_complete(res);
//		});
//	};
//}
//
////Create multipart parser to parse given request
//function parse_multipart(req) {
//	var parser = multipart.parser();
//
//	// Make parser use parsed request headers
//	parser.headers = req.headers;
//
//	// Add listeners to request, transfering data to parser
//
//	req.addListener("data", function(chunk) {
//		parser.write(chunk);
//	});
//
//	req.addListener("end", function() {
//		parser.close();
//	});
//
//	return parser;
//}
//
//function upload_complete(res) {
//	sys.debug("Request complete");
//
//	// Render response
//	res.sendHeader(200, {"Content-Type": "text/plain"});
//	res.write("Thanks for playing!");
//	res.end();
//
//	sys.puts("\n=> Done");
//}





 
exports.getTournaments = function(req, res) {
    db.collection('tournaments', function(err, collection) {
        collection.find().sort( { date: -1 } ).toArray(function(err, items) {
            res.send(items);
        });
    });
}; 

exports.findTournaments = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving tournaments: ' + id);
    db.collection('tournaments', function(err, collection) {
        collection.findOne({'_id':parseInt(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.updateTournament = function(req, res) {
    var id = req.params.id;
    var tournament = req.body;
    console.log('Updating tournament: ' + id);
    console.log(JSON.stringify(tournament));
    db.collection('tournaments', function(err, collection) {
        collection.updateOne({'_id':new BSON.ObjectID(id)}, {$set: tournament}, function(err, result) {
            if (err) {
                console.log('Error updating tournament: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(tournament);
            }
        });
    });
}






exports.getYearTournaments = function(req, res) {
	var y = req.params.y;
	db.collection('tournaments', function(err, collection) {
		collection.find({'year': parseInt(y)}, {'sort':[['date','desc']]}).toArray(function(err, results) {
			res.json(results);
		});
	});
};

exports.getFinalYearTournament = function(req, res) {
	var y = req.params.y;
	db.collection('tournaments', function(err, collection) {
		collection.find( {$and:[{'year': parseInt(y)},{'details.final': 1}]}, {'limit':1, 'sort':[['date','desc']]}).toArray(function(err, results) {
			res.json(results);
		});
	});
};

exports.getTournamentById = function(req, res) {
	var id = req.params.id;
	db.collection('tournaments', function(err, collection) {
		collection.find( {'_id': parseInt(id)}, {'limit':1}).toArray(function(err, results) {
			res.json(results);
		});
	});
};

exports.getTournamentLocations = function(req, res) {
	db.collection('tournaments', function(err, collection) {
		collection.distinct('details.location', function(err, results) {
			res.json(results);
		});
	});
};

exports.saveTournament = function(req, res) {
	var tournament = req.body;
	var existingTournament;
	tournament.date= new Date(tournament.date);
	console.log('Save tournament: ' + JSON.stringify(tournament));

	//Check id present
	db.collection('tournaments', function(err, collection) {
		collection.findOne({'_id':parseInt(tournament._id)}, function(err, item) {
			existingTournament=item;
			if(existingTournament) {
				db.collection('tournaments', function (err, collection) {
					collection.updateOne({'_id':parseInt(tournament._id)}, {$set: tournament}, function (err, result) {
						if (err) {
							console.log('Error: ' + err.message);
							res.send({'error': err.message});
						} else {
							console.log('Update success: ' + JSON.stringify(result));
							res.send(result);
						}
					});
				});
			}
			else {
				db.collection('tournaments', function (err, collection) {
					collection.insertOne(tournament, function (err, result) {
						if (err) {
							console.log('Error: ' + err.message);
							res.send({'error': err.message});
						} else {
							console.log('Insert success: ' + JSON.stringify(result));
							res.send(result);
						}
					});
				});
			}
		});
	});
}

exports.deleteTournament = function(req, res) {
	//var id = req.params.id;
	var tournament = req.body;
	console.log('Deleting tournament: ' + tournament._id);
	db.collection('tournaments', function(err, collection) {
		//collection.remove({'_id':new BSON.ObjectID(tournament._id)}, {safe:true}, function(err, result) {
		collection.deleteOne({'_id':parseInt(tournament._id)}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
}










exports.getStats = function(req, res) {
	var stats;
	var seasonWins;
	var finalWins;
	var yFrom = req.params.yFrom;
	var yTo = req.params.yTo;
	var type = req.params.type;		
	var sort = { $sort : {} };
		sort.$sort[type] = -1;

		//console.log('Retrieving stats: ' + yFrom + ' - ' +yTo);
    db.collection('tournaments', function(err, collection) {
		collection.aggregate([
			{$match : {year : {$gte: parseInt(yFrom), $lte : parseInt(yTo) }}},
		    {$unwind:'$results'},
		    {$group: { 
					_id:'$results.player_id',
					pointsTot:{$sum: '$results.points'},
					pointsAvg:{$avg: '$results.points'},
					moneyTot:{$sum: '$results.money'},
					moneyAvg:{$avg: '$results.money'},
					buyTot:{$sum: '$results.pay'},
                    buyTotNoFinal:{$sum:{$cond: [{$eq:['$details.final', 0]}, '$results.pay', 0 ]}},
					winFinalTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 1]}]}, 1, 0 ]}},
					winTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 0]}]}, 1, 0 ]}},
					headsupTot:{$sum: {$cond: [{$and:[{$or:[{$eq:['$results.pos', 1]},{$eq:['$results.pos', 2]}]},{$eq:['$details.final', 0]}]}, 1, 0 ]}},
					matchTot:{$sum: {$cond: [{$eq:['$details.final', 0]}, 1, 0 ]}},
					matchFinalTot:{$sum: {$cond: [{$eq:['$details.final', 1]}, 1, 0 ]}},
					winSeries:{$sum: 0},
					winSeriesTemp:{$sum: 0},
					headsupSeries:{$sum: 0},
					headsupSeriesTemp:{$sum: 0},
					seasonWins: {$sum: 0},
					finalWins:{$sum: 0}
					}},
		    {$project : {
					_id: 1, 
					pointsTot: 1,
					matchTot:1,
					matchFinalTot:1,
					pointsAvg:{$cond:[{$eq:['$matchTot', 0]},0,{ $divide:["$pointsTot","$matchTot"]}]},
                    pointsBuyAvg:{$cond:[{$eq:['$buyTotNoFinal', 0]},0,{ $divide:["$pointsTot","$buyTotNoFinal"]}]},
                    winFinalTot: 1,
					winTot: 1,
					winPerc :   {$cond:[{$eq:['$matchTot', 0]},0,{ $multiply: [{ $divide:[ "$winTot", "$matchTot" ]},100]}]},
					headsupTot : 1,
                    headsupPerc : {$cond:[{$eq:['$matchTot', 0]},0,{ $multiply: [{ $divide:[ "$headsupTot", "$matchTot" ]},100]}]},
                    headsupWinPerc : {$cond: [ {$gt:['$headsupTot', 0]}, { $multiply: [{ $divide:[ "$winTot", "$headsupTot" ]},100]}, 0 ]},
					moneyTot: 1,
					moneyAvg:1,
					moneyProfit : { $subtract: [ "$moneyTot", "$payTot" ]},
					moneyProfitAvg: {$cond:[{$eq:['$payTot', 0]},0,{ $divide:[ { $subtract: [ "$moneyTot", "$payTot" ]}, "$matchTot" ]}]},
					buyTot: 1,
                    buyTotNoFinal:1,
					winSeries:1,
					winSeriesTemp:1,
					headsupSeries:1,
					headsupSeriesTemp:1,
					seasonWins:1,
					finalWins:1
					}},
			//{$sort: {sortAction: -1, pointsTot: -1, moneyTot: -1}}
			sort
		    ]).toArray(function(err, results) {
			//res.json(results);
			stats = results;
			
			db.collection('tournaments', function(err, collection) {
				collection.aggregate([
					{$match : {year : {$gte: parseInt(yFrom), $lte : parseInt(yTo) }}},
					{$unwind:'$results'},
			 		{$group: { 
						_id:{player:'$results.player_id',year:'$year'},
						pointsTot:{$sum: '$results.points'},
					 	lastDate : {$max: '$date'}}}, 
					{$sort: {'_id.year':-1, 'pointsTot':-1}}, 
					{$group: {
						_id: '$_id.year',
						player:{$first:'$_id.player'} ,
						year:{$first:'$_id.year'} ,
						point: {$max: '$pointsTot'},
						lastDate : {$max: '$lastDate'}}}, 
					{$project: {
						_id:1,
						player:1,
						year:1,
						point:1,
						lastWeek : { $isoWeek: { date: '$lastDate' } }}}, 
					{$match: {$and: [{lastWeek: {$gte: 50, $lt: 53}}]}}, 
					{$sort: {'year':-1}},
					{$group: {
						_id: '$player', 
						seasonWins: {$push: {year: '$year', point: '$point'}}}}					 
				  ]).toArray(function(err, results) {
					//res.json(results);
					seasonWins = results;
					if(seasonWins != 0 && stats != null)
					{
						for (i = 0; i < seasonWins.length; i++) {
							for (p = 0; p < stats.length; p++) {
								if(seasonWins[i]._id == stats[p]._id)
								{
									stats[p].seasonWins = seasonWins[i].seasonWins
									break;
								}
							}
						}
					}

					db.collection('tournaments', function(err, collection) {
						collection.aggregate([
							{$match : {$and:[{"details.final":1}, {year : {$gte: parseInt(yFrom), $lte : parseInt(yTo) }}]}},
							{$unwind:'$results'},
							{$match : {"results.pos":1}},
							{$sort: {'year':-1}},
							{$group: {
								_id:'$results.player_id',
								finalWins:{$push: {year: '$year', pos: '$results.pos'}}}}							
						]).toArray(function(err, results) {
							//res.json(results);
							finalWins = results;
							if(finalWins != 0 && stats != null)
							{
								for (i = 0; i < finalWins.length; i++) {
									for (p = 0; p < stats.length; p++) {
										if(finalWins[i]._id == stats[p]._id)
										{
											stats[p].finalWins = finalWins[i].finalWins
											break;
										}
									}
								}
							}

			db.collection('tournaments', function(err, collection) {
				collection.find({year : {$gte: parseInt(yFrom), $lte : parseInt(yTo) }}).sort( { date: -1 } ).toArray(function(err, items) {
					if(stats != null)
					{
						for (i = 0; i < items.length; i++) {
							for (p = 0; p < items[i].results.length; p++) {
								for (j = 0; j < stats.length; j++) {
									if (stats[j]._id == items[i].results[p].player_id) {
										playerPresent = true;
										if(p==0){
											stats[j].winSeriesTemp++;
											stats[j].headsupSeriesTemp++;
											if(stats[j].winSeriesTemp>stats[j].winSeries)
												stats[j].winSeries=stats[j].winSeriesTemp;
											if(stats[j].headsupSeriesTemp>stats[j].headsupSeries)
												stats[j].headsupSeries=stats[j].headsupSeriesTemp;
										}
										else {
											if(p==1){
												stats[j].headsupSeriesTemp=0;
											}
											stats[j].winSeriesTemp=0;
										}
										break;
									}
								}
							}
						}
					}
					res.json(stats);
				});
			});

		});

		});

		});		  

        });
	});
});
};








exports.getStats2 = function(req, res) {
    var stats;
	var yFrom = req.params.yFrom;
	var yTo = req.params.yTo;
	var type = req.params.type;		
	var sort = { $sort : {} };
		sort.$sort[type] = -1;

		//console.log('Retrieving stats: ' + yFrom + ' - ' +yTo);
    db.collection('tournaments', function(err, collection) {
		collection.aggregate([
			{$match : {year : {$gte: parseInt(yFrom), $lte : parseInt(yTo) }}},
		    {$unwind:'$results'},
		    {$group: { 
					_id:'$results.player_id',
					pointsTot:{$sum: '$results.points'},
					pointsAvg:{$avg: '$results.points'},
					moneyTot:{$sum: '$results.money'},
					moneyAvg:{$avg: '$results.money'},
					buyTot:{$sum: '$results.pay'},
                    buyTotNoFinal:{$sum:{$cond: [{$eq:['$details.final', 0]}, '$results.pay', 0 ]}},
					winFinalTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 1]}]}, 1, 0 ]}},
					winTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 0]}]}, 1, 0 ]}},
					headsupTot:{$sum: {$cond: [{$and:[{$or:[{$eq:['$results.pos', 1]},{$eq:['$results.pos', 2]}]},{$eq:['$details.final', 0]}]}, 1, 0 ]}},
					//headsupTrend:{$sum: {$cond: [{$lte:['$results.pos', 2]},
					//	                  {$cond: [{$eq:['$results.pos', 1]},
					//					  {$cond: [{$lte:['$headsupTrend', 0]}, -'$headsupTrend' +1, +1 ]},
					//					  {$cond: [{$gte:['$headsupTrend', 0]}, -'$headsupTrend' -1, -1 ]}
					//					  ]},0]}},
					matchTot:{$sum: {$cond: [{$eq:['$details.final', 0]}, 1, 0 ]}},
					matchFinalTot:{$sum: {$cond: [{$eq:['$details.final', 1]}, 1, 0 ]}},
					winSeries:{$sum: 0},
					winSeriesTemp:{$sum: 0},
					headsupSeries:{$sum: 0},
					headsupSeriesTemp:{$sum: 0}
					}},
		    {$project : {
					_id: 1, 
					pointsTot: 1,
					matchTot:1,
					matchFinalTot:1,
					pointsAvg:{ $divide:["$pointsTot","$matchTot"]},
                    pointsBuyAvg:{ $divide:["$pointsTot","$buyTotNoFinal"]},
                    winFinalTot: 1,
					winTot: 1,
					winPerc : { $multiply: [{ $divide:[ "$winTot", "$matchTot" ]},100]},
					headsupTot : 1,
                    headsupPerc : { $multiply: [{ $divide:[ "$headsupTot", "$matchTot" ]},100]},
                    headsupWinPerc : {$cond: [ {$gt:['$headsupTot', 0]}, { $multiply: [{ $divide:[ "$winTot", "$headsupTot" ]},100]}, 0 ]},
					moneyTot: 1,
					moneyAvg:1,
					moneyProfit : { $subtract: [ "$moneyTot", "$payTot" ]},
					moneyProfitAvg: { $divide:[ { $subtract: [ "$moneyTot", "$payTot" ]}, "$matchTot" ]},
					buyTot: 1,
                    buyTotNoFinal:1,
					winSeries:1,
					winSeriesTemp:1,
					headsupSeries:1,
					headsupSeriesTemp:1
					}},
			//{$sort: {sortAction: -1, pointsTot: -1, moneyTot: -1}}
			sort
		    ]).toArray(function(err, results) {
			//res.json(results);
			stats = results;

			db.collection('tournaments', function(err, collection) {
				collection.find({year : {$gte: parseInt(yFrom), $lte : parseInt(yTo) }}).sort( { date: -1 } ).toArray(function(err, items) {

					for (i = 0; i < items.length; i++) {
						for (p = 0; p < items[i].results.length; p++) {
							for (j = 0; j < stats.length; j++) {
								if (stats[j]._id == items[i].results[p].player_id) {
									playerPresent = true;
									if(p==0){
										stats[j].winSeriesTemp++;
										stats[j].headsupSeriesTemp++;
										if(stats[j].winSeriesTemp>stats[j].winSeries)
											stats[j].winSeries=stats[j].winSeriesTemp;
										if(stats[j].headsupSeriesTemp>stats[j].headsupSeries)
											stats[j].headsupSeries=stats[j].headsupSeriesTemp;
									}
									else {
										if(p==1){
											stats[j].headsupSeriesTemp=0;
										}
										stats[j].winSeriesTemp=0;
									}
									break;
								}
							}
						}
					}
					res.json(stats);
				});
			});

        });
    });
};

exports.getStatTypes = function(req, res) {
	var statTypes = [
						{type:'pointsTot', label:'Punti'},
						{type:'pointsAvg', label:'Media punti tornei'},
                        {type:'pointsBuyAvg', label:'Media punti buy-in'},
						{type:'winFinalTot', label:'Vittorie finali'},
						{type:'winTot', label:'Vittorie'},
						{type:'winPerc', label:'Percentuale vittorie'},
						{type:'headsupTot', label:'Headsup'},
						{type:'headsupPerc', label:'Percentuale headsup'},
                        {type:'headsupWinPerc', label:'Perc. vittorie headsup'},
                        {type:'moneyTot', label:'Montepremi'},
						{type:'moneyAvg', label:'Media montepremi'},
					/*	{type:'moneyProfit', label:'Profitti'},
						{type:'moneyProfitAvg', label:'Media profitti'},*/
						{type:'matchTot', label:'Tornei'},
						{type:'matchFinalTot', label:'Tavoli finali'},
						{type:'winSeries', label:'Serie vittorie'},
						{type:'headsupSeries', label:'Serie headsup vinti'},
						{type:'buyTotNoFinal', label:'Buy-in'}
					];
	res.send(statTypes);
};






exports.getAllPlayerFiles = function(req, res) {

	var getAllFilesFromFolder = function(dir) {
		var filesystem = require("fs");
		var players = [];

		filesystem.readdirSync(dir).forEach(function(file) {
			var player = file.slice(0, -4);
			file = dir+'/'+file;
			var stat = filesystem.statSync(file);

			if (stat && stat.isDirectory()) {
				file = file.concat(_getAllFilesFromFolder(file))
			} else players.push(player);

		});
		return players;
	};

	var results = getAllFilesFromFolder(__dirname + "/../.." + "/app/resources/players");
	res.json(results);
};


const pplinePlayer = [
	{$unwind: {
		path: '$results', 
		includeArrayIndex: 'index', 
		preserveNullAndEmptyArrays: false
	  }},
	{$group: {
		_id:'$results.player_id',
		matchTot:{$sum: 1}
	}},
	{$project : {
		_id: 1,
		matchTot:1
	}},
	{$sort : {
		matchTot:-1
	}}
];

exports.getAllPlayers = function(req, res) {
    db.collection('tournaments', function(err, collection) {
        collection.aggregate(pplinePlayer).toArray(function(err, results) {
				var players = [];
				if(results) {
					for (i = 0; i < results.length; i++) {
						players.push(results[i]._id);
					}
				}
				res.json(players);
			});
        });
}; 


/* const pplineRankPlayer1 = [
	{$match : {year : parseInt(y)}},
	{$unwind:'$results'},
	{$group: {
			_id:'$results.player_id',
			pointsTot:{$sum: '$results.points'},
			winFinalTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 1]}]}, 1, 0 ]}},
			winTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 0]}]}, 1, 0 ]}},
			stack:{$sum: 0},
			pos:{$sum: 0},
			pointsPrev:{$sum: 0},
			posPrev:{$sum: 0}
			}},
	{$project : {
			_id: 1,
			pointsTot: 1,
			winFinalTot: 1,
			winTot: 1,
			stack: 1,
			pos: 1,
			pointsPrev: 1,
			posPrev:1
			}},
	{$sort : {
			pointsTot:-1
			}}
	]; */

/* const pplineRankPlayer2 = [
	{$match : {year : parseInt(y)}},
	{$sort : { date:-1}},
	{$skip:1},
	{$unwind:'$results'},
	{$group: {
		_id:'$results.player_id',
		pointsTot:{$sum: '$results.points'},
		winFinalTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 1]}]}, 1, 0 ]}},
		winTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 0]}]}, 1, 0 ]}},
		stack:{$sum: 0},
		pos:{$sum: 0},
		pointsPrev:{$sum: 0},
		posPrev:{$sum: 0}
	}},
	{$project : {
		_id: 1,
		pointsTot: 1,
		winFinalTot: 1,
		winTot: 1,
		stack: 1,
		pos: 1,
		pointsPrev: 1,
		posPrev:1
	}},
	{$sort : {
		pointsTot:-1
	}}

]; */

exports.getYearRankPlayers = function(req, res) {
    var y = req.params.y;	
    //console.log('Retrieving players: ' + y);
    db.collection('tournaments', function(err, collection) {
		collection.aggregate([
			{$match : {year : parseInt(y)}},
			{$unwind:'$results'},
			{$group: {
					_id:'$results.player_id',
					pointsTot:{$sum: '$results.points'},
					winFinalTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 1]}]}, 1, 0 ]}},
					winTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 0]}]}, 1, 0 ]}},
					stack:{$sum: 0},
					pos:{$sum: 0},
					pointsPrev:{$sum: 0},
					posPrev:{$sum: 0}
					}},
			{$project : {
					_id: 1,
					pointsTot: 1,
					winFinalTot: 1,
					winTot: 1,
					stack: 1,
					pos: 1,
					pointsPrev: 1,
					posPrev:1
					}},
			{$sort : {
					pointsTot:-1
					}}
			]).toArray(function(err, currResults) {
			var results = currResults;
			db.collection('tournaments', function(err, collection) {
				collection.aggregate([
					{$match : {year : parseInt(y)}},
					{$sort : { date:-1}},
					{$skip:1},
					{$unwind:'$results'},
					{$group: {
						_id:'$results.player_id',
						pointsTot:{$sum: '$results.points'},
						winFinalTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 1]}]}, 1, 0 ]}},
						winTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 0]}]}, 1, 0 ]}},
						stack:{$sum: 0},
						pos:{$sum: 0},
						pointsPrev:{$sum: 0},
						posPrev:{$sum: 0}
					}},
					{$project : {
						_id: 1,
						pointsTot: 1,
						winFinalTot: 1,
						winTot: 1,
						stack: 1,
						pos: 1,
						pointsPrev: 1,
						posPrev:1
					}},
					{$sort : {
						pointsTot:-1
					}}
				
				]).toArray(function(err, prevResults) {
					if(prevResults) {
					   for (i = 0; i < prevResults.length; i++) {
						   prevResults[i].pos = 1;
						   for (j = 0; j < prevResults.length; j++) {
							   if (parseFloat(parseFloat(prevResults[i].pointsTot).toFixed(2)) >= parseFloat(parseFloat(prevResults[j].pointsTot).toFixed(2)))
								   break;
							   else
								   prevResults[i].pos++;
						   }
					   }
					}
				   	if(results) {
						for (i = 0; i < results.length; i++) {
							results[i].pos = 1;
                            for (j = 0; j < results.length; j++) {
								if (parseFloat(parseFloat(results[i].pointsTot).toFixed(2)) >= parseFloat(parseFloat(results[j].pointsTot).toFixed(2)))
									break;
								else
									results[i].pos++;
							}
                            results[i].stack = parseFloat(parseFloat(3000 + 3500 * results[i].pointsTot / results[0].pointsTot + 3500 * (1 - ((results[i]).pos - 1) / (results.length - 1))).toFixed(2));
                            results[i].pointsTot = parseFloat(parseFloat(results[i].pointsTot).toFixed(2));

                            if(prevResults){
                                results[i].posPrev = prevResults.length+1;
								for (z = 0; z < prevResults.length; z++) {
									if (results[i]._id == prevResults[z]._id) {
										results[i].pointsPrev = parseFloat(parseFloat(prevResults[z].pointsTot).toFixed(2));
										results[i].posPrev = prevResults[z].pos;
										break;
									}
								}
							}
						}
						//var players = {players:results};
					}
					res.json(results);
				});
			});
        });
    });
};


exports.savePlayer =  function(req, res) {
}








exports.getCharts = function(req, res) {
	var series =[];
	var y = req.params.y;
	db.collection('tournaments', function(err, collection) {
		collection.countDocuments({'year': parseInt(y)}, function(err, count) {

			for (var n = 0; n < count; n++) {
				(function (clsn) {

					collection.aggregate([
						{$match: {year: parseInt(y)}},
						{$sort: {date: -1}},
						{$skip: clsn},
						{$unwind: '$results'},
						{
							$group: {
								_id: '$results.player_id',
								pointsTot: {$sum: '$results.points'},
								winTot: {$sum: {$cond: [{$and: [{$eq: ['$results.pos', 1]}, {$eq: ['$details.final', 0]}]}, 1, 0]}},
								pos: {$sum: 0},
								date: {$max: '$date'}
							}
						},
						{
							$project: {
								_id: 1,
								pointsTot: 1,
								winTot: 1,
								pos: 1,
								date: 1
							}
						},
						{
							$sort: {
								pointsTot: -1
							}
						}
					]).toArray(function (err, results) {
						if (results) {
                            var date = results[0].date;
                            for (i = 0; i < results.length; i++) {
                                if(date < results[i].date)
                                    date = results[i].date;
                            }
							for (i = 0; i < results.length; i++) {
								results[i].pos = 1;
                                results[i].date = date;
								for (j = 0; j < results.length; j++) {
									if (parseFloat(parseFloat(results[i].pointsTot).toFixed(2)) >= parseFloat(parseFloat(results[j].pointsTot).toFixed(2)))
										break;
									else
										results[i].pos++;
								}
                                results[i].pointsTot = parseFloat(parseFloat(results[i].pointsTot).toFixed(2));
							}
						}
                        if(series.length == 0)
                            series.push(results);
                        else {
                            for (i = 0; i < series.length; i++) {
                                if (results[0].date < series[i][0].date) {
                                    series.splice(i, 0, results);
                                    break;
                                }
                                if ( i == series.length-1){
                                    series.push(results);
                                    break;
                                }
                            }
                        }
						if(series.length == count) {//clsn==count-1 &&
							res.json(series);
						}
					});

				})(n)
			}
		});
	});

};




exports.getHeadsups = function(req, res) {
	var yFrom = req.params.yFrom;
	var yTo = req.params.yTo;
	//console.log('Retrieving players: ' + y);
	//var y = req.params.y;
	db.collection('tournaments', function(err, collection) {
		collection.find( {$and:[
			{"results.pos":{$lte:2}} ,
			{$and:[
				{"year":{$gte:parseInt(yFrom)}},
				{"year":{$lte:parseInt(yTo)}}]
			}]},
			{projection:{"results.player_id":1,"results.pos":1}}).toArray(function(err, results) {
			var headsups = [];
			for (i = 0; i < results.length; i++) {
				var headsup = {
					player1:results[i].results[0].player_id,
					points1:1,
					player2:results[i].results[1].player_id,
					points2:0};
				headsups.push(headsup)
			}
			var challenges = [];
			for (i = 0; i < headsups.length; i++) {
				var found = 0;
				for (j = 0; j < challenges.length; j++) {
					if ((challenges[j].player1 == headsups[i].player1 && challenges[j].player2 == headsups[i].player2)) {
						found = 1;
						challenges[j].points1++;
					}
					if ((challenges[j].player1 == headsups[i].player2 && challenges[j].player2 == headsups[i].player1)) {
						found = 1;
						challenges[j].points2++;
					}
				}
				if(!found) {
					var challenge = {
							player1: headsups[i].player1,
							points1: 1,
							player2: headsups[i].player2,
							points2: 0
						};
					challenges.push(challenge)
				}
			}
			//var players = {players:results};
			res.json(challenges);
		});
	});
};



exports.tokenSign = tokenSign;

exports.login = function(req, res) {
    var user = req.body.username;
    var psw = req.body.password;

    db.collection('logins', function(err, collection) {
        collection.find( {$and:[{'user': user},{'psw': psw}]}, {'limit':1}).toArray(function(err, results) {
            if(results.length > 0){
                var profile = {
                    first_name: req.body.username,
                    last_name: req.body.username,
                    email: '',
                    id: results[0]._id
                };

                // We are sending the profile inside the token
                var token = jwt.sign(profile, tokenSign, { expiresIn: 60*60*5 });

                res.json({ token: token });
            }
            else {
                res.send(401, 'Wrong user or password');
            }
        });
    });
};


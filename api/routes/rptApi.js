





// Mongo init
var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;
// Mongo Lab URI
var uri = process.env.CUSTOMCONNSTR_MONGOLAB_URI;


var tokenSign = '454354356457 vhhegj68888';

var db = null;
var mongoClient = mongo.MongoClient;
mongoClient.connect(uri, {}, function(error, database){       
	console.log("connected, db: " + database);
	db = database;
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
        collection.update({'_id':new BSON.ObjectID(id)}, tournament, {safe:true}, function(err, result) {
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
					collection.update({'_id':parseInt(tournament._id)}, tournament, {safe: true}, function (err, result) {
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
					collection.insert(tournament, {safe: true}, function (err, result) {
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
		collection.remove({'_id':tournament._id}, {safe:true}, function(err, result) {
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
					payTot:{$sum: '$results.pay'},
					winFinalTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 1]}]}, 1, 0 ]}},
					winTot:{$sum: {$cond: [{$and:[{$eq:['$results.pos', 1]},{$eq:['$details.final', 0]}]}, 1, 0 ]}},
					headsupTot:{$sum: {$cond: [{$or:[{$eq:['$results.pos', 1]},{$eq:['$results.pos', 2]}]}, 1, 0 ]}},
					//headsupTrend:{$sum: {$cond: [{$lte:['$results.pos', 2]},
					//	                  {$cond: [{$eq:['$results.pos', 1]},
					//					  {$cond: [{$lte:['$headsupTrend', 0]}, -'$headsupTrend' +1, +1 ]},
					//					  {$cond: [{$gte:['$headsupTrend', 0]}, -'$headsupTrend' -1, -1 ]}
					//					  ]},0]}},
					matchTot:{$sum: 1},
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
					pointsAvg:{ $divide:["$pointsTot",{ $subtract: [ "$matchTot", "$matchFinalTot" ]}]},
					winFinalTot: 1,
					winTot: 1,
					winPerc : { $multiply: [{ $divide:[ "$winTot", "$matchTot" ]},100]},
					headsupTot : 1,
					headsupPerc : {$cond: [ {$gt:['$headsupTot', 0]}, { $multiply: [{ $divide:[ "$winTot", "$headsupTot" ]},100]}, 0 ]},
					moneyTot: 1,
					moneyAvg:1,
					moneyProfit : { $subtract: [ "$moneyTot", "$payTot" ]},
					moneyProfitAvg: { $divide:[ { $subtract: [ "$moneyTot", "$payTot" ]}, "$matchTot" ]},
					payTot: 1,
					winSeries:1,
					winSeriesTemp:1,
					headsupSeries:1,
					headsupSeriesTemp:1
					}},
			//{$sort: {sortAction: -1, pointsTot: -1, moneyTot: -1}}
			sort
		    ],function(err, results) {
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
						{type:'pointsAvg', label:'Media punti'},
						{type:'winFinalTot', label:'Vittorie finali'},
						{type:'winTot', label:'Vittorie'},
						{type:'winPerc', label:'Percentuale vittorie'},
						{type:'headsupTot', label:'Headsup'},
						{type:'headsupPerc', label:'Percentuale headsup'},
						{type:'moneyTot', label:'Montepremi'},
						{type:'moneyAvg', label:'Media montepremi'},
						{type:'moneyProfit', label:'Profitti'},
						{type:'moneyProfitAvg', label:'Media profitti'},
						{type:'matchTot', label:'Tornei'},
						{type:'matchFinalTot', label:'Tavoli finali'},
						{type:'winSeries', label:'Serie vittorie'},
						{type:'headsupSeries', label:'Serie headsup vinti'},
						{type:'payTot', label:'Quote'}
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

exports.getAllPlayers = function(req, res) {

	db.collection('tournaments', function(err, collection) {
		collection.aggregate([
			{$unwind:'$results'},
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
		],function(err, results) {

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
					pointPrev:{$sum: 0},
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
		    ],function(err, currResults) {


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
						pointPrev:{$sum: 0},
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

				],function(err, prevResults) {
					if(prevResults) {
					   for (i = 0; i < prevResults.length; i++) {
						   prevResults[i].pos = 1;
						   for (j = 0; j < prevResults.length; j++) {
							   if (prevResults[i].pointsTot >= prevResults[j].pointsTot)
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
								if (results[i].pointsTot >= results[j].pointsTot)
									break;
								else
									results[i].pos++;
							}
							results[i].stack = 3000 + 3500 * results[i].pointsTot / results[0].pointsTot + 3500 * (1 - ((results[i]).pos - 1) / (results.length - 1));

                            if(prevResults){
                                results[i].posPrev = prevResults.length+1;
								for (z = 0; z < prevResults.length; z++) {
									if (results[i]._id == prevResults[z]._id) {
										results[i].pointPrev = prevResults[z].pointsTot;
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










exports.getCharts = function(req, res) {
	var series =[];
	var y = req.params.y;
	db.collection('tournaments', function(err, collection) {
		collection.count({'year': parseInt(y)}, function(err, count) {

			for (var n = 0; n < count; n++) {
				(function (clsn) {
					// tweet function
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
					], function (err, results) {
						if (results) {
							for (i = 0; i < results.length; i++) {
								results[i].pos = 1;
								for (j = 0; j < results.length; j++) {
									if (results[i].pointsTot >= results[j].pointsTot)
										break;
									else
										results[i].pos++;
								}
							}
						}
						series.push(results);
						if(clsn==count-1) {
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
			{fields:{"results.player_id":1,"results.pos":1}}).toArray(function(err, results) {
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
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    if (!(req.body.username === 'john.doe' && req.body.password === 'foobar')) {
        res.send(401, 'Wrong user or password');
        return;
    }

    var profile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        id: 123
    };

    // We are sending the profile inside the token
    var token = jwt.sign(profile, tokenSign, { expiresInMinutes: 60*5 });

    res.json({ token: token });
};


var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;


// Mongo Lab URI
var uri = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
	uri = 'mongodb://MongoLab-52:A_Lw.v09UhRjTy_wkkJv0re8HZj3F6.i.7Wwz57nbFs-@ds045107.mongolab.com:45107/MongoLab-52'
var db = null;
var mongoClient = mongo.MongoClient;
mongoClient.connect(uri, {}, function(error, database){       
	console.log("connected, db: " + database);
	db = database;
	db.addListener("error", function(error){
	console.log("Error connecting to MongoLab");
	});
});




 
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

exports.addTournaments = function(req, res) {
    var tournament = req.body;
    console.log('Adding tournament: ' + JSON.stringify(tournament));
    db.collection('tournaments', function(err, collection) {
        collection.insert(tournament, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
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
 
exports.deleteTournaments = function(req, res) {
    var id = req.params.id;
    console.log('Deleting tournament: ' + id);
    db.collection('tournaments', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}





exports.getPlayerStats = function(req, res) {	
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
					winTot:{$sum: {$cond: [ {$eq:['$results.pos', 1]}, 1, 0 ]}},
					headsupTot:{$sum: {$cond: [{$or:[{$eq:['$results.pos', 1]},{$eq:['$results.pos', 2]}]}, 1, 0 ]}},
					headsupTrend : {$sum: {$cond: [{$lte:['$results.pos', 2]}, {$cond: [{$eq:['$results.pos', 1]}, 1, -1 ]}, 0 ]}},
					matchTot:{$sum: 1}
					}},
		    {$project : {
					_id: 1, 
					pointsTot: 1,
					moneyTot: 1,
					moneyProfit : { $subtract: [ "$moneyTot", "$payTot" ]},
					winTot: 1,
					winPerc : { $multiply: [{ $divide:[ "$winTot", "$matchTot" ]},100]},
					headsupTot : 1,
					headsupPerc : {$cond: [ {$gt:['$headsupTot', 0]}, { $multiply: [{ $divide:[ "$winTot", "$headsupTot" ]},100]}, 0 ]},
					pointsAvg:1,
					moneyAvg:1,
					payTot: 1,
					matchTot:1,
					headsupTrend : 1
					}},
			//{$sort: {sortAction: -1, pointsTot: -1, moneyTot: -1}}
			sort
		    ],function(err, results) {
			//var stats = {stats:results};
			res.json(results);
        });
    });
};



exports.getAllPlayers = function(req, res) {	
    var y = req.params.y;	
    //console.log('Retrieving players: ' + y);
    db.collection('tournaments', function(err, collection) {
		collection.aggregate([
			{$match : {year : parseInt(y)}},
		    {$unwind:'$results'},
		    {$group: { 
					_id:'$results.player_id',
					pointsTot:{$sum: '$results.points'},
					winTot:{$sum: {$cond: [ {$eq:['$results.pos', 1]}, 1, 0 ]}},
					winFinalTot:{$sum: {$cond: [ {$and: [{$eq:['$results.pos', 1]}, {$eq:['$details.final', 1]}]}, 1, 0 ]}},
					matchTot:{$sum: 1}
					}},
		    {$project : {
					_id: 1, 
					pointsTot: 1,
					winTot: 1,
					winFinalTot: 1,
					matchTot:1
					}},
			{$sort : {
					winFinalTot:-1,
					winTot:-1,
					pointsTot:-1
					}}
		    ],function(err, results) {
			//var players = {players:results};
			res.json(results);
        });
    });
};



exports.getYearPlayers = function(req, res) {	
    var y = req.params.y;	
    //console.log('Retrieving players: ' + y);
    db.collection('tournaments', function(err, collection) {
		collection.aggregate([
			{$match : {year : parseInt(y)}},
		    {$unwind:'$results'},
		    {$group: { 
					_id:'$results.player_id',
					pointsTot:{$sum: '$results.points'},
					stack:{$sum: 0},
					pos:{$sum: 0}
					}},
		    {$project : {
					_id: 1, 
					pointsTot: 1,
					stack: 1,
					pos: 1
					}},
			{$sort : {
					pointsTot:-1
					}}
		    ],function(err, results) {
			for (i = 0; i < results.length; i++) { 
				results[i].pos =  1;
				for (j = 0; j < results.length; j++) {
					if (results[i].pointsTot >= results[j].pointsTot)
						break;
					else
						results[i].pos++;
				}
				results[i].stack= 3000 + 3500 * results[i].pointsTot/results[0].pointsTot + 3500 * (1- ((results[i]).pos-1)/(results.length-1));
			}
			//var players = {players:results};
			res.json(results);
        });
    });
};


 
 

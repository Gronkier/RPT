// BASE SETUP
// =============================================================================
// call the packages
var express    = require('express'); 		// call express
//var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
//var logger = require('morgan');
//var methodOverride = require('method-override');
//var session = require('express-session');
var bodyParser = require('body-parser');
//var multer = require('multer');
var errorHandler = require('errorhandler');

//Auth token
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var app        = express(); 				// define our app using express

// CONFIGURATION
// =============================================================================

app.set('port', process.env.PORT || 3003);  // set the api port
//app.set('views', path.join(__dirname, 'app/views'));
//app.set('view engine', 'jade');
app.use(favicon(__dirname + '/app/favicon.ico'));
//app.use(logger('dev'));
//app.use(methodOverride());

//app.use(session({ resave: true,
//                  saveUninitialized: true,
//                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // configure app to use bodyParser() this let get the data from a POST
//app.use(multer());
app.use(express.static(path.join(__dirname, '/app')));


// CORS header security
/*
app.use("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
    if(req.method === 'OPTIONS'){
		res.statusCode = 204;
		return res.end();
	}else{
		return next();
	}
});
*/



// ROUTES
// =============================================================================
// api call
var	rpt = require('./api/routes/rptApi');

var apiRouter = express.Router(); 				// get an instance of the express Router
app.use('/api', apiRouter); // all routes will be prefixed with /api

apiRouter.get('/tournaments/:y', rpt.getYearTournaments);
apiRouter.get('/tournament-final/:y', rpt.getFinalYearTournament);
apiRouter.get('/tournament/:id', rpt.getTournamentById);
apiRouter.get('/tournament-locations', rpt.getTournamentLocations);

apiRouter.get('/players', rpt.getAllPlayers);
apiRouter.get('/players/:y', rpt.getYearRankPlayers);

apiRouter.get('/stats/:yFrom/:yTo/:type', rpt.getStats);
apiRouter.get('/stat-types', rpt.getStatTypes);

apiRouter.get('/headsups/:yFrom/:yTo', rpt.getHeadsups);

apiRouter.get('/charts/:y', rpt.getCharts);

apiRouter.post('/authenticate', rpt.login);




// admin call
var adminRouter = express.Router(); 				// get an instance of the express Router
app.use('/adm', adminRouter); // all routes will be prefixed with /admin
app.use('/adm', expressJwt({secret: rpt.tokenSign})); // protect /adm routes with JWT

adminRouter.post('/tournament-save', rpt.saveTournament);
adminRouter.post('/tournament-delete', rpt.deleteTournament);
adminRouter.get('/*', function(req, res) {res.sendFile(__dirname + '/app/admin.html'); });   // load the single view file (angular will handle the page changes on the front-end)





// app call
var appRouter = express.Router();
app.use('/', appRouter);// get an instance of the express Router

appRouter.get('/*', function(req, res) {res.sendFile(__dirname + '/app/index.html'); });   // load the single view file (angular will handle the page changes on the front-end)


// START THE SERVER
// =============================================================================

if ('development' == app.get('env')) {   // error handling middleware should be loaded after the loading the routes
	app.use(errorHandler());
}
app.listen(app.get('port'));
console.log('rpt run on port ' + app.get('port'));





















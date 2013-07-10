var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
var port = 3000;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(deadWorker, code, signal) {
    // Restart the worker
    var worker = cluster.fork();

    // Note the process IDs
    var newPID = worker.process.pid;
    var oldPID = deadWorker.process.pid;

    // Log the event
    console.log('worker '+oldPID+' died.');
    console.log('worker '+newPID+' born.');
  });

  cluster.on('listening', function(worker, address) {
    console.log("A worker is now connected to " + address.address + ":" + address.port);
  });

} else {

    var express = require('express'),
        app = express();

    app.configure(function() {
        app.engine('.bemhtml.js', require(__dirname + '/.bem/bem-express.js').__express);
        app.set('env', 'production');
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/desktop.bundles/');
        app.set('view engine', 'bemhtml.js');
        app.use(express.static(__dirname));
        app.use(app.router);
    });

    app.get('/', function(req, res) {
        res.render('index', {
            app: app,
            slides: [
                {
                    type: 'bem',
                    tagline: 'Костя привет!'
                },
                {
                    type: 'bem',
                    tagline: 'Делай BEM!'
                }, {
                    type: 'another',
                    tagline: 'Делай THEM!'
                }
            ]
        });
    });

    app.listen(port);
}
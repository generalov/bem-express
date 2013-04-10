var express = require('express')
  , http = require('http')
  , app = express();

app.configure(function(){
    app.engine('.bemhtml.js', require(__dirname +'/.bem/bem-express.js').__express);
    app.set('env', 'development');
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
		tagline: 'Делай BEM!'
	    },
	    {
		type: 'another',
		tagline: 'Делай THEM!'
	    }
	]
    });
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});

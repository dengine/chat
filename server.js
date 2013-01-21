var express = require("express"),
    http = require("http"),    
    path = require("path"),
    io = require("socket.io",{'reconnect': true}),
    app = express();

    app.configure(function(){
      app.set('port', process.env.PORT || 8080);
      app.use(express.logger('dev'));
      app.use(express.methodOverride());
      app.use(express.bodyParser());             
      app.use(express.static(path.join(__dirname, 'public')));      
      app.use(app.router);
    });
    app.configure('development', function(){
      app.use(express.errorHandler());
    });

var ipaddr = process.env.OPENSHIFT_INTERNAL_IP || 'localhost',
    server = http.createServer(app).listen(process.env.OPENSHIFT_INTERNAL_PORT || 8080, process.env.OPENSHIFT_INTERNAL_IP || '127.0.0.1', function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), ipaddr, app.get('port'));
        });
var ioSocket = io.listen(server);

	ioSocket.configure(function(){
	      ioSocket.set("transports", ["xhr-polling"]);	
	      ioSocket.set("log level", 1);
	   });       

   app.get('/', function(req, res){
    res.redirect('/index.html');
   });
   app.get('/support', function(req, res){
    res.redirect('/support.html');
   });
   
ioSocket.sockets.on("connection", function(socket){
  socket.on('message',function(msg){
    socket.broadcast.emit('message',msg)
  })  
});



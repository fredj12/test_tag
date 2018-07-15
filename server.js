

// console.log("Démarage du server");
//Module requires
var http = require("http"),   //http node module
	fs = require("fs"),       //file system
	path = require('path'),
	url = require('url');
    
    
//Object "MIMETYPES"
var MIMETYPES = {
		html: "text/html; charset=utf-8",
		jpeg: "image/jpeg",
		jpg: "image/jpeg",
		png: "image/png",
		gif: "image/gif",
		js: "text/javascript",
		css: "text/css",
		ico : "image/x-icon"
	},
	PORT = 8080;

	var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

http.createServer(function (request, response){ //Returns a new instance of http.Server.
   // console.log("request well recieved",request.url);
	var listener = function (error, contentType){
	    if(error){
          // console.log('DIE!', error);
          if(contentType !== "undefined"){
	          response.writeHeader(500, {"Content-Type": contentType});
          }else{
	          response.writeHeader(500, {"Content-Type": "text/plain"}); 
          }
          response.end("<h1>FS READ FILE ERROR: Internal Server Error!</h1>");    
        }
    };
    
    var fileArray = request.url.split('.'),
        filenameExtension = fileArray[fileArray.length-1];
    
    
    if( MIMETYPES.hasOwnProperty(filenameExtension) ){
    	// console.log("MIMETYPES::: ",MIMETYPES[filenameExtension]);
        fs.readFile("." + request.url, function (error, fileContent){
			 if (!error){
        	// listener(error,MIMETYPES[filenameExtension]);
        	response.writeHead(200, {'Content-Type': MIMETYPES[filenameExtension]});
        	response.write(fileContent);
			response.end(); 
			 }else{
				 response.writeHead(404, {"Content-Type": "text/plain"});
				response.write("404 Not Found\n");
				response.end();
			 }
		});
    }	
}).listen(server_port, server_ip_address);// Server port
// console.log("Server démarré sur le port :" + PORT + "du localhost");



console.log("Démarage du server");
//Module requires
var http = require("http"),   //http node module
	fs = require("fs"),       //file system
	path = require('path'),
	url = require('url');
	
console.log("step 1");    
    
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
	};

console.log("step 2");   

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
	
console.log("Port : " + port);   
console.log("server_ip_address : " + server_ip_address);

http.createServer(function (request, response){ //Returns a new instance of http.Server.
   console.log("request well recieved",request.url);
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
    	console.log("MIMETYPES::: ",MIMETYPES[filenameExtension]);
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
}).listen(port, server_ip_address);// Server port
// console.log("Server démarré sur le port :" + PORT + "du localhost");


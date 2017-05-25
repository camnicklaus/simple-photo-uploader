var http = require("http");
var url = require("url");

//available keys in handle object: "/", "/start", "/upload"

function start(route, handle) {
  function onRequest(req, res) {
    
    var postData = "";
    var pathname = url.parse(req.url).pathname;
    console.log(`request for ${pathname} recieved.`);
    route(handle, pathname, res, req);
  };

  http.createServer(onRequest).listen(8888);

  console.log('server has started on port 8888');
};

exports.start = start;

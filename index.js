var server = require("./server");
var router = require("./router");
var reqHandlers = require("./reqHandlers");

var handle = {};
handle["/"] = reqHandlers.start;
handle["/start"] = reqHandlers.start;
handle["/upload"] = reqHandlers.upload;
handle["/show"] = reqHandlers.show;

server.start(router.route, handle);
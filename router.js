function route(handle, pathname, res, req) {
  console.log("about to route a req for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](res, req);
  } else {
    console.log("no request handler found for " + pathname);
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("404 Not found");
    res.end();
  }
}

exports.route = route;
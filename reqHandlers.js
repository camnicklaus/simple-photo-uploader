var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs-extra");
var formidable = require("formidable");
var uploadFileName = '';
var new_location = '/Users/camnicklaus/Documents/coding/learning-node/nodebeginner/uploadedFiles/';

function start(res, req) {
  console.log("req handler 'start' was called.");

  var body = 
      '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" content="text/html; '+
      'charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<form action="/upload" enctype="multipart/form-data" '+
     'method="post">'+
     '<input type="text" name="title" placeholder="title"><br>'+
     '<input type="file" name="upload" multiple="multiple"><br>'+
     '<input type="submit" value="Upload">'+
     '</form>'+
     '</body>'+
     '</html>';

  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(body);
  res.end();
};


function upload(res, req) {
  console.log("req handler 'upload' was called");
  var form = new formidable.IncomingForm();
  console.log("about to parse form data @upload handler");
  form.parse(req, function(error, fields, files) {
    console.log("form parsing done");
    var temp_path = form.openedFiles[0].path;
    var file_name = form.openedFiles[0].name;
    uploadFileName = file_name;
    
    fs.copy(temp_path, new_location + file_name, function(err) {
      if (err) {
        console.log(err)
      } else {
      console.log('success!');
        res.writeHead(200, {"Content-Type": "text/html"});
  res.write('received image:<br/>');
  res.write("<img src='/show' />");
  
  res.end();
      }
    })
  });  
};

function show(res, req) {
  
  console.log("req handler for 'show' was called.");
  res.writeHead(200, {"Content-Type": "image/jpg"});
  fs.createReadStream(new_location + uploadFileName).pipe(res);
  
}

exports.start = start;
exports.upload = upload;
exports.show = show;
// Create web server
// 1. Load the http module
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = [];
// 2. Create an http server to handle requests and response
http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var POST = qs.parse(body);
            comments.push(POST.comment);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Thank you for your comment');
        });
    } else if (req.method == 'GET') {
        if (path == '/comment') {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end(comments.toString());
        } else {
            fs.readFile(__dirname + path, function (err, data) {
                if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
    }
}).listen(8080);
console.log('Server running at http://');

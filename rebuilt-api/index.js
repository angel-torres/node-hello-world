const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const port = 5050;


const httpServer = http.createServer(function (req, res) {
    undefinedServer(req, res);
});

httpServer.listen(port, function (req, res) {
    console.log(`Listening on port ${port}`);
});

const httpsServer = https.createServer(function (req, res) {
    undefinedServer(req, res);
});

httpsServer.listen(port, function (req, res) {
    console.log(`Listening on port ${port}`);
});

const undefinedServer = function (req, res) {

        // Parse URL
        const parsedUrl = url.parse(req.url, true);
        const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
        // Parse method
    
        const method = req.method.toLowerCase();
        // Parse headers
        const headers = req.headers;
        // Parse body
    
        // Parse query string
        const queryStringObject = req.query;
    
        const decoder = new StringDecoder('utf-8');
    
        var buffer = '';
    
        req.on('data', function (data) {
            buffer += decoder.write(data);
        });
    
        req.on('end', function () {
            buffer += decoder.end();
    
            const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.default;
    
            const data = {
                'trimmedPath': trimmedPath,
                'queryStringObject': queryStringObject,
                'method': method,
                'headers': headers,
                'payload': buffer
            }
    
            chosenHandler(data, function (statusCode, payload) {
    
                payload = typeof (payload) === 'object' ? payload : {};
                statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
    
                const payloadString = JSON.stringify(payload);
    
                res.setHeader('Content-Type', 'application/json');
    
                res.writeHead(statusCode);
    
                res.end(payloadString);
            });
    
        });

};



const handlers = {
    user: function (data, callback) {
        callback(200);
    },
    default: function (data, callback) {
        callback(404);
    }
}

const router = {
    'user': handlers.user
}
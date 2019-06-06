const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const port = 5000

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // returns an object with parsed Url
    const path = parsedUrl.pathname; // accesses path in parsedUrl object
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); // takes out slashes from path
    const queryStringObject = parsedUrl.query; // gives query object
    const method = req.method; // Returns what method was used
    const headers = req.headers; // Returns headers

    const decoder = new StringDecoder('utf-8');

    let buffer = '';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    
    req.on('end', () => {
        buffer += decoder.end();

        const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        const data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        chosenHandler(data, (statusCode, payload) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);

            res.writeHead(statusCode);
            res.end(payloadString);
        });

    });
});

server.listen(port, () => {
    console.log(`*** Listening on port ${port} ***`)
});

const handlers = {
};

handlers.users = (data, callback) => {
    callback(200, {'name': 'users handler'})
}

handlers.notFound = (data, callback) => {
    callback(400);
}



const router = {
    'users': handlers.users
};
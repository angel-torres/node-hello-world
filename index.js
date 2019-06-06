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

        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

    });
});

server.listen(port, () => {
    console.log(`*** Listening on port ${port} ***`)
});

const handlers = {

};



const router = {
    'users': handlers.users
};
const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (req.url === '/') {
        res.statusCode = 200
        res.end('<h1>Hello, World!</h1>')
    } else if (req.url === '/imagen-beautiful') {
        fs.readFile('./beautiful.png', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>500 Internal Server Error</h1>')
            } else {
                res.setHeader('Content-Type', 'image/png');
                res.end(data)
            }
        })

    }
    else {
        res.statusCode = 404
        res.end('<h1>404 Not Found</h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
    console.log(`Server is listening on port ${desiredPort}`)
});

const http = require('node:http')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET':
            switch (url) {
                case '/':
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>Hello, World!</h1>')
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>404 Not Found</h1>')
            }
        case 'POST':
            switch (url) {
                case '/user':
                    let body = ''
                    req.on('data', chunk => {
                        body += chunk.toString()
                    })
                    req.on('end', () => {
                        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
                        return res.end(JSON.stringify(body))
                    })
                    break
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>404 Not Found</h1>')

            }

    }

}


const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
    console.log(`Server is listening on port ${desiredPort}`)
});
const express = require('express')

const app = express()
app.disable('x-powered-by');

const desiredPort = process.env.PORT ?? 3000

app.use(express.json())

// app.use((req, res, next) => {
//     if (req.method != 'POST') return next()
//     if (req.headers['content-type'] != 'application/json') return next()

//     let body = ''
//     req.on('data', chunk => {
//         body += chunk.toString()
//     })
//     req.on('end', () => {
//         const data = JSON.parse(body)
//         req.body = data
//         next()
//     });
// })

app.get('/', (req, res) => {
    res.send('<h1>Hello, World!</h1>')
});

app.post('/user', (req, res) => {
    return res.status(201).json(req.body);
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
});

app.listen(desiredPort, () => {
    console.log(`Server is listening on port ${desiredPort}`)
});
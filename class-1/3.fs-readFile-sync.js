const fs = require('node:fs')

console.log('Leyendo el primer archivo....')
const text = fs.readFileSync('./archivo.txt', 'utf-8')

console.log(text)

console.log('haciendo cositas....')

console.log('Leyendo el segundo archivo....')
const secundText = fs.readFileSync('./archivo2.txt', 'utf-8')

console.log(secundText)

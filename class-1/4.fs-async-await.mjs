import fs from 'node:fs/promises'

console.log('Leyendo el primer archivo....')
const text = await fs.readFile('./archivo.txt', 'utf-8')

console.log(text)

console.log('haciendo cositas....')

console.log('Leyendo el segundo archivo....')
const secundText = await fs.readFile('./archivo2.txt', 'utf-8')

console.log(secundText)

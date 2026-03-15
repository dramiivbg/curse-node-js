import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([text, secundText]) => {
    console.log(text)
    console.log(secundText)
})

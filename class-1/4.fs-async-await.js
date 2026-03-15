const { readFile } = require('node:fs/promises');

// IFE - Inmediatly Invoked Function Expression
(
    async () => {
        console.log('Leyendo el primer archivo....')
        const text = await readFile('./archivo.txt', 'utf-8')

        console.log(text)

        console.log('haciendo cositas....')

        console.log('Leyendo el segundo archivo....')
        const secundText = await readFile('./archivo2.txt', 'utf-8')

        console.log(secundText)
    })()

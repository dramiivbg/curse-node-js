// const fs = require('node:fs');

// fs.readdir('.', (err, files) => {
//     if(err){
//         console.log('Error al leer el archivo: ', err)
//         return;
//     };

//     files.forEach(file => {
//         console.log(file)
//     })
// })

const fs = require('node:fs/promises')

fs.readdir('.')
    .then(files => {
        files.forEach(file => {
            console.log(file)
        })
    }).catch(error => {
        console.log('Error al leer el archivo: ', error)
    })

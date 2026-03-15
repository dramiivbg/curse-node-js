const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls(folder) {
    let files
    try {
        files = await fs.readdir(folder)
    } catch (error) {
        console.error(pc.red('Error al leer el archivo: ', error))
        process.exit(1)
    }

    const filePromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let fileStats
        try {
            fileStats = await fs.stat(filePath)
        } catch (error) {
            console.error(pc.red(`No se pudo leer el archivo ${filePath}`))
            process.exit(1)
        }

        const isDirectory = fileStats.isDirectory()
        const fileType = isDirectory ? 'd' : '-'
        const fileSize = fileStats.size.toString()
        const fileModified = fileStats.mtime.toLocaleString()

        return `${pc.bgMagenta(fileType)} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`
    })

    const filesInfo = await Promise.all(filePromises)
    filesInfo.forEach(file => console.log(file))
}

ls(folder)

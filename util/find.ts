import fs from 'fs'
import {resolve}  from 'path'

function find(path:string){
    return fs.readdirSync(resolve(__dirname,'..',path))
        .filter((i)=>i.endsWith(__filename.endsWith('.ts')?'.ts':'.js'))
}

var events = find('events')
var commands = find('commands')

export {
    events,
    commands
}
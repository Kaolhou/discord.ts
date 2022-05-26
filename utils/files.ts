import path from 'path';
import fs from 'fs'
import { findI } from './types';

const find = function(local:string):findI{
    let x = path.resolve(__dirname,`../${local}`)
    let y= fs.readdirSync(x).filter((i)=>{
        return i.endsWith('.ts')||i.endsWith('.js')
    })
    return {
        'path': x,
        'files': y
    }
}

const commandFiles:findI = find('commands')
const eventFiles:findI = find('events')

export {commandFiles, eventFiles}
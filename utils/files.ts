import path,{resolve,extname} from 'path';
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
export function findArr(path:string, ext:string = ''):string[]{
    if(ext===''){
        return fs.readdirSync(path).map((file)=>resolve(path,file))
    }else{
        return fs.readdirSync(path).filter(file=>{
            return extname(file)===ext
        }).map((file)=>resolve(path,file))
    }
}
const commandFiles:findI = find('commands')
const eventFiles:findI = find('events')
const middleware:findI = find('middleware')


export {commandFiles, eventFiles, middleware}
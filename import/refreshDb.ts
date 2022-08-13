import { prisma } from "../prisma/prisma"
import { findArr } from "../utils/files"
import path from 'path'
// import util from 'util'

export async function refreshDb(){
    //this will refresh db
    const files = findArr(path.resolve(process.env!.PATH_MEMES!)).map((i)=>i.split('\\').slice(-1)[0])
    var data = await prisma.memes.findMany()
    // console.log(util.inspect(files, { maxArrayLength: 10 }))

    files.forEach(async(i)=>{
        
        //cria registro para todos os arquivos presentes
        if(!data.find((o)=>o.name==i)){
            await prisma.memes.create({data:{name: i}})
        }
    })
    //renova registros
    var data = await prisma.memes.findMany()
    data.forEach(async(i)=>{
        //remove todos os registros de arquivos que não existem na pasta memes   
        if(!(files.find((o)=>o==i.name))){
            console.log('\x1b[31m%s\x1b[0m',`${i.name} not found`)
            console.log(`${(await prisma.memes.deleteMany({
                where: { name: i.name }
            })).count} rows affected (delete)`)
        }
    })

    //todo: remove registros repetidos (opcinal e exclusivo em caso de bugs)
    /*let x = await prisma.$queryRaw `SELECT * FROM memes GROUP BY name HAVING COUNT(name) > 1`
    console.log(x)*/
}
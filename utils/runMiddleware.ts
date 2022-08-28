import { middleware } from "./files";
import { middlewareType } from "./types";


export async function runMiddleware(){
    await Promise.all(middleware.files.map(async(file)=>{
        const mid = (await import(middleware.path+'\\'+file)).default as middlewareType
        await mid()
    }))
}
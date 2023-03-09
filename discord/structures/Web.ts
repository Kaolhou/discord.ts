import path from 'path'
import cp,{ChildProcessWithoutNullStreams} from 'child_process'

export default class Web{
    web:ChildProcessWithoutNullStreams|undefined
    constructor(){
        this.web = undefined
    }
    /**
     * Função com responsabilidade de criar um sub processo do serviço web e printar todas as saídas,
     * capturar erros, e fechar o subprocesso quando a aplicação for fechada ou reiniciada
     */
    loadWebService(){
        this.web = cp.spawn(`cd ${path.resolve(__dirname,'..','web')} &&${process.env.NODE_ENV==='production'?'node index.js':'npx ts-node index.ts -verbose'}`,{shell:true})
        this.web.stdout.on('data',(data)=>{
            if(Buffer.isBuffer(data)){
                process.stdout.write(data.toString())
            }
        })
        // web.on('exit',(code)=>{console.error("[express] webserver exited with code:",code);throw new Error('WebServer Error')})
        this.web.on('error',(error)=>{
            console.log(error)
            throw new Error(error.name)
        })
        process.on('SIGINT',()=>{
            this.web!.kill()
        })
        process.on('SIGKILL',()=>{
            this.web!.kill()
        })
    }
}

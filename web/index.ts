import express from 'express'
import http from 'http'
import cookie from 'cookie-parser'
import path from 'path'
import cors from 'cors'

import Login from './routes/login'
import OAuth from './routes/oauth'
import Server from './routes/server'

import { sendCookie } from './middlewares/authentication'
import { redirect } from './middlewares/redirect'

const verbose = process.argv.indexOf('-verbose')!==-1
const app = express()
const port = process.env!.PORT!
const address = process.env!.ADDRESS!
// var privateKey  = fs.readFileSync(path.resolve(__dirname,'credentials','privateKEY.key'), 'utf8');
// var certificate = fs.readFileSync(path.resolve(__dirname,'credentials','certificate.crt'), 'utf8');

// const credentials = {
//     key: privateKey,
//     cert: certificate
// };
// app.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "default-src 'unsafe-inline'");
//     next();
//   });
// app.use(helmet())
app.use(redirect)
app.use(cookie())
app.use(express.json())
app.use(cors({
    origin:process.env.NODE_ENV==='production'?process.env!.ADDRESS!:'*'
}))


app.use(async (...args)=>await sendCookie(...args))

app.use('/scripts',express.static(path.resolve(__dirname,'pages','scripts')))

app.use('/login',new Login(verbose).route())
app.use('/oauth',new OAuth(verbose).route())
app.use('/server',new Server(verbose).route())

app.get('/',(req,res)=>{
    res.send(req.cookies)
})


try {
    // var httpsServer = https.createServer(credentials,app)
    var httpServer = http.createServer(app)
    
    // httpsServer.listen(port,()=>{
    //     console.log(`\x1b[35m%s\x1b[0m`,`[express] https server started at https://${address}:${port}`)
    // })
    httpServer.listen(port,()=>{
        console.log(`\x1b[35m%s\x1b[0m`,`[express] http server started at http://${address}:${port}`)
    })
} catch (error) {
    if(error instanceof Error){
        console.error(error)
    }
}
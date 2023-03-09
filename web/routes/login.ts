import { Request } from "express"
import ControllerRoutes from "../controllers/ControllerRoutes"
import express from "express"
import axios from 'axios'

const router = express.Router()

interface RequestBodyLogin extends Request{
    body:{
        sid:string
        discordCode:string
    }
}

export async function validateToken(token:string) {
    try {
        const response = await axios.get('https://discord.com/api/v10/oauth2/token', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                'client_id': process.env.CLIENT_ID,
                'client_secret': process.env.TOKEN,
                'grant_type': 'authorization_code',
                'code': token,
                'redirect_uri': 'http://localhost:3000'
            }
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

export default class Login extends ControllerRoutes{
    
    public route(){
        router.route('/').get(async (req,res)=>{
            if(!req.cookies['discordCode']||req.cookies['discordCode']=='undefined') return res.redirect(process.env!.OAUTH2!)
            else console.log(req.cookies['discordCode'])
            let a = await this.axios.post(`${req.protocol}://${process.env!.ADDRESS!}:3000/login`,{"user":"Kaolhou","password":"password","sid":req.cookies['sid']},{
                validateStatus: (status)=>true,
                httpsAgent: this.agent
            })
            console.log(a.data)

            

            res.sendFile(
                this.path.resolve(__dirname,'..','pages/login.html')
            )
        })
        .post(async(req:RequestBodyLogin,res)=>{
            function checkRequestBody(body:Object):body is RequestBodyLogin{
                return 'sid' in body && 'discordCode' in body && body.discordCode !== 'undefined'
            }
            if(!checkRequestBody(req.body)) return res.status(400).send('invalid request body')
            const sid = req.body['sid']
            const code = req.body['discordCode']
            if(!sid)return res.send('no sid')
            


            // if(!userId) res.redirect(process.env!.OAUTH2!)

            // let a = await this.prisma.user.findFirst({
            //     where:{
            //         userId:
            //     }
            // })
            // if(a){
            //     let b = await this.prisma.session.update({
            //         where:{
            //             id:sid
            //         },
            //         data:{
            //             isLogged:true,
            //             userId:a.id,
            //         }
            //     })
                
            // }
            // console.log(a)
        
            res.send('okok')
        })
        return router
    }
}

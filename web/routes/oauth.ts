import ControllerRoutes from "../controllers/ControllerRoutes";
import express from "express"
import { validateToken } from "./login";
import { AccessTokenResponse } from "../types";

const router = express.Router()


export default class OAuth extends ControllerRoutes{
    public route(){
        router.get('/',async(req,res)=>{
            if(!req.query.code) return res.redirect(process.env!.OAUTH2!)
            
            const formData = new URLSearchParams({
                'client_id': process.env!.CLIENT_ID!,
                'client_secret': process.env!.CLIENT_SECRET!,
                'grant_type': 'authorization_code',
                'code': req.query.code.toString(),
                'redirect_uri': "http://localhost:3000/oauth",
                'scope':'identify'
            })
            const response = await this.axios.post<AccessTokenResponse>('https://discordapp.com/api/oauth2/token',formData.toString(),{
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                validateStatus:()=>true
            })
            res.cookie('discordCode',req.query.code,{
                sameSite:'strict',
                expires:(()=>{let date = new Date();date.setSeconds(date.getSeconds()+response.data.expires_in);return date})()
            })
            return res.send(response.data)
            // res.redirect('http://localhost:3000/')
        })

        

        return router
    }
}
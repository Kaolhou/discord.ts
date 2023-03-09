import ControllerRoutes from "../controllers/ControllerRoutes";
import { isLogged } from "../middlewares/authentication";
import express from "express"

const router = express.Router()


export default class Server extends ControllerRoutes{
    
    public route(){
        router.route('/').get((...args)=>isLogged(...args,this.verbose),(req,res)=>{
            res.send('servidor')
        })

        return router
    }
}
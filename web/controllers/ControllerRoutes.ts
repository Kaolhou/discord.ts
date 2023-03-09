import { PrismaClient } from "@prisma/client"
import axios from "axios"
import https from 'https'
import path from 'path'
const prisma = new PrismaClient()
const agent = new https.Agent({rejectUnauthorized: false});

export default class ControllerRoutes{
    axios;prisma;agent;path;verbose
    constructor(verbose:boolean){
        this.verbose = verbose
        this.axios = axios
        this.prisma = prisma
        this.agent = agent
        this.path = path
    }
}
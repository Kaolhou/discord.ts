import { NextFunction,Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v1 } from 'uuid';
import { Cookie, CustomHeaders } from "../types";

const prisma = new PrismaClient()
type CookieOrNull<T> = T extends string ? Cookie : T extends undefined ? null : never;
export function parseCookie<T>(cookieStr?: T):CookieOrNull<T> {
    if (!cookieStr||typeof cookieStr!='string') {
        return null as CookieOrNull<T>;
    }
  
    const cookie: Cookie = {
        name: '',
        value: '',
    };
  
    const parts = cookieStr.split(';');
  
    parts.forEach(part => {
        const [key, value] = part.trim().split('=');
    
        switch (key.toLowerCase()) {
            case 'domain':
                cookie.domain = value;
            break;
            case 'path':
                cookie.path = value;
            break;
            case 'expires':
                cookie.expires = new Date(value);
            break;
            case 'max-age':
                cookie.maxAge = parseInt(value, 10);
            break;
            case 'secure':
                cookie.secure = true;
            break;
            case 'httponly':
                cookie.httpOnly = true;
            break;
            case 'samesite':
                cookie.sameSite = value.toLowerCase() as 'strict' | 'lax' | 'none';
            break;
            default:
                cookie.name = key;
                cookie.value = value;
            break;
        }
    });

    if (!cookie.name || !cookie.value) {
        return null as CookieOrNull<T>;
    }
    
    return cookie as CookieOrNull<T>;
}

export async function generateSidCookie<T extends 'string'|'parsed'>(type:T):Promise<T extends 'string'?string:Cookie>{

    async function checkedCookie():Promise<string>{
        var sid = v1({
            node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
            clockseq: 0x1234,
            msecs: new Date().getTime(),
            nsecs: 5678,
        })
    
        if(await prisma.session.findUnique({ where: { id: sid } })){
            return await checkedCookie()
        }else{
            return sid
        }
    }
    var sid = await checkedCookie()
    const cookie = `sid=${sid}; secure`

    await prisma.session.create({
        data:{
            id: sid
        }
    })

    if(type==='parsed'){
        return parseCookie(cookie) as T extends 'string' ? string : Cookie;
    }

    return cookie as T extends 'string' ? string : Cookie;
}
export async function sendCookie(req:Request,res:Response,next:NextFunction){
    if(!req.cookies['sid']){
        const cookie = await generateSidCookie('parsed')
        res.cookie(cookie.name,cookie.value)
        // console.log(req.cookies)
    }
    next()
}

export async function isLogged(req:Request,res:Response<CustomHeaders>,next:NextFunction,verbose:boolean){
    const session = await prisma.session.findUnique({
        where:{
            id:req.cookies['sid']
        }
    })

    if(session&&session.isLogged){
        return next()
    }
    
    res.redirect('/login')
}
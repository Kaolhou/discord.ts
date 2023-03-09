import { NextFunction, Request,Response } from "express";

export function redirect(req:Request, res:Response, next:NextFunction) {
    res.on('finish', () => {
      if (res.statusCode === 302) {
        console.log('Usuário foi redirecionado para:', res.getHeader('Location'));
      }
    });
    next();
}
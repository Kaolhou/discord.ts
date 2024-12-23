import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import {IncomingMessage} from 'http'

const KEYSECRET = process.env.SECRET!

function handleProtocol(protocol:string, request:IncomingMessage) {
    // Extrair o token JWT da URL (ou headers, depende da implementação)
    const token = new URL(request.url!, `http://${request.headers.host}`).searchParams.get('token');
  
    if (!token) {
        console.log('Token ausente');
        return false; 
    }
    try {
        const decoded = jwt.verify(token, KEYSECRET);
        console.log('JWT válido, usuário autenticado:', decoded);
        return protocol; 
    } catch (error) {
        if(error instanceof JsonWebTokenError)
            console.log('Token inválido:', error?.message!);
        return false;
    }
}
  
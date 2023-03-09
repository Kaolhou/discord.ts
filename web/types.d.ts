import { IncomingHttpHeaders } from 'http';
import {Request,Response} from 'express'

export interface Cookie {
    name: string;
    value: string;
    domain?: string;
    path?: string;
    expires?: Date;
    maxAge?: number;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}
export interface CustomHeaders {
    [key: string]: string | string[] | undefined;
}

export interface CustomRequest<T> extends Request{
    body:T,
}

export interface AccessTokenResponse{
    access_token:string
    token_type: string,
    expires_in: number,
    refresh_token: string,
    scope: string
}

declare module 'http' {
    interface IncomingHttpHeaders {
        "sid"?: string
    }
}
export {}
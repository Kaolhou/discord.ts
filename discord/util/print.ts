import { Main } from "..";

export enum Colors{
    FgBlack = "\x1b[30m",
    FgRed = "\x1b[31m",
    FgGreen = "\x1b[32m",
    FgYellow = "\x1b[33m",
    FgBlue = "\x1b[34m",
    FgMagenta = "\x1b[35m",
    FgCyan = "\x1b[36m",
    FgWhite = "\x1b[37m",
    FgGray = "\x1b[90m",
}
export enum BackG{
    BgBlack = "\x1b[40m",
    BgRed = "\x1b[41m",
    BgGreen = "\x1b[42m",
    BgYellow = "\x1b[43m",
    BgBlue = "\x1b[44m",
    BgMagenta = "\x1b[45m",
    BgCyan = "\x1b[46m",
    BgWhite = "\x1b[47m",
    BgGray = "\x1b[100m"
}
interface color{
    color?: Colors
    background?: BackG
}

export default function print(message:string,client:Main,{color,background}:color){
    let reset = "\x1b[0m"
    if(message.startsWith('\x1b')){
        client.verbose ? console.log(message) : null
    }else{
        client.verbose ? console.log(background?background:''+color?color:reset+'%s'+reset,message) : null
    }
}

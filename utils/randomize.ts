// import { Memes } from "@prisma/client";

export function randomize<T>(items:T[]):T{
    return items[Math.floor(Math.random()*items.length)];
}

// export function randomizeMemes(items:Memes[]):Memes{
//     return items[Math.floor(Math.random()*items.length)];
// }

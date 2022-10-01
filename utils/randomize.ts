
/**
 * @description recives an array of itens and returns a single random item of this array
 * @param items
 * @returns random
 */
export function randomize<T>(items:T[]):T{
    return items[Math.floor(Math.random()*items.length)];
}
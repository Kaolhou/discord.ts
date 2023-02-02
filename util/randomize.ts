
export default function randomize<T>(arr:T[]):T{
    return arr.sort( ()=> .5- Math.random() )[0]
}
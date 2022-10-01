
export function shuffleArr<T>(arr:T[]):T[]{
    return arr.sort(()=>Math.random()-0.5)
}
    // for(let i = arr.length-1; i >= 0; i--){
    //     let rand = Math.floor(Math.random() * (i + 1));
    
    //     var temp = arr[i];
    //     arr[i] = arr[rand];
    //     arr[rand] = temp;
    // }
    // return arr
export default function(arr:any[]){
    if(arr.length===0)throw Error('The array must have at least one item')
    const min = Math.ceil(0);
    const max = Math.floor(arr.length);
    return arr[Math.floor(Math.random() * (max - min)) + min]
}
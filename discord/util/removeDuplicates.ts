export default function removeDuplicates<T>(arr:T[]):T[]{
    return arr.filter((item, 
        index) => arr.indexOf(item) === index);
}
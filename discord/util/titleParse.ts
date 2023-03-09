
export default function titleParse(title:string, length=40){
    return `${title.length>=length?title.substring(0,length)+'...':title}`
}

export function isSameDay(date1:Date,date2:Date){
    // console.log((date1.getDate()===date2.getDate())&&(date1.getMonth()===date2.getMonth())&&(date1.getFullYear()===date2.getFullYear()))
    return (date1.getDate()===date2.getDate())&&(date1.getMonth()===date2.getMonth())&&(date1.getFullYear()===date2.getFullYear())
}

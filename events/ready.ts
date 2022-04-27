import { EventI } from "../utils/types";

const ready:EventI = {
    eventName:'ready',
    once:true,
    run(){
        console.log('bot started')
    }
}
export default ready
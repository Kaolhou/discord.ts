import { TypedEvent } from "../utils/types";


export default TypedEvent({
    eventName:'error',
    once:true,
    run: async(client, error)=>{
        console.error(error)
    }
})
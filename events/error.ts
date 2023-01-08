import { EventI } from "../util/types";


const error:EventI<'error'> = {
    eventName:'error',
    async exe(client, error) {
        //todo enviar erro para banco de dados
        console.error(error)

        await client.prisma.logs.create({
            data: {
                isError:true,
                error: {
                    message: error.message,
                    stack: error.stack,
                    name: error.name
                }
            }
        })
    },
    once:false
}
export default error
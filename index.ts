import Bot from "./classes/bot"
import { config } from 'dotenv'
config()

const x = new Bot(process.env.TOKEN!)
x.start()
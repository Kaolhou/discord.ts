declare global{
    namespace NodeJS{
        interface ProcessEnv{
            TOKEN?:string
            DATABASE_URL?:string
            CLIENT_ID?:string
            ADMS?:string
            MEME_ENDPOINT:string
            NODE_ENV:'production'|undefined
            OPEN_AI_KEY:string
            PORT:string
            ADDRESS:string
            OAUTH2:string
            CLIENT_SECRET:string
        }
    }
}
export {}
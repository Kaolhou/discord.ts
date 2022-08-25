declare global{
    namespace NodeJS{
        interface ProcessEnv{
            CLIENT_ID: string;
            TOKEN: string;
            GUILD_ID: string;
            PATH_MEMES: string;
            /*CHANNEL_MEMES: string;*/
        }
    }
}
export {}
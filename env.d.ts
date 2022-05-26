declare global{
    namespace NodeJS{
        interface ProcessEnv{
            CLIENT_ID: string;
            TOKEN: string;
            GUILD_ID: string;
        }
    }
}
export {}
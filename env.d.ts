declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_KEY?: string;
      APP_ID?: string;
      PUBLIC_KEY?: string;
    }
  }
}

export {};

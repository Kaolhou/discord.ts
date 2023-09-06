declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      DATABASE_URL: string;
      CLIENT_SECRET: string;
      MEMES_PATH: string;
      APPLICATION_ID: string;
    }
  }
}

export {};

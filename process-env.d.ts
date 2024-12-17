declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: number;
      DATABASE_URL: string; 
      JWT_SECRET : string
    }
  }
}
export type {};

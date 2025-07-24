interface AppConfig {
  aiFunctionEndpoint?: string;
}

export const appConfig: AppConfig = {
  aiFunctionEndpoint: process.env.NEXT_PUBLIC_AI_FUNCTION_ENDPOINT,
};

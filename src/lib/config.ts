interface AppConfig {
  aiFunctionEndpoint?: string;
}

export const appConfig: AppConfig = {
  aiFunctionEndpoint: process.env.AI_FUNCTION_ENDPOINT,
};

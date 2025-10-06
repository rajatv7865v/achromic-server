import { registerAs } from '@nestjs/config';

export const APP_CONFIG = registerAs('APP', () => {
  return {
    APP_NAME: process.env['APP_NAME'],
    APP_URL: process.env['APP_URL'],
    APP_EMAIL: {
      SUPPORT: process.env['SUPPORT_EMAIL'],
    },
    APP_PORT: process.env['APP_PORT'] || 3000,
    isProd: process.env['IS_PROD'] === 'true',
  };
});

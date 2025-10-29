import * as dotenv from 'dotenv';

export const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'dev':
      dotenv.config({
        override: true,
        path: `env-files/.env.dev`
      });
      break;
    case 'test':
      dotenv.config({
        override: true,
        path: `env-files/.env.test`
      });
      break;
    case 'prod':
      dotenv.config({
        override: true,
        path: `env-files/.env.prod`
      });
      break;
  }
};

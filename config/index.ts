//
import { config as envConfig } from 'dotenv';
envConfig();

const isEnvProduction = 'production' === process.env.NODE_ENV;
const isEnvTest = 'testing' === process.env.NODE_ENV;

const config = {
  APP_ID: process.env.APP_ID,
  DB: isEnvTest ? process.env.DATABASE_URL__TEST : process.env.DATABASE_URL,
  ENV: process.env.NODE_ENV,
  PORT: parseInt(
    isEnvTest
      ? process.env.PORT_TEST
      : isEnvProduction
      ? process.env.PORT_PRODUCTION
      : process.env.PORT,
    10,
  ),
  SALT_ROUNDS_BCRYPT: parseInt(process.env.SALT_ROUNDS_BCRYPT, 10) || 8,
  DOCS_ENDPOINT: process.env.DOCS_ENDPOINT,
  //
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_TRANSPORT: process.env.EMAIL_TRANSPORT,
  // 
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  // 
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE,
  JWT_SECRET_TOKEN_REFRESH: process.env.JWT_SECRET_TOKEN_REFRESH,
  JWT_TOKEN_REFRESH_EXPIRE: process.env.JWT_TOKEN_REFRESH_EXPIRE,

};

export default config;

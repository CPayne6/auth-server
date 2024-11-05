import fs from "fs";
import * as dotenv from 'dotenv'

interface Config {
  PRIVATE_KEY: string;
  PUBLIC_KEY: string;
  NODE_ENV: string;
  PORT: number;
  API_VERSION: string;
  POSTGRES_URI: string;
  REFRESH_SECRET: string;
  AUTH_DOMAIN: string;
  JWT_AUDIENCE: string;
  JWT_ISSUER: string;
  IS_DEVELOPMENT: boolean;
  GOOGLE_AUTH_URL: string;
  GOOGLE_TOKEN_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  MAIL_PASSWORD: string;
  MAIL_USER: string;
}

interface ConfigParam {
  name: keyof Config;
  validate?: (v: unknown) => boolean;
  errorMessage?: string;
  formatValue?: (v: string) => string | number;
}

const validateString: ConfigParam["validate"] = (v): v is string =>
  typeof v === "string";

const validatePort: ConfigParam["validate"] = (v): v is string =>
  Number(v as string) !== 0 && !Number.isNaN(Number(v as string));

const validateEnvironment: ConfigParam["validate"] = (v): v is string =>
  validateString(v) && (v === "development" || v === "production");

const printAndExit = (message: string) => {
  console.error(`ERROR: ${message}`);
  process.exit(1);
};

const env = process.env;
const isDevelopment = env.NODE_ENV === "development";

// Extract the public key and private key in development
if (isDevelopment) {
  dotenv.config();
  env.PRIVATE_KEY = fs
    .readFileSync(`${__dirname}/../certs/private-key.pem`)
    .toString();
  env.PUBLIC_KEY = fs.readFileSync(`${__dirname}/../certs/public-key.pem`).toString();
}

// Check for environment variables

const configParams: ConfigParam[] = [
  {
    validate: validateString,
    name: "PRIVATE_KEY",
  },
  {
    validate: validatePort,
    name: "PORT",
    formatValue: (v) => Number(v),
  },
  {
    validate: validateString,
    name: "PUBLIC_KEY",
  },
  {
    validate: validateString,
    name: "POSTGRES_URI",
  },
  {
    validate: validateString,
    name: "REFRESH_SECRET",
  },
  {
    validate: validateString,
    name: "AUTH_DOMAIN",
  },
  {
    validate: validateString,
    name: "JWT_AUDIENCE",
  },
  {
    validate: validateString,
    name: "JWT_ISSUER",
  },
  {
    validate: validateEnvironment,
    name: "NODE_ENV",
  },
  {
    validate: validateString,
    name: "GOOGLE_CLIENT_ID",
  },
  {
    validate: validateString,
    name: "GOOGLE_CLIENT_SECRET",
  },
  {
    name: "MAIL_PASSWORD",
    validate: validateString,
  },
  {
    name: "MAIL_USER",
    validate: validateString,
  },
];

export const config: Config = {
  ...configParams.reduce<Config>((prev, curr) => {
    const value = env[curr.name];
    if (!curr.validate || curr.validate(value)) {
      return {
        ...prev,
        [curr.name]: curr.formatValue
          ? curr.formatValue(value as string)
          : value,
      };
    }
    printAndExit(
      curr.errorMessage
        ? curr.errorMessage
        : `ERROR: Unable to find ${curr.name}\n\nCheck .env file`
    );
    return prev;
  }, {} as Config),
  IS_DEVELOPMENT: isDevelopment,
};
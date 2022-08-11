import * as dotenv from "dotenv";
import * as _ from "lodash";
import * as path from "path";

dotenv.config({path: ".env"});

export const ENVIRONMENT        = _.defaultTo(process.env.APP_ENV, "development");
export const IS_PRODUCTION      = ENVIRONMENT === "production";
export const APP_PORT           = _.defaultTo(process.env.PORT, 3000);

export const LOG_DIRECTORY      = _.defaultTo(process.env.LOG_DIRECTORY, path.resolve('logs'));

export const JWT_SECRET         = _.defaultTo(process.env.JWT_SECRET, "jwtsecret");
export const SESSION_SECRET     = _.defaultTo(process.env.SESSION_SECRET, "secret");

export const MONGODB_URI        = _.defaultTo(process.env.MONGODB_URI, "");

export const STRIPE_PUBLIC_KEY  = _.defaultTo(process.env.STRIPE_PUBLIC_KEY, "");
export const STRIPE_PRIVATE_KEY = _.defaultTo(process.env.STRIPE_PRIVATE_KEY, "");

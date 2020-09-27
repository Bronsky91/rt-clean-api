export const paramMissingError =
  "One or more of the required parameters was missing.";
export const JWT_SECRET = process.env.JWT_SECRET as string;

export const MONGO_URL = process.env.MONGO_URL || "";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL || "";

export const MY_SQL_HOST = process.env.MY_SQL_HOST || "";
export const MY_SQL_USER = process.env.MY_SQL_USER || "";
export const MY_SQL_PASSWORD = process.env.MY_SQL_PASSWORD || "";

export const CLIENT_HOME_PAGE_URL = "http://localhost:3000/upload";
export const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000/";

export const REDTAIL_API_KEY = process.env.REDTAIL_API_KEY || "";
export const REDTAIL_API_URL = "http://api2.redtailtechnology.com/crm/v1/rest";

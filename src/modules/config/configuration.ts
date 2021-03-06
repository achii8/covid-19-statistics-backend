export class Configuration {
  database = {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    dbName: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    entityPrefix: process.env.DATABASE_ENTITY_PREFIX || '',
  };
  config = {
    JWT_SECRET: process.env.JWT_SECRET,
    PASSWORD_SALT: process.env.PASSWORD_SALT,
  };
  email = {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_TEMPLATE_ID: process.env.SENDGRID_TEMPLATE_ID,
  };
  api = {
    COUNTRIES_LIST_API: process.env.COUNTRIES_LIST_API,
    COVID_STATISTICS_API: process.env.COVID_STATISTICS_API,
    COVID_STATISTICS_API_KEY_HEADER:
      process.env.COVID_STATISTICS_API_KEY_HEADER,
    COVID_STATISTICS_API_HOST_HEADER:
      process.env.COVID_STATISTICS_API_HOST_HEADER,
  };
}

export const configuration = () => {
  return {
    env: new Configuration(),
  };
};

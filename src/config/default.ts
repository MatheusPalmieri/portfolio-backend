const db = `${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

export default {
  port: process.env.PORT,
  dbUri: db,
  env: process.env.TYPE_OF_ENVIRONMENT,
  NODE_ENV: process.env.TYPE_OF_ENVIRONMENT,
};

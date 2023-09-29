export default {
  port: 3000,
  dbUri: `${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
  env: process.env.TYPE_OF_ENVIRONMENT,
};

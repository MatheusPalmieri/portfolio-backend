const urlDB = process.env.MONGO_DB_URL;
const nameDB = process.env.MONGO_DB_NAME;
const db = `${urlDB}/${nameDB}?retryWrites=true&w=majority`;

export default {
  port: process.env.PORT,
  dbUri: db,
};

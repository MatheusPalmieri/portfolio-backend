import mongoose from 'mongoose';
import config from 'config';
import Logger from './logger';

async function connect() {
  const dbUri = config.get('dbUri') as string;

  try {
    await mongoose.connect(dbUri);
    Logger.info('Connected to the Database!');
  } catch (error) {
    Logger.error('Failed to connect to Database!', error);
    process.exit(1);
  }
}

export default connect;

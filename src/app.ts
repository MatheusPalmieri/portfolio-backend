// ENV variables
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express from 'express';
import config from 'config';
import cors from 'cors';

const app = express();

// JSON middleware
app.use(express.json());

// Database
import db from '../config/db';

// Router
const routes = require('./routes/index');

// Logger
import Logger from '../config/logger';

// Morgan middleware
import morganMiddleware from './middleware/morganMiddleware';

app.use(morganMiddleware);

// enable cors
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Api routes
app.use('/api', routes);

// App port
const port = config.get('port') as number;

app.listen(port, async () => {
  await db();

  Logger.info(`Server running on port ${port}`);
});

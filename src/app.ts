// ENV variables
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express from 'express';
import config from 'config';

const app = express();

// JSON middleware
app.use(express.json());

// Database
import db from '../config/db';

// Router
const routes = require('./routes/routes');

// Logger
import Logger from '../config/logger';

// Morgan middleware
import morganMiddleware from './middleware/morganMiddleware';

app.use(morganMiddleware);

// api routes
app.use('/api', routes);

// App port
const port = config.get('port') as number;

app.listen(port, async () => {
  await db();

  Logger.info(`Server running on port ${port}`);
});

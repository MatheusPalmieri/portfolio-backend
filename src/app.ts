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
import router from './router';

// Logger
import Logger from '../config/logger';

// Morgan middleware
import morganMiddleware from './middleware/morganMiddleware';

app.use(morganMiddleware);

app.use('/api/', router);

// App port
const port = config.get('port') as number;

app.listen(port, async () => {
  await db();

  Logger.info(`Server running on port ${port}`);
});

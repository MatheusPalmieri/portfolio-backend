import { CronJob } from 'cron';
import Logger from '../../config/logger';

const job = new CronJob(
  '0 * * * * *',
  function () {
    Logger.info('Server is running :)');
  },
  null,
  false,
  'America/Los_Angeles',
);

export default job;

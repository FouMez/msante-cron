const cron = require('node-cron');
require('./db');
const CleanConsultations = require('./functions/cleanConsultations');
const UpdateAgenda = require('./functions/agendaConfig');

const EVERY_SUNDAY_CRON_AT_5 = '* 5  * * Sunday';
const EVERY_SUNDAY_CRON_AT_11 = '* 11  * * Sunday';

cron.schedule(EVERY_SUNDAY_CRON_AT_5, async () => {
  console.log('running a task every sunday at 05am ');
  await UpdateAgenda();
});

cron.schedule(EVERY_SUNDAY_CRON_AT_11, async () => {
  console.log('running a task every sunday at 11am ');
  await CleanConsultations();
});

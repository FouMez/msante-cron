const { DateTime } = require('luxon');
const Consultation = require('../models/consultations');
const Doctor = require('../models/doctor');

const configureAgenda = (agendaConfig, userId) => {
  let dt = DateTime.now().setLocale('en');

  let i = 0;
  while (i < 14) {
    const weekday = dt.weekdayLong.toLowerCase();
    if (agendaConfig[weekday].value) {
      // prepare startDate & endDate, send it to create function
      const { year, month, day } = dt;
      const { timeRange, unitDuration } = agendaConfig[weekday];

      const startTime = timeRange[0].split(':');
      const startDate = DateTime.fromObject({
        year, month, day, hour: startTime[0], minute: startTime[1],
      });

      const endTime = timeRange[1].split(':');
      const endDate = DateTime.fromObject({
        year, month, day, hour: endTime[0], minute: endTime[1],
      });

      // eslint-disable-next-line no-use-before-define
      createConsultationsFromInterval(startDate, endDate, unitDuration, userId);
    }

    i++;
    dt = dt.plus({ days: 1 });
  }
};

const createConsultationsFromInterval = async (startDate, endDate, unitDuration, userId) => {
  const diff = endDate.diff(startDate, 'minutes').values.minutes;
  const numberOfEvents = diff / unitDuration;
  const consultations = [];
  for (let i = 0; i < Math.floor(numberOfEvents); i++) {
    const newConsultation = new Consultation({
      doctor: userId,
      date: startDate.plus({ minutes: unitDuration * i }),
    });
    consultations.push(newConsultation);
  }
  try {
    await Consultation.insertMany(consultations, { ordered: false });
  } catch (err) {
    console.log('duplicate key error');
  }
};

const UpdateAgenda = async () => {
  try {
    const doctors = await Doctor.find().select('agendaConfig');
    doctors.forEach(async (doctor) => {
      await configureAgenda(doctor.agendaConfig, doctor._id);
    });
  } catch (error) {
    console.log('Failed on update agenda', error);
  }
};

module.exports = UpdateAgenda;

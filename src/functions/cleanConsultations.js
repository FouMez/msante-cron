const Consultation = require('../models/consultations');
const Doctor = require('../models/doctor.js');

const CleanConsultations = async () => {
  try {
    const doctors = await Doctor.find().select('_id');
    doctors.forEach(async (doctor) => {
      await Consultation.deleteMany({
        doctor: doctor._id,
        date: { $lte: new Date() },
        patient: null,
      });
    });
  } catch (error) {
    console.log('Error while cleaning consultations', error);
  }
};

module.exports = CleanConsultations;

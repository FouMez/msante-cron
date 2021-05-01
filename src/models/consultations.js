const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      ref: 'Doctor',
      index: true,
      required: [true, 'This field is required.'],
    },
    patient: {
      type: String,
      ref: 'Patient',
      index: true,
    },
    date: {
      type: Date,
      required: [true, 'This field is required.'],
    },
    setupIntent: { type: mongoose.Schema.Types.Mixed },
    cPurposes: [{ type: mongoose.Schema.Types.Mixed }],
    price: { type: mongoose.Schema.Types.Mixed },
    patientOn: { type: Boolean, default: false },
    doctorOn: { type: Boolean, default: false },
    started: { type: Date, default: null },
    ended: { type: Date, default: null },
    paymentIntent: { type: String, default: null },
    paymentError: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true },
);

const Consultation = mongoose.model('Consultation', ConsultationSchema);
ConsultationSchema.index({ doctor: 1, date: 1 }, { unique: true });
Consultation.createIndexes();
module.exports = Consultation;

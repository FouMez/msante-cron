const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Should be a valid email address.',
  }),
];

const DoctorSchema = new mongoose.Schema(
  {
    _id: { type: String },
    email: {
      type: String,
      required: [true, 'This field is required.'],
      validate: emailValidator,
    },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    stripeAccount: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    subscription: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    pricing: {
      type: Number,
      default: null,
    },
    firstName: {
      type: String,
      required: [true, 'This field is required.'],
    },
    lastName: {
      type: String,
      required: [true, 'This field is required.'],
    },
    speciality: {
      type: String,
    },
    address: { type: String },
    phoneNumber: {
      type: String,
    },
    studiesHistory: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    biography: { type: String },
    socialMedia: { type: mongoose.Schema.Types.Mixed },
    spokenLanguages: [{ type: String }],
    profileConfigComplete: { type: Boolean, default: false },
    agendaConfig: { type: mongoose.Schema.Types.Mixed },
    customerId: String,
  },
  { timestamps: true },
);

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;

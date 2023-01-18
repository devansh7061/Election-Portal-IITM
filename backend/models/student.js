const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  rollNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  hostel: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  hasVoted: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);

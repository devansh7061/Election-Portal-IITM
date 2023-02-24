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
  currentHostel: {
    type: String,
    required: true,
  },
  virtualHostel: {
    type: String,
    required: true,
  },
  program: {
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
  residencyType: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Student', studentSchema);

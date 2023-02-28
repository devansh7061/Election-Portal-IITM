const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Device", deviceSchema);
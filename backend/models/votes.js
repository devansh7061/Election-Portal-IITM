const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voteSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    votes: [String]
})

module.exports = mongoose.model('Votes', voteSchema);
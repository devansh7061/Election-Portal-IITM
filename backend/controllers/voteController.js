const Votes = require("../models/votes");

exports.vote = async (req, res) => {
    console.log(req.body);
    try {
        const vote = new Votes(req.body);
        await vote.save();
        res.status(200).json(vote);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}


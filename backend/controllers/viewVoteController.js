const Votes = require("../models/votes");


exports.viewVote = async (req, res) => {
  console.log(req.body);
  try {
    const vote = await Votes.find();
    console.log(vote)
    res.status(200).json(vote);
  } catch (error) {
    res.status(404).json({ message: error.message });
      console.error(error);
  }
};
const express = require("express");
const viewVoteController = require("../controllers/viewVoteController");
const router = express.Router();

router.get("/viewVotes", viewVoteController.viewVote);

module.exports = router;
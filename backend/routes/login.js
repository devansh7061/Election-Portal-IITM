const express = require("express");
const router = express.Router();

const users = [
  {
    email: "admin123@gmail.com",
    password: "anirudhlovesblockchain",
  },
];

router.post("/login", function (req, res) {
  let result = users.find((user) => user.email == req.body.email);
  if (result) {
    if (result.password == req.body.password) {
      res.status(200).send({
        message: "Successful Login!",
      });
    } else {
      res.status(200).send({
        message: "Password incorrect!!",
      });
    }
  } else {
    res.status(200).send({
      message: "User not found!!",
    });
  }
});
module.exports = router;

const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const csv = require("fast-csv");
const Student = require("../models/student");

exports.create = async (req, res) => {
  console.log(req.file);
  const totalRecords = [];
  try {
    console.log(
      path.join(__dirname, "../", "/public/csv/" + req.file.filename)
    );
    fs.createReadStream(
      path.join(__dirname, "../", "/public/csv/" + req.file.filename)
    )
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", async (row) => {
        let password = row.password
        row.password = await bcrypt.hash(password, 12)
        try {
            const student = await Student.insertMany(row);
        } catch (error) {
            res.status(400).json(err);
        }
        totalRecords.push(row);
      })
      .on("end", async (rowCount) => {
          res.status(200).json(rowCount);
      })
  } catch (error) {
    res.status(400).json(error);
  }
};

const fs = require("fs");
const bcrypt = require("bcryptjs");
const path = require("path");
const csv = require("fast-csv");
const Student = require("../models/student");

exports.create = async (req, res) => {
  console.log(req.file);
  let totalRecords = []
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
        row.password = await bcrypt.hash(password.trim(), 6)
        try {
            const student = new Student({
              rollNo: row.rollNo.trim(),
              password: row.password.trim(),
              department: row.department.trim(),
              virtualHostel: row.virtualHostel.trim(),
              currentHostel: row.currentHostel.trim(),
              course: row.course.trim(),
              program: row.program.trim(),
              hasVoted: row.hasVoted.trim(),
              residencyType: row.residencyType.trim(),
            });

            await student.save();

        } catch (error) {
          console.log(error, row);
          res.status(400).json(error);
        }
      })
      .on("end", async (rowCount) => {
          res.status(200).json(rowCount);
      })
  } catch (error) {
    res.status(400).json(error);
  }
};

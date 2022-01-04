var express = require("express");
const { body, validationResult } = require("express-validator");
var router = express.Router();
const { randomBytes } = require("crypto");

var employeeData = require("../data/employeeData");

router.get("/", function (req, res, next) {
  res.send(employeeData);
});

router.get("/getone", function (req, res, next) {
    let {empid} = req.body;
    if(!employeeData[empid]){
        res.status(404).send('Employee not found')
    }
    res.send(employeeData[empid]);
});

router.post(
  "/add",
  [
    body("name")
      .isAlpha()
      .withMessage("Name only can have alphabates")
      .isLength({ min: 3, max: 50 })
      .withMessage("Name is not valid"),
  ],
  function (req, res, next) {
    // res.render('index', { title: 'Express' });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const empid = randomBytes(4).toString('hex');
    const { name } = req.body;

    employeeData[empid] = {
        empid,
        name
      }
    //   res.send(data[id]);
    res.send(employeeData);
  }
);

module.exports = router;

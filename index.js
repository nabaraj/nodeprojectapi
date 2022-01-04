const express = require("express");
var cors = require('cors')

const app = express();

var projectsRouter = require('./routes/projects');
var employeeRouter = require('./routes/employee');
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/projects", projectsRouter);
app.use("/employee", employeeRouter);



app.listen(4000, () => {
  console.log("running in 4000");
});

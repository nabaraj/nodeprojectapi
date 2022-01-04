var express = require('express');
const { body, validationResult } = require('express-validator');
var router = express.Router();
const { randomBytes } = require('crypto');
var data = require('../data/projectData');


router.get('/', function(req, res, next) {
  res.send(data);
});

router.get('/getone', function(req, res, next){
  let projectId = req.body.id;
  if(!data[projectId]){
    res.status(400).send('project not found')
  }else{
    res.status(200).send(data[projectId]);
  }
})

router.post('/add', 
[
  body('name')
    .isLength({min:10, max:80})
    .withMessage('Name is not valid'),
  body('description')
      .trim()
      .isLength({ min: 50, max: 300 })
      .withMessage('Description is not valid'),
  body('startdate')
      .isDate()
      .withMessage('Date is not valid'),
  body('employees')
      .optional()
      .isArray()
      .withMessage('Not valid type')

],
function(req, res, next) {
  // res.render('index', { title: 'Express' });

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


  const id = randomBytes(4).toString('hex');
  // console.log("req body ", req);
//   console.log(req.body);
  const { name, description,startdate, employees } = req.body;
//   console.log('$$$$$$###### loading ');
  data[id] = {
    id,
    name, 
    description,
    startdate,
    employees
  }
  res.send(data[id]);
});

router.put('/update', 
[
  body('name')
    .optional()
    .isLength({min:10, max:80})
    .withMessage('Name is not valid'),
  body('description')
      .optional()
      .trim()
      .isLength({ min: 50, max: 300 })
      .withMessage('Description is not valid'),
  body('startdate')
      .optional()
      .isDate()
      .withMessage('Date is not valid'),
  
],
function(req, res, next) {
  // res.render('index', { title: 'Express' });

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


  
  // console.log("req body ", req);
//   console.log(req.body);
  const {id, employees } = req.body;

//   console.log('$$$$$$###### loading ');
  // data[id] = {
  //   id,
  //   name, 
  //   description,
  //   startdate,
  //   employees
  // }
  if(!id || !data[id]){
    res.status(400).send('No match found')
  }else{
    Object.keys(data[id]).map(item=>{
      if(item==='employees'){
        data[id][item].push(employees)
      }else{
        data[id][item] = req.body[item] || data[id][item];
      }
    })
  }
  
  res.send(data[id]);
});

router.delete('/removeAll', function(req, res, next){
    console.log('removeall')
    data = {};
    res.send("projects removed successfully");
});

router.delete('/removepost', function(req, res, next){
    console.log("removepost")
    console.log(data);
    let projectId = req.body.id;
    //data.indexOf(req.body.id);
    if(data[projectId]){
        delete data[projectId]
    }
    // data = [];
    console.log(data);
    res.send(data);
})

module.exports = router;
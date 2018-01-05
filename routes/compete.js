var express = require('express');
var router = express.Router();
var bm = require('../models/BulletManufacturer');
var user = require('../models/User');
var drill = require('../models/Drill');
var drillUser = require('../models/UserDrillDetail');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jsonWeb = require('jsonwebtoken');

const authCheck = (req, res, next) => {
  debugger;
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(req.headers['x-access-token']) {
    token = JSON.parse(req.headers['x-access-token']);
    token = token.token;
  }

  console.log(req.body);
  // decode token
  if (token) {
    console.log(token);
    // verifies secret and checks exp
    jsonWeb.verify(token, 'secret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        console.log(decoded);
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
};

/* Login */
router.post('/login', function(req, res, next){
  try {
    console.log(user.checkCredentials(req.body, function (err, rows) {
      if (err) {
        res.status(500).send({error: err});
      }
      else {
        if (rows.length > 0) {
          const uId = rows[0].id;
          var payload = {
            id: uId
          };
          var token = jsonWeb.sign(payload, 'secret');
          res.json({
            success: true,
            dateIssued: new Date(),
            token: token
          });
        }
        else {
          res.send(401);
        }
      }
    }));
  }
  catch(e){
    res.status(500).send({ error: e });
  }
});

/* GET all bullet manufacturers. */
router.get('/test', authCheck, function(req, res, next) {
  res.json('test');
});

/* Delete a drill. */
router.post('/deleteDrill', authCheck, function(req, res, next) {
  console.log(drill.deleteDrill(req.body, function (err, rows) {
    if (err)
      res.json(err);
    else {
      console.log(drill.getAllDrills(function(err, rows){
        if(err)
          res.json(err);
        else
          res.json(rows);
      }));
    }
  }));
});

/* Add a drill. */
router.post('/addDrill', authCheck, function(req, res, next) {
    console.log(drill.addDrill(req.body, function (err, rows) {
      if (err)
        res.json(err);
      else
        res.json(rows);
    }));
});

/* Update an existing drill. */
router.post('/updateDrill', authCheck, function(req, res, next) {
  if(req.body && req.body.id) {
      console.log(drill.updateDrill(req.body, function (err, rows) {
        if (err)
          res.json(err);
        else
          res.json(rows);
      }));
  }
});

/* GET all bullet manufacturers. */
router.get('/getManufacturers', authCheck, function(req, res, next) {
  console.log(bm.getAllBulletManufacturers(function(err, rows){
    if(err)
      res.json(err);
    else
      res.json(rows);
  }));
});

/* GET all drills. */
router.post('/getDrills', authCheck, function(req, res, next) {
  console.log(drill.getAllDrills(function(err, rows){
    if(err)
      res.json(err);
    else
      res.json(rows);
  }));
});

/* GET specific. */
router.get('/getDrill', authCheck, function(req, res, next) {
  var drillId = req.param('id');
  console.log(drill.getDrillById(drillId, function(err, rows){
    if(err)
      res.json(err);
    else
      res.json(rows);
  }));
});

/* Add user drill data. */
router.post('/addUserDrillData', authCheck, function(req, res, next) {
  console.log(drillUser.addDrillDataByIdAndUserId(req.body, function (err, rows) {
    if (err)
      res.json(err);
    else
      res.json(rows);
  }));
});

/* Update user drill data. */
router.post('/updateUserDrillData', authCheck, function(req, res, next) {
  console.log(drillUser.updateDrillDataById(req.body, function (err, rows) {
    if (err)
      res.json(err);
    else
      res.json(rows);
  }));
});

/* Delete user drill data. */
router.post('/deleteUserDrillData', authCheck, function(req, res, next) {
  console.log(drillUser.deleteDrillDataById(req.body, function (err, rows) {
    if (err)
      res.json(err);
    else
      res.json(rows);
  }));
});

/* Delete user drill data. */
router.post('/getUserDrillData', authCheck, function(req, res, next) {
  console.log(drillUser.getDrillDataByIdAndUserId(req.body, function (err, rows) {
    if (err)
      res.json(err);
    else
      res.json(rows);
  }));
});

/* GET all users. */
router.get('/getUsers', authCheck, function(req, res, next) {
  console.log(user.getAllUsers(function(err, rows){
    if(err)
      res.json(err);
    else
      res.json(rows);
  }));
});

/* Add User. */
router.post('/addUser', authCheck, function(req, res, next) {
  console.log(user.addUser(req.body, function(err, rows){
    if(err)
      res.json(err);
    else
      res.json(rows);
  }));
});

module.exports = router;

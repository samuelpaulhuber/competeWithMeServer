var express = require('express');
var router = express.Router();
var bm = require('../models/BulletManufacturer');
var user = require('../models/User');
var drill = require('../models/Drill');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jsonWeb = require('jsonwebtoken');

const authCheck = (req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

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
}

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

/* GET all users. */
router.get('/getUsers', authCheck, function(req, res, next) {
  console.log(user.getAllUsers(function(err, rows){
    if(err)
      res.json(err);
    else
      res.json(rows);
  }));
});

/* GET all users. */
router.post('/addUser', authCheck, function(req, res, next) {
  console.log(user.addUser(req.body, function(err, rows){
    if(err)
      res.json(err);
    else
      res.json(rows);
  }));
});

module.exports = router;

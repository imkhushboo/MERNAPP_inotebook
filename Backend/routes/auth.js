const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_S = "hehjbfjbsjbk@djfn";
var fetchUser = require('../middleware/fetchUser');




router.post('/createuser', [body('email').isEmail(), body('password').isLength({ min: 5 })], async (req, res) => {
  const result = validationResult(req);
  console.log(req.body);
  let success = false;
  if (!result.isEmpty()) {
    return res.send({ success, errors: result.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({ success, error: "sorry user already exist with this email" });
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
    const data = {
      user: {
        id: user.id
      }
    }
    var token = jwt.sign(data, JWT_S);
    success = true;
    return res.json({ success, token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({ success, error: "Some error occured!!" });
  }
});




// authorize user end point with email and password

router.post('/login', [body('email', 'Enter valid Email').isEmail(), body('password', 'Enter a valid password').isLength({ min: 5 })], async (req, res) => {
  const result = validationResult(req);
  console.log(req.body);
  let success = false;
  if (!result.isEmpty()) {
    return res.send({ success, errors: result.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ success, error: "Try to login with another email" });
    }
    const passwordcompare = bcrypt.compare(req.body.password, user.password);
    if (!passwordcompare) {
      return res.status(400).json({ success, error: "Try to login with another email" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    var token = jwt.sign(data, JWT_S);
    return res.json({ success: true, token });
  } catch (err) {
    return res.status(500).send({ success, error: "Internal server error" });
  }
});

//ROUTE 3

router.post('/getuser', fetchUser, async (req, res) => {
  const result = validationResult(req);
  console.log(req.body);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }
  try {
    let userid = req.user.id;
    console.log(userid);
    let user = await User.findById(userid).select("password");
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
});


module.exports = router;
const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
      error: errors.array()[0].param,
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMsg: errors.array()[0].msg,
      error: errors.array()[0].param,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User email does not exists",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "emial and password do not mattch",
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECERET);
    //put token in cookkkie
    res.cookie("token", token, { expire: new Date() + 999999 });
    ///ssend response to front eend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout succefully",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECERET,
  userProperty: "auth",
});

//custom middle ware
exports.isAuthenticated = (req, res ,next)=>{
  let checker =  req.profile && req.auth && req.profile._id == req.auth._id
  if(!checker){
    return res.status(403).json({
      error:"ACCESS DENIED"
    })
  }
  next();
}
exports.isAdmin = (req, res ,next)=>{
  if (req.profile.role === 0){
    res.status(403).json({
      error: "You are not admin "
    })
  }
  next();
}

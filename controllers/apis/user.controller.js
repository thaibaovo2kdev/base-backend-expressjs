const express = require("express");
const router = express.Router();
const userService = require("../../services/user.service");
const validator = require("../../validators/user.validator.js");
const showError = require('../../helpers/errorShowContent').default;
const rateLimit = require("express-rate-limit");
const handleResponse = require("../../helpers/responseHandler.js");

const limiter = rateLimit({
  windowMs: 1000, // 1 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  handler: function (req, res) {
    res.status(429).send({
      isSuccess: false,
      statusCode: 429,
      error: showError('TOO_MANY_REQUEST', req.headers.lcode)
    });
  },
});


// routes
router.post("/register", limiter,validator.register, register);
router.post("/login",limiter,validator.login,authenticateByEmail);
router.get("/info",limiter, getInformation);
router.put("/coin",limiter,validator.updateCoin, updateCoin);
router.put("/exp",limiter,validator.updateExp, updateExp);
router.put("/",limiter,validator.update, update);
router.put("/money",limiter,validator.updateMoney, updateMoney);

module.exports = router;


function register(req, res, next) {
  userService
    .create(req.body)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}

function authenticateByEmail(req, res, next) {
  const {email, password }=req.body
  userService
    .authenticateByEmail({email, password})
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}

function getInformation(req, res, next) {
  userService
    .getInfo(req.userId)
    .then((user) => handleResponse(res, user))
    .catch((err) => next(err));
}


function updateCoin(req, res, next) {
  userService
    .updateCoin(req)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}


function updateExp(req, res, next) {
  userService
    .updateExp(req)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}



function updateMoney(req, res, next) {
  userService
    .updateMoney(req)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}

function update(req, res, next) {
  userService
    .update(req)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}





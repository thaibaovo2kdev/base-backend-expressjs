const express = require("express");
const router = express.Router();
const adminService = require("../../services/admin.service.js");
const validator = require("../../validators/user.validator.js");
const showError = require("../../helpers/errorShowContent.js").default;
const rateLimit = require("express-rate-limit");
const handleResponse = require("../../helpers/responseHandler.js");

const limiter = rateLimit({
  windowMs: 1000, // 1 minutes
  max: 10, // limit each IP to 100 requests per windowMs
  handler: function (req, res) {
    res.status(429).send({
      isSuccess: false,
      statusCode: 429,
      error: showError("TOO_MANY_REQUEST", req.headers.lcode),
    });
  },
});

// routes
router.post("/register", limiter, validator.register, register);
router.post("/login", limiter, validator.login, authenticateByEmail);
router.get("/info", limiter, getInformation);
router.put("/coin", limiter, validator.updateCoin, updateCoin);
router.put("/exp", limiter, validator.updateExp, updateExp);
router.put("/", limiter, validator.update, update);
router.put("/money", limiter, validator.updateMoney, updateMoney);
router.get("/statistics", limiter, statistics);

module.exports = router;

function register(req, res, next) {
  adminService
    .create(req.body)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}

function authenticateByEmail(req, res, next) {
  const { email, password } = req.body;
  adminService
    .authenticateByEmail({ email, password })
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}

function getInformation(req, res, next) {
  adminService
    .getInfo(req.adminId)
    .then((admin) => handleResponse(res, admin))
    .catch((err) => next(err));
}

function updateCoin(req, res, next) {
  adminService
    .updateCoin(req)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}

function updateExp(req, res, next) {
  adminService
    .updateExp(req)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}

function updateMoney(req, res, next) {
  adminService
    .updateMoney(req)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}

function update(req, res, next) {
  adminService
    .update(req)
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}

function statistics(_, res, next) {
  adminService
    .statistics()
    .then((item) => handleResponse(res, item))
    .catch((err) => next(err));
}


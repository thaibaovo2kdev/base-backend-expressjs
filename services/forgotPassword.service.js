const ForgotPassword = require("../models/forgotPassword");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const Utils = require("../utils/utils.js");
const SendMail = require("../utils/sendMail.js");

module.exports = {
  checkToken,
  upsert,
  resetPasswordByToken,
};

async function resetPasswordByToken(req) {
  const data = await ForgotPassword.findOne({ token: req.body.token });
  if (data) {
    const user = await User.findOne({ email: data.email });
    if (new Date(data.time_expired) > new Date()) {
      if (req.body.password) {
        user.hash = bcrypt.hashSync(req.body.password, 10);
        await ForgotPassword.deleteMany({ token: req.body.token });
        return await user.save();
      }
    } else {
      return null;
    }
  }
  return null;
}
async function checkToken(req) {
  return await ForgotPassword.findOne({ token: req.params.token });
}

async function upsert(email, token) {
  const timeExpired = 86400000;
  const checkEmail = await ForgotPassword.findOne({ email });
  let item
  if (checkEmail) {
    checkEmail.token = token;
    checkEmail.time_expired = Date.now() + timeExpired;
    item = await checkEmail.save();
  } else {
    let forgotPassword = {};
    forgotPassword.email = email;
    forgotPassword.token = token;
    forgotPassword.time_expired = Date.now() + timeExpired;
    item = await ForgotPassword.create(forgotPassword);
  }
  let content = "";
  content += `
      <div style="padding: 10px;>
          <div style="padding: 10px; background-color: white;">
          <div>A request to reset your password has been made. If you did not make this request, simply ignore this email.</div>
              <div style="color: black">Your code: <b>${token}</b></div>
          </div>
      </div>
  `;
  SendMail.sendMail(email, '[Support Forgot Password]', content)
  return item;
}
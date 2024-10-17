const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const User = require("../models/user");
const config = require("../configs/config");
// const { redis } = require("../caches/index");
module.exports = {
  authenticateByEmail,
  updateCoin,
  updateExp,
  updateMoney,
  update,
  getInfo,
  create
};

async function create(userParam) {
  userParam.email = userParam.email.replace(/\s+/g, "").toLowerCase();
  let userExisted = await User.findOne({ email: userParam.email });
  if (userParam.email != "") {
    if (userExisted) {
      return { statusCode: 400, message: "ACCOUNT_ALREADY_EXISTS" };
    }
  }
  const user = new User(userParam);
  // hash password
  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10);
  }
  // save user
  await user.save();
  // SendMail.sendMail(user.email, "[Welcome - New Register]", htmlMail.htmlStructure(htmlMail.verifyContent(activateCode)));
  return { statusCode: 200, message: "ADD_SUCCESS", result: user };
}

async function authenticateByEmail({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      result: email,
      statusCode: 400,
      message: `ACCOUNT_NOT_FOUND`,
    };
  }
 
  let compare= bcrypt.compareSync(password, user.hash)
 
  if (user && compare) {
    const accessToken = jwt.sign({ sub: user.id }, config.SECRET_KEY, {
      expiresIn: "3d",
    });
    const current = moment();
    current.add(3,'days');
    const userJson = user.toJSON();
    delete userJson.hash;
    return {
      result: {
        accessToken,
        refreshToken: "",
        timeExpired: current.toDate(),
        ...userJson,
      },
      statusCode: 200,
    };
  } else {
    return {
      statusCode: 400,
      message: `WRONG_PASSWORD`,
    };
  }
}

async function getInfo(userId) {
  let user = await User.findById(userId);
  return {
    statusCode: 200,
    message: "GET_SUCCESS",
    result: user
  };
}

async function updateCoin(req) {
  try {
    let user = await User.findById(req.userId);
    user.coin = user.coin + req.body.coin;
    if (user.coin < 0) {
      return {
        statusCode: 400,
        message: "NOT_ENOUGH_COIN",
        result: {
          coin: user.coin
        }
      }
    }
    await user.save();
    return {
      statusCode: 200,
      result: {
        coin: user.coin
      },
      message: "UPDATE_SUCCESS"
    }
  } catch (e) {
    console.log(e)
  }
  return null;
}

async function updateExp(req) {
  try {
    let user = await User.findById(req.userId);
    user.exp = user.exp + req.body.exp;
    await user.save();
    return {
      statusCode: 200,
      result: {
        exp: user.exp
      },
      message: "UPDATE_SUCCESS"
    }
  } catch (e) {
    console.log(e)
  }
  return null;
}

async function update(req) {
  try {
    let user = await User.findById(req.userId);
    if (req.body.exp != null) {
      user.exp = req.body.exp;
    }
    if (req.body.coin != null) {
      user.coin = req.body.coin;
    }
    if (req.body.money != null) {
      user.money = req.body.money;
    }
    await user.save();
    return {
      statusCode: 200,
      result: user,
      message: "UPDATE_SUCCESS"
    }
  } catch (e) {
    console.log(e)
  }
  return null;
}

async function updateMoney(req) {
  try {
    let user = await User.findById(req.userId);
    if (user.money) {
      user.money = user.money + req.body.money;
    } else {
      user.money = req.body.money;
    }
    if (user.money < 0) {
      return {
        statusCode: 400,
        message: "NOT_ENOUGH_DIAMOND",
        result: {
          money: user.money
        }
      }
    }
    await user.save();
    return {
      statusCode: 200,
      result: {
        money: user.money
      },
      message: "UPDATE_SUCCESS"
    }
  } catch (e) {
    console.log(e)
  }
  return null;
}

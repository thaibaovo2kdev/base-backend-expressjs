const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const Admin = require("../models/admin");
const config = require("../configs/config");
// const { redis } = require("../caches/index");
module.exports = {
  authenticateByEmail,
  updateCoin,
  updateExp,
  updateMoney,
  update,
  getInfo,
  create,
};

async function create(adminParam) {
  adminParam.email = adminParam.email.replace(/\s+/g, "").toLowerCase();
  let adminExisted = await Admin.findOne({ email: adminParam.email });
  if (adminParam.email != "") {
    if (adminExisted) {
      return { statusCode: 400, message: "ACCOUNT_ALREADY_EXISTS" };
    }
  }
  const admin = new Admin(adminParam);
  // hash password
  if (adminParam.password) {
    admin.hash = bcrypt.hashSync(adminParam.password, 10);
  }
  // save admin
  await admin.save();
  // SendMail.sendMail(user.email, "[Welcome - New Register]", htmlMail.htmlStructure(htmlMail.verifyContent(activateCode)));
  return { statusCode: 200, message: "ADD_SUCCESS", result: admin };
}

async function authenticateByEmail({ email, password }) {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return {
      result: email,
      statusCode: 400,
      message: `ACCOUNT_NOT_FOUND`,
    };
  }

  let compare = bcrypt.compareSync(password, admin.hash);

  if (admin && compare) {
    const accessToken = jwt.sign({ sub: admin.id }, config.SECRET_KEY, {
      expiresIn: "3d",
    });
    const current = moment();
    current.add(3, "days");
    const adminJson = admin.toJSON();
    delete adminJson.hash;
    return {
      result: {
        accessToken,
        refreshToken: "",
        timeExpired: current.toDate(),
        ...adminJson,
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

async function getInfo(adminId) {
  let admin = await Admin.findById(adminId);
  return {
    statusCode: 200,
    message: "GET_SUCCESS",
    result: admin,
  };
}

async function updateCoin(req) {
  try {
    let admin = await Admin.findById(req.adminId);
    admin.coin = admin.coin + req.body.coin;
    if (admin.coin < 0) {
      return {
        statusCode: 400,
        message: "NOT_ENOUGH_COIN",
        result: {
          coin: admin.coin,
        },
      };
    }
    await admin.save();
    return {
      statusCode: 200,
      result: {
        coin: admin.coin,
      },
      message: "UPDATE_SUCCESS",
    };
  } catch (e) {
    console.log(e);
  }
  return null;
}

async function updateExp(req) {
  try {
    let admin = await Admin.findById(req.adminId);
    admin.exp = admin.exp + req.body.exp;
    await admin.save();
    return {
      statusCode: 200,
      result: {
        exp: admin.exp,
      },
      message: "UPDATE_SUCCESS",
    };
  } catch (e) {
    console.log(e);
  }
  return null;
}

async function update(req) {
  try {
    let admin = await Admin.findById(req.adminId);
    if (req.body.exp != null) {
      admin.exp = req.body.exp;
    }
    if (req.body.coin != null) {
      admin.coin = req.body.coin;
    }
    if (req.body.money != null) {
      admin.money = req.body.money;
    }
    await admin.save();
    return {
      statusCode: 200,
      result: admin,
      message: "UPDATE_SUCCESS",
    };
  } catch (e) {
    console.log(e);
  }
  return null;
}

async function updateMoney(req) {
  try {
    let admin = await Admin.findById(req.adminId);
    if (admin.money) {
      admin.money = admin.money + req.body.money;
    } else {
      admin.money = req.body.money;
    }
    if (admin.money < 0) {
      return {
        statusCode: 400,
        message: "NOT_ENOUGH_DIAMOND",
        result: {
          money: admin.money,
        },
      };
    }
    await admin.save();
    return {
      statusCode: 200,
      result: {
        money: admin.money,
      },
      message: "UPDATE_SUCCESS",
    };
  } catch (e) {
    console.log(e);
  }
  return null;
}

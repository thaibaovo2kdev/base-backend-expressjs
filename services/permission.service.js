const Permission = require("../models/permission");
const Utils = require("../utils/utils");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll(req, pageOptions = {}) {
  const sort = Utils.getSort(req.query.sortBy)
  const result = await Permission.find()
    .sort(sort)
    .skip((pageOptions.page - 1) * pageOptions.limit + pageOptions.skip)
    .limit(pageOptions.limit);
  const total = await Permission.find().countDocuments();
  return { result, total };
}

async function getById(id) {
  return await Permission.findById(id).select("-hash");
}

async function create(permissionParam) {
  try {
    permissionParam._id = permissionParam.id
    let permission = new Permission(permissionParam);
    permission = await permission.save();
    return { statusCode: 200, result: permission };
  } catch (e) {
    console.log(e)
  }
  return { statusCode: 400, message: 'Something wrong!' };
}

async function update(id, permissionParam) {
  try {
    let permission = await Permission.findById(id);
    Object.assign(permission, permissionParam);
    permission = await permission.save();
    return { statusCode: 200, result: permission };
  } catch (e) {
    console.log(e)
  }
  return { statusCode: 400, message: 'Something wrong!' };
}

async function _delete(id) {
  if (id != "ADMIN") {
    await Permission.findByIdAndRemove(id);
  }
}


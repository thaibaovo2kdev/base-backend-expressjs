const express = require("express");
const router = express.Router();
const permissionService = require("../../services/permission.service");
const showError = require('../../helpers/errorShowContent').default;

// routes
router.post("/",  newItem);
router.get("/", getAll);
router.get("/:id",  getById);
router.put("/:id",update);
router.delete("/:id", _delete);

module.exports = router;

function newItem(req, res, next) {
  permissionService
    .create(req.body)
    .then((item) => res.json({ data: item, isSuccess: true, success: showError("ADD_SUCCESS", req.headers.lcode) }))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  const  pageOptions = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.size) || parseInt(req.query.limit) || 10,
    skip: 0,
  };
  permissionService
    .getAll(req, pageOptions)
    .then((permission) =>
      res.json({
        data: {
          items: permission.result,
          total: permission.total,
          ...pageOptions,
        },
        isSuccess: true, statusCode: 200, success: showError("GET_SUCCESS", req.headers.lcode)
      })
    )
    .catch((err) => next(err));
}

function getById(req, res, next) {
  permissionService
    .getById(req.params.id)
    .then((permission) =>
      permission
        ? res.json({
          data: permission,
          isSuccess: true, statusCode: 200, success: showError("GET_SUCCESS", req.headers.lcode)
        })
        : res.status(404).json({ isSuccess: false, statusCode: 404, message: 'Not found', error: showError("DATA_NOT_FOUND", req.headers.lcode) })
    )
    .catch((err) => next(err));
}


function update(req, res, next) {
  permissionService
    .update(req.params.id, req.body)
    .then((item) => res.json({ data: item, isSuccess: true, statusCode: 200, success: showError("UPDATE_SUCCESS", req.headers.lcode) }))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  permissionService
    .delete(req.params.id, req.body)
    .then((item) => res.json({ data: item, isSuccess: true, statusCode: 200, success: showError("DELETE_SUCCESS", req.headers.lcode) }))
    .catch((err) => next(err));
}

const express = require('express');

// use JWT auth to secure the api
const v1ApiController = require('./v1');
// const v2ApiController = require('./v2');
let router = express.Router();
router.use('/v1', v1ApiController);
router.get('/healthcheck/:text', (req, res) => { return res.status(200).json({ data: req.params.text, isSuccess: true, message: "Good health check", statusCode: 200 }) });
router.get('/healthcheck', (_req, res) => { return res.status(200).json({ message: "Good health check", isSuccess: true, statusCode: 200 }) });
// router.use('/v2', v2ApiController);
module.exports = router;    
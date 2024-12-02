const userController = require('../../controllers/apis/user.controller');
const adminController = require('../../controllers/apis/admin.controller');
const permissionController = require('../../controllers/apis/permission.controller');
const express = require('express');
const router = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('../../configs/jwt');
const errorHandler = require('../../helpers/errorHandler');
const { expressJoiValidations } = require('express-joi-validations');
router.use(bodyParser.json({limit: '1B'}));
router.use(bodyParser.urlencoded({limit: '1B', extended: true}));
router.use(bodyParser.json());
router.use(cors());


router.use(jwt());
router.use(expressJoiValidations({overwriteRequest:true,throwErrors:true  }));
router.use("/admin", adminController);
router.use('/user', userController);
router.use('/permission', permissionController);
router.use(errorHandler);

module.exports = router;

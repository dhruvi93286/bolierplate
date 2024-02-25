const common = require('common-module')
const router = common.express.Router();

const alertsAssignController = require("../controller/alertsAssign.controller");
const { asyncHandler } = require("../../../../utils/helpers");
const Joi = common.joi;
const APIResponse = require("../../../../utils/helpers/APIResponse");
const logger = require("../../../../Logger");
const keycloak = require("../../../../config/keycloak-config").getKeycloak();
const licenceFile = require('../../../../licence');
var configData = {
  licenseVersion: process.env.LICENSEVERSION,
  applicationVersion: process.env.APPLICATIONVERSION,
  firstName: process.env.FIRSTNAME,
  lastName: process.env.LASTNAME,
  email: process.env.EMAIL,
  expirationDate: process.env.EXPIRATIONDATE
};
router.post("", async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsAssignController.Assignalerts(req, res))
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});

router.get("/:id", keycloak.protect(["alerts-admin", "alerts-view"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsAssignController.getAssignalerts(req, res));
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});
router.get("/alertsId/:id", keycloak.protect(["alerts-admin", "alerts-view"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsAssignController.getAssignalertsId(req, res));
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});
router.get("", keycloak.protect(["alerts-admin", "alerts-view"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsAssignController.getAllAssignalerts(req, res));
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});
router.post("/create", keycloak.protect(["alerts-admin", "alerts-view"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsAssignController.createAlertsAssign(req, res))
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});
router.put("/create", keycloak.protect(["alerts-admin"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsAssignController.unassignAlert(req, res))
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});
router.get("/Assign/alertTitle", async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsAssignController.alertsAssign(req, res));
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});
router.get("/Unassign/alertTitle", async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsAssignController.alertsUnAssign(req, res));
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});

const alertsValidation = common.joi.object({
  locationId: common.joi.number()
    .required()
    .error(new Error("locationId is required")),
}).unknown();

function AlertsValidation(req, res, next) {
  const Data = req.body;
  const { error, result } = alertsValidation.validate(Data);
  if (error) {
    logger.error(`status code:${common.httpStatus.BAD_REQUEST} messages: ${error.message}`);
    return res.status(common.httpStatus.BAD_REQUEST).json(new APIResponse(null, error.message, true, common.httpStatus.BAD_REQUEST));
  } else {
    return next();
  }
}

module.exports = router;

const common = require("common-module");
const alertsController = require("../controller/alerts.controller");
const { asyncHandler } = require("../../../../utils/helpers");
const APIResponse = require("../../../../utils/helpers/APIResponse");
const logger = require("../../../../Logger");
const { route } = require("./alertsAssign.router");
const keycloak = require("../../../../config/keycloak-config").getKeycloak();
const licenceFile = require('../../../../licence');
const router = common.router;

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
    await asyncHandler(alertsController.createalerts(req, res));
  } else {
    res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
  // licenceFile.describeClean();
});

router.get("", keycloak.protect(["alerts-admin", "alerts-view"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsController.getalerts(req, res))
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});

router.get("/:id", keycloak.protect(["alerts-admin", "alerts-view"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsController.getalertsById(req, res));
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});

router.get("/alerts/title", keycloak.protect(["alerts-admin", "alerts-view"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsController.getAlertsByTitle(req, res));
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});

router.put("/:id", keycloak.protect(["alerts-admin"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsController.updatealerts(req, res));
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});

router.delete("/:id", keycloak.protect(["alerts-admin"]), async (req, res) => {
  var licenceVerification = await licenceFile.licence(configData);
  if (licenceVerification == true) {
    asyncHandler(alertsController.deletealerts(req, res));
  } else {
    return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse(licenceVerification.message, false, licenceVerification.code, {}, licenceVerification.error));
  }
});

const alertsValidation = common.joi.object({
  // alertBackgroundColor: Joi.string().error(new Error('alertBackgroundColor must be in String')),
  // alertForegroundColor: Joi.string().error(new Error('alertForegroundColor must be in String')),
  // alertIsOverlay: Joi.string().error(new Error('alertIsOverlay must be in String')),
  // alertMessage: Joi.string().error(new Error('alertMessage must be in String')),
  // alertCreatedAt: Joi.string().error(new Error('alertCreatedAt must be in String')),
  // alertPriority: Joi.number().error(new Error('alertPriority must be in numeric')),
  // alertSender: Joi.string().error(new Error('alertSender must be in String')),
  // alertTitle: Joi.string().error(new Error('patalertTitleientId must be in String')),
  // ledId: Joi.number().error(new Error('ledId must be in numeric')),
}).unknown();

function AlertsValidation(req, res, next) {
  const Data = req.body;
  const { error, result } = alertsValidation.validate(Data);
  if (error) {
    logger.error(
      `status code:${common.httpStatus.BAD_REQUEST} messages: ${error.message}`
    );
    return res
      .status(common.httpStatus.BAD_REQUEST)
      .json(new APIResponse(null, error.message, true, common.httpStatus.BAD_REQUEST));
  } else {
    return next();
  }
}

module.exports = router;

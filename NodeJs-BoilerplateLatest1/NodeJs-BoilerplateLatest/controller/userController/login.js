/**
 * NPM PACKAGE
 */
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const usersCollection = common.db.users;
const deviceCollection = common.db.device


/**
 * [CREATED BY : PARTH]
 * LOGIN USER FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.login = async(req) => {
    try {
        var errorArray = [];
        var errorFlag = 0;
        var user = {}
            /**
             * REQUIRE FIELDS
             */

        if (typeof req.body.loginType == 'undefined' || req.body.deviceType == "" || typeof req.body.deviceType == 'undefined' || req.body.deviceToken == "" || typeof req.body.deviceToken == 'undefined' || req.body.deviceId == "" || typeof req.body.deviceId == 'undefined' || req.body.timeZone == "" || typeof req.body.timeZone == 'undefined') {
            /**
             * INVALID DETAILS (SOMETHING MISSING )
             */
            errorFlag = 1
            var successOrError = common.responseServices.successOrErrors("err_27");
            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.loginRequire, successOrError.location);
            errorArray.push(resobj)

        } else {
            /**
             * NORMAL LOGIN (EMAIL , PASSWORD)
             * IF LOGIN TYPE 0 
             */
            if (req.body.loginType == 0) {

                /**
                 * LOGIN WITH EMAIL OR PASSWORD
                 */
                if (req.body.email != "" && typeof req.body.email != 'undefined' && req.body.password != "" && typeof req.body.password != 'undefined') {

                    var userListQuery = { email: req.body.email }
                    var usersDetails = await common.query.findOne(usersCollection, userListQuery);

                    if (usersDetails != null && usersDetails.length != 0) {

                        var comparePassword = await bcrypt.compare(req.body.password, usersDetails.dataValues.password)

                        if (comparePassword == true) {

                            errorFlag = 0
                            user.email = usersDetails.email

                        } else {

                            errorFlag = 1

                            /**
                             * PASSWORD IS WRONG 
                             */
                            var successOrError = common.responseServices.successOrErrors("err_49");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.password, successOrError.location);
                            errorArray.push(resobj)

                        }

                    } else {

                        errorFlag = 1

                        /**
                         * EMAIL NOT FOUND
                         */
                        var successOrError = common.responseServices.successOrErrors("err_20");
                        var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                        errorArray.push(resobj)

                    }

                }
                /**
                 * LOGIN WITH PHONE NUMBER AND PASSWORD
                 */
                else if (req.body.phone != "" && typeof req.body.phone != 'undefined' && req.body.countryCode != "" && typeof req.body.countryCode != 'undefined' && req.body.password != "" && typeof req.body.password != 'undefined') {

                    var userListQuery = { phone: parseInt(req.body.phone) }
                    var usersDetails = await common.query.findOne(usersCollection, userListQuery);
                    if (usersDetails != null && usersDetails.length != 0) {

                        var comparePassword = await bcrypt.compare(req.body.password, usersDetails.dataValues.password)

                        if (comparePassword == true) {

                            errorFlag = 0
                            user.phone = usersDetails.phone

                        } else {

                            errorFlag = 1

                            /**
                             * WRONG PASSWORD
                             */
                            var successOrError = common.responseServices.successOrErrors("err_49");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.password, successOrError.location);
                            errorArray.push(resobj)

                        }

                    } else {

                        errorFlag = 1

                        /**
                         * PHONE NOT FOUND
                         */
                        var successOrError = common.responseServices.successOrErrors("err_26");
                        var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.phone, successOrError.location);
                        errorArray.push(resobj)

                    }

                } else {
                    errorFlag = 1

                    /**
                     * MISSING REQUIRE  FIELD (EMAIL || PHONE , PASSWORD)
                     */
                    var successOrError = common.responseServices.successOrErrors("err_21");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.loginType0Login, successOrError.location);
                    errorArray.push(resobj)
                }
            }

            /**
             * GOOGLE ID LOGIN 
             * LOGIN TYPE 1
             */
            if (req.body.loginType == 1) {

                if (req.body.googleId != "" && typeof req.body.googleId != 'undefined') {

                    var findGoogleId = await common.query.findOne(usersCollection, { googleId: req.body.googleId })
                    if (findGoogleId != null) {

                        errorFlag = 0
                        user.googleId = findGoogleId.googleId

                    } else {

                        errorFlag = 1

                        /**
                         * GOOGLE ID NOT FOUND 
                         */
                        var successOrError = common.responseServices.successOrErrors("err_22");
                        var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.googleId, successOrError.location);
                        errorArray.push(resobj)

                    }
                } else {

                    errorFlag = 1

                    /**
                     * GOOGLE ID IS REQUIRE 
                     */
                    var successOrError = common.responseServices.successOrErrors("err_23");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.googleId, successOrError.location);
                    errorArray.push(resobj)

                }
            }

            /**
             * FACEBOOK ID LOGIN
             * LOGIN TYPE 2
             */
            if (req.body.loginType == 2) {

                if (req.body.facebookId != "" && typeof req.body.facebookId != 'undefined') {

                    var findfacebookId = await common.query.findOne(usersCollection, { facebookId: req.body.facebookId })

                    if (findfacebookId != null) {

                        errorFlag = 0
                        user.facebookId = findfacebookId.facebookId

                    } else {

                        errorFlag = 1

                        /**
                         * FACEBOOK ID NOT FOUND
                         */
                        var successOrError = common.responseServices.successOrErrors("err_24");
                        var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.facebookId, successOrError.location);
                        errorArray.push(resobj)

                    }

                } else {

                    errorFlag = 1

                    /**
                     * FACEBOOK ID IS REQUIRE
                     */
                    var successOrError = common.responseServices.successOrErrors("err_50");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.facebookId, successOrError.location);
                    errorArray.push(resobj)
                }
            }

            /**
             * APPLE ID LOGIN
             * LOGIN TYPE 3
             */
            if (req.body.loginType == 3) {

                if (req.body.appleId != "" && typeof req.body.appleId != 'undefined') {

                    var findappleId = await common.query.findOne(usersCollection, { appleId: req.body.appleId })

                    if (findappleId != null) {

                        errorFlag = 0
                        user.appleId = findappleId.appleId

                    } else {

                        errorFlag = 1

                        /**
                         * APPLE ID NOT FOUND
                         */
                        var successOrError = common.responseServices.successOrErrors("err_25");
                        var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.appleId, successOrError.location);
                        errorArray.push(resobj)
                    }

                } else {

                    errorFlag = 1

                    /**
                     * APPLE ID IS REQUIRE
                     */
                    var successOrError = common.responseServices.successOrErrors("err_51");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.appleId, successOrError.location);
                    errorArray.push(resobj)

                }
            }


            /**
             * LOGIN TYPE VALIDATION
             */
            else if (req.body.loginType != 0 && req.body.loginType != 1 && req.body.loginType != 2 && req.body.loginType != 3) {

                /**
                 * INVALID LOGIN TYPE 
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_38");
                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.loginType, successOrError.location);
                errorArray.push(resobj)
            }

            if (req.body.latitude != "" && typeof req.body.latitude != 'undefined' && req.body.longitude != "" && typeof req.body.longitude != 'undefined') {
                var latitudeValidation = helpers.latLong(req.body.latitude);
                var longitudeValidation = helpers.latLong(req.body.longitude)
                if (latitudeValidation == false) {
                    /**
                     * LATITUDE INVALID
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_47");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.latitude, successOrError.location);
                    errorArray.push(resobj)
                }
                if (longitudeValidation == false) {
                    /**
                     * LONGITUDE INVALID
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_47");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.longitude, successOrError.location);
                    errorArray.push(resobj)
                }
                if (latitudeValidation == true && longitudeValidation == true) {
                    var find = await common.query.findOne(usersCollection, user)
                    var devicedDB = await common.query.updateOne(usersCollection, { id: find.id }, { latitude: req.body.latitude, longitude: req.body.longitude })
                }
            }
            if (errorFlag == 0) {
                var userId = "";
                var find = await common.query.findOne(usersCollection, user)
                userId = find.id
            }

            if (req.body.deviceType != 'A' && req.body.deviceType != 'I') {
                /**
                 * INVALID DEVICE TYPE
                 */
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_42");
                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.deviceType, successOrError.location);
                errorArray.push(resobj)
            }

        }

        if (errorArray.length >= 0 && errorFlag == 1) {
            return common.responseModel.failResponse("Errors", {}, errorArray)
        } else {
            var token = jwt.sign({ userId: userId }, process.env.secretKey)
            var validDevice = await common.query.findOne(deviceCollection, { deviceType: req.body.deviceType, deviceToken: req.body.deviceToken, deviceId: req.body.deviceId })

            /**
             * VALIDATION ON DEVICE DETAILS ( DEVICE TYPE , DEVICE TOKEN , DEVICE ID)
             */
            if (validDevice != null) {

                /**
                 * UPDATE TIMEZONE IN LOGIN SAME DEVICE
                 */
                var devicedDB = await common.query.updateOne(deviceCollection, { id: validDevice.id }, { timezone: req.body.timeZone })

                if (devicedDB == 0) {

                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_29");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.timeZone, successOrError.location);
                    errorArray.push(resobj)

                }
            } else {
                /**
                 * REGISTER DEVICE 
                 */
                var insertObj = {
                    userId: userId,
                    deviceType: req.body.deviceType,
                    deviceToken: req.body.deviceToken,
                    deviceId: req.body.deviceId,
                    timezone: req.body.timeZone,
                }
                var devicedDB = await common.query.create(deviceCollection, insertObj)

            }
            /**
             * SUCCESS RESPONSE
             */
            var response = await common.response.users.usersObjectRes(find, token)

            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successResponse(successOrError.login, response, []);
        }
    } catch (error) {
        /**
         * CATCH ERROR
         */
        console.log(error);
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var resobj = common.responseModel.resObj(error.message, successOrError.parameters.noParams, successOrError.location);
        return common.responseModel.failResponse(successOrError.failMsg, {}, resobj);

    }
}
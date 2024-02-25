/**
 *  NPM PACKAGES 
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

/**
 *  HELPERS
 */
var common = require('../common')
const constant = require('../../config/constant');

/**
 * DATABASE
 */
const usersCollection = common.db.users;
const deviceCollection = common.db.device

/**
 * [CREATED BY : PARTH]
 * REGISTER USER FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.create = async(req) => {
    try {
        var errorFlag = 0;
        var errorArray = []

        /**
         * REQUIRE FIELD
         */
        if (req.body.loginType == "" || typeof req.body.loginType == 'undefined' ||
            req.body.latitude == "" || typeof req.body.latitude == 'undefined' ||
            req.body.longitude == "" || typeof req.body.longitude == 'undefined' ||
            req.body.timeZone == "" || typeof req.body.timeZone == 'undefined') {

            /**
             * INVALID DETAILS
             */
            errorFlag = 1

            var successOrError = common.responseServices.successOrErrors("err_02");
            var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.registerRequire, successOrError.location);
            errorArray.push(resobj)

        }

        /**
         * NORMAL LOGIN
         * IF LOGIN TYPE 0 THEN CALL THIS CONDITION
         */
        if (req.body.loginType == 0) {

            if (req.body.email != "" && typeof req.body.email != 'undefined' &&
                req.body.password != "" && typeof req.body.password != 'undefined' &&
                req.body.confirmPassword != "" && typeof req.body.confirmPassword != 'undefined') {

                var emailValidation = await common.helpers.validateEmail(req.body.email);
                var strongPassword = await common.helpers.checkPassword(req.body.password);

                /**
                 * PASSWORD VALIDATION
                 */
                if (strongPassword == false) {

                    /**
                     * INVALID PASSWORD 
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_12");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.password, successOrError.location);
                    errorArray.push(resobj)

                }

                /**
                 * CONFIRM PASSWORD VALIDATION
                 */
                else if (req.body.password != req.body.confirmPassword) {

                    /**
                     * CONFIRM PASSWORD OR PASSWORD NOT MATCH
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_13");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.confirmPassword, successOrError.location);
                    errorArray.push(resobj)


                }

                /**
                 * EMAIL VALIDATION
                 */
                if (emailValidation == false) {

                    /**
                     * INVALID EMAIL
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_03");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.email, successOrError.location);
                    errorArray.push(resobj)

                } else {

                    var userListQuery = { email: req.body.email }
                    var usersDetails = await common.query.findOne(usersCollection, userListQuery);

                    if (usersDetails != null) {

                        /**
                         * EMAIL ALREADY EXITS
                         */
                        errorFlag = 1
                        var successOrError = common.responseServices.successOrErrors("err_04");
                        var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                        errorArray.push(resobj)

                    }
                }

            } else if (req.body.phone != "" && typeof req.body.phone != 'undefined' &&
                req.body.countryCode != "" && typeof req.body.countryCode != 'undefined' &&
                req.body.password != "" && typeof req.body.password != 'undefined' &&
                req.body.confirmPassword != "" && typeof req.body.confirmPassword != 'undefined') {

                var phoneNum = await common.helpers.checkPhone(req.body.phone)
                var countryCodeValidation = await common.helpers.countryCodeValidation(req.body.countryCode)
                var strongPassword = await common.helpers.checkPassword(req.body.password);

                /**
                 * PASSWORD VALIDATION
                 */
                if (strongPassword == false) {

                    /**
                     * INVALID PASSWORD 
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_12");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.password, successOrError.location);
                    errorArray.push(resobj)


                }

                /**
                 * CONFIRM PASSWORD VALIDATION
                 */
                if (req.body.password != req.body.confirmPassword) {

                    /**
                     * CONFIRM PASSWORD OR PASSWORD NOT MATCH
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_13");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.confirmPassword, successOrError.location);
                    errorArray.push(resobj)


                }
                /**
                 * PHONE NUMBER VALIDATION
                 */
                if (phoneNum == false) {

                    /**
                     * INVALID PHONE NUMBER 
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_14");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.phone, successOrError.location);
                    errorArray.push(resobj)


                }
                if (countryCodeValidation == false) {

                    /**
                     * INVALID COUNTRY CODE 
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_40");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.countryCode, successOrError.location);
                    errorArray.push(resobj)


                } else {
                    var userListQuery = { phone: req.body.phone }
                    var usersDetails = await common.query.findOne(usersCollection, userListQuery);

                    if (usersDetails != null) {

                        /**
                         * PHONE NUMBER ALREADY EXITS
                         */
                        errorFlag = 1
                        var successOrError = common.responseServices.successOrErrors("err_41");
                        var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.phone, successOrError.location);
                        errorArray.push(resobj)


                    }
                }
            } else {

                /**
                 * SOME MISSING FIELD
                 */
                var successOrError = await common.responseServices.successOrErrors("err_35");

                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.loginType0Require, successOrError.location);
                return common.responseModel.failResponse(successOrError.failMsg, [], resobj);


            }

        }

        /**
         * GOOGLE LOGIN
         * IF LOGIN TYPE 1 THEN CALL THIS CONDITION
         */
        else if (req.body.loginType == 1) {

            if (req.body.googleId != "" && typeof req.body.googleId != 'undefined') {

                var userListQuery = { googleId: req.body.googleId }
                var usersDetails = await common.query.findOne(usersCollection, userListQuery);

                if (usersDetails != null) {

                    /**
                     * GOOGLE ID ALREADY EXITS
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_05");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.googleId, successOrError.location);
                    errorArray.push(resobj)


                }
            } else {

                /**
                 * GOOGLE ID REQUIRE
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_06");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.googleId, successOrError.location);
                errorArray.push(resobj)


            }

        }
        /**
         * FACEBOOK LOGIN
         * IF LOGIN TYPE 2 THEN CALL THIS CONDITION 
         */
        else if (req.body.loginType == 2) {

            if (req.body.facebookId != "" && typeof req.body.facebookId != 'undefined') {

                var userListQuery = { facebookId: req.body.facebookId }
                var usersDetails = await common.query.findOne(usersCollection, userListQuery);

                if (usersDetails != null) {

                    /**
                     * FACEBOOK ID ALREADY EXITS
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_07");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.facebookId, successOrError.location);
                    errorArray.push(resobj)

                }
            } else {
                /**
                 * FACEBOOK ID REQUIRE
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_08");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.facebookId, successOrError.location);
                errorArray.push(resobj)


            }

        }
        /**
         * APPLE LOGIN
         * IF LOGIN TYPE 3 THEN CALL THIS CONDITION
         */
        else if (req.body.loginType == 3) {

            if (req.body.appleId != "" && typeof req.body.appleId != 'undefined') {

                var userListQuery = { appleId: req.body.appleId }
                var usersDetails = await common.query.findOne(usersCollection, userListQuery);

                if (usersDetails != null) {

                    /**
                     * APPLE ID ALREADY EXITS 
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_09");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.appleId, successOrError.location);
                    errorArray.push(resobj)

                }
            } else {

                /**
                 * APPLE ID REQUIRE
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_10");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.appleId, successOrError.location);
                errorArray.push(resobj)


            }

        }

        /**
         * IF LOGIN TYPE DOESN'T METTER AND ENTER PHONE THEN CALL THIS CONDITION
         */
        if (req.body.phone != "" && typeof req.body.phone != 'undefined') {
            var phoneNum = await common.helpers.checkPhone(req.body.phone)

            /**
             * PHONE NUMBER VALIDATION
             */
            if (phoneNum == false) {

                /**
                 * INVALID PHONE NUMBER 
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_14");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.phone, successOrError.location);
                errorArray.push(resobj)


            }
            if (req.body.countryCode != "" && typeof req.body.countryCode != 'undefined') {
                var countryCodeValidation = await common.helpers.countryCodeValidation(req.body.countryCode)

                if (countryCodeValidation == false) {

                    /**
                     * INVALID COUNTRY CODE 
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_40");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.countryCode, successOrError.location);
                    errorArray.push(resobj)


                }
            } else {

                /**
                 * INVALID COUNTRY CODE 
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_40");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.countryCode, successOrError.location);
                errorArray.push(resobj)

            }
        }

        /**
         * MULTIPLE LOGIN FUNCTIONALITY
         */
        if (constant.kmultipleLogin == false) {
            if (req.body.email != "" && typeof req.body.email != 'undefined') {
                var emailValidation = await common.helpers.validateEmail(req.body.email);
                if (emailValidation == false) {

                    /**
                     * INVALID EMAIL
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_03");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.email, successOrError.location);
                    errorArray.push(resobj)


                } else {

                    var userListQuery = { email: req.body.email }
                    var usersDetails = await common.query.findOne(usersCollection, userListQuery);

                    if (usersDetails != null) {

                        /**
                         * EMAIL ALREADY EXITS
                         */
                        errorFlag = 1
                        var successOrError = common.responseServices.successOrErrors("err_04");
                        var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.email, successOrError.location);
                        errorArray.push(resobj)


                    }
                }
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
            var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.loginType, successOrError.location);
            errorArray.push(resobj)

        }

        /**
         * IF USER ENTER USERNAME THEN CHECK THIS CONDITION
         */

        if (req.body.username != "" && typeof req.body.username != 'undefined') {

            var usernamevalidation = await common.query.findOne(usersCollection, { username: req.body.username })

            if (usernamevalidation != null) {
                /**
                 * USERNAME ALREADY EXITS
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_28");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.username, successOrError.location);
                errorArray.push(resobj)


            } else {
                var usernamevalidation = await common.helpers.nameValidation(req.body.username)
                if (usernamevalidation == false) {
                    /**
                     * FIRST NAME VALIDATION
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_48");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.username, successOrError.location);
                    errorArray.push(resobj)

                }
            }
        }

        /**
         * DATE VALIDATION
         */
        if (req.body.dateOfBirth != "" && typeof req.body.dateOfBirth != 'undefined') {

            var validDate = await common.helpers.parseDate(req.body.dateOfBirth)
            if (validDate == false) {
                /**
                 * INVALID DATE
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_15");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.date, successOrError.location);
                errorArray.push(resobj)


            }

            var findAge = await common.helpers.getAge(req.body.dateOfBirth)
            if (findAge <= 18) {
                /**
                 * YOU ARE NOT 18 YEAR OLD
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_45");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.date, successOrError.location);
                errorArray.push(resobj)

            } else if (isNaN(findAge)) {
                /**
                 * INVALID DATE
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_54");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.date, successOrError.location);
                errorArray.push(resobj)

            }

        }

        /**
         * FIRST NAME VALIDATION
         */
        if (req.body.lastName != "" && typeof req.body.lastName != 'undefined') {

            if (req.body.firstName == "" || typeof req.body.firstName == 'undefined') {
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_61");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.firstName, successOrError.location);
                errorArray.push(resobj)

            } else {


                var validationLastName = await common.helpers.nameValidation(req.body.lastName)

                if (validationLastName == false) {

                    /**
                     * LAST NAME VALIDATION
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_44");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.lastName, successOrError.location);
                    errorArray.push(resobj)


                }
            }

        }
        /**
         * LAST NAME VALIDATION
         */
        if (req.body.firstName != "" && typeof req.body.firstName != 'undefined') {
            if (req.body.lastName == "" || typeof req.body.lastName == 'undefined') {
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_60");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.lastName, successOrError.location);
                errorArray.push(resobj)


            } else {

                var validationFirstName = await common.helpers.nameValidation(req.body.firstName)

                if (validationFirstName == false) {

                    /**
                     * FIRST NAME VALIDATION
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_43");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.firstName, successOrError.location);
                    errorArray.push(resobj)


                }
            }

        }

        /**
         * FILE SIZE VALIDATION
         */
        if (req.files != null) {
            if (typeof req.files.profile != 'undefined') {
                var bytes = (req.files.profile.size / 1048576).toFixed(2)
                if (bytes >= 5) {
                    /**
                     * INVALID PROFILE PICTURE MAXIMUM FILE SIZE IS 5 MB
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_46");
                    var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.profile, successOrError.location);
                    errorArray.push(resobj)

                }
                var profilePath = `${process.env.userProfilePath}`
                var image = await common.helpers.img(req.files.profile, profilePath)
                if (image == false) {
                    profile = ""
                } else {
                    profile = image
                }

            } else {
                /**
                 * INVALID PROFILE PICTURE 
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_73");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.profile, successOrError.location);
                errorArray.push(resobj)

            }
        } else {
            profile = ""
        }

        /**
         * LATITUDE, LONGITUDE VALIDATION
         */
        if (req.body.latitude != "" && typeof req.body.latitude != 'undefined' && req.body.longitude != "" && typeof req.body.longitude != 'undefined') {
            var latitudeValidation = common.helpers.latLong(req.body.latitude);
            var longitudeValidation = common.helpers.latLong(req.body.longitude)
            if (latitudeValidation == false) {
                /**
                 * LATITUDE INVALID
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_47");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.latitude, successOrError.location);
                errorArray.push(resobj)

            }
            if (longitudeValidation == false) {
                /**
                 * LONGITUDE INVALID
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_47");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.longitude, successOrError.location);
                errorArray.push(resobj)

            }
        }
        var addUserObject = {
            firstName: req.body.firstName ? req.body.firstName : '',
            lastName: req.body.lastName ? req.body.lastName : '',
            username: req.body.username ? req.body.username : '',
            password: req.body.password && req.body.loginType == "0" ? bcrypt.hashSync(req.body.password, salt) : '',
            email: req.body.email ? req.body.email : '',
            phone: req.body.phone ? parseInt(req.body.phone) : '',
            countryCode: req.body.countryCode ? parseInt(req.body.countryCode) : '',
            dateOfBirth: req.body.dateOfBirth ? req.body.dateOfBirth : '',
            address: req.body.address ? req.body.address : '',
            loginType: req.body.loginType,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            googleId: req.body.loginType == 1 ? req.body.googleId ? req.body.googleId : '' : '',
            facebookId: req.body.loginType == 2 ? req.body.facebookId ? req.body.facebookId : '' : '',
            appleId: req.body.loginType == 3 ? req.body.appleId ? req.body.appleId : '' : '',
            profile: profile,
            isNotification: req.body.notification == 0 || req.body.notification == 1 ? req.body.notification : 0
        };

        /**
         * DEVICE DETAILS VALIDATION
         */
        if (req.body.deviceType == "" || typeof req.body.deviceType == 'undefined' || req.body.deviceToken == "" || typeof req.body.deviceToken == 'undefined' || req.body.deviceId == "" || typeof req.body.deviceId == 'undefined') {

            /**
             * DEVICE DETAILS REQUIRE
             */
            errorFlag = 1
            var successOrError = common.responseServices.successOrErrors("err_36");
            var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.deviceRequire, successOrError.location);
            errorArray.push(resobj)

        } else {
            /**
             * DEVICE TYPE VALIDATION
             */
            if (req.body.deviceType != 'A' && req.body.deviceType != 'I') {
                /**
                 * INVALID DEVICE TYPE
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_42");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.parameters.deviceType, successOrError.location);
                errorArray.push(resobj)

            }

        }
        if (errorArray.length > 0 && errorFlag == 1) {

            return common.responseModel.failResponse("Errors", {}, errorArray)

        } else {
            var usersDetails = await common.query.create(usersCollection, addUserObject);

            var deviceObject = {
                userId: usersDetails.id,
                deviceType: req.body.deviceType,
                deviceToken: req.body.deviceToken,
                deviceId: req.body.deviceId,
                timeZone: req.body.timeZone,
            }
            var findDeviceData = {
                deviceType: req.body.deviceType,
                deviceToken: req.body.deviceToken,
                deviceId: req.body.deviceId
            }
            var updateDevice = {
                userId: usersDetails.dataValues.id,
                deviceType: req.body.deviceType,
                deviceToken: req.body.deviceToken,
                deviceId: req.body.deviceId
            }
            var findDeviceData = await common.query.findOne(deviceCollection, findDeviceData)
            if (findDeviceData == null) {
                var createDevice = await common.query.create(deviceCollection, deviceObject)
            } else {

                var updateDeviceDetails = await common.query.updateOne(deviceCollection, { id: findDeviceData.dataValues.id }, updateDevice)
                var createDevice = await common.query.findOne(deviceCollection, { id: findDeviceData.dataValues.id })
            }

            if (createDevice) {

                /**
                 * GENERATE JWT TOKEN
                 */
                const token = jwt.sign({ userId: usersDetails.id }, process.env.secretKey)

                /**
                 * SUCCESS RESPONSE
                 */
                var response = await common.response.users.usersObjectRes(usersDetails, token)
                var successOrError = common.responseServices.successOrErrors("successMessage");
                return common.responseModel.successCreateResponse(successOrError.register, response, []);


            } else {

                /**
                 * SOMETHIGN WENT WRONG WHILE REGISTER DEVICE
                 */
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_16");
                var resobj = common.responseModel.resObj(successOrError.code, successOrError.message, successOrError.location);
                errorArray.push(resobj)

            }

        }

    } catch (error) {

        /**
         * CATCH ERROR
         */
        var successOrError = common.responseServices.successOrErrors("ex_00");
        var resobj = common.responseModel.resObj(error.message, successOrError.parameters.noParams, successOrError.location);
        return common.responseModel.failResponse(successOrError.failMsg, {}, resobj)

    }
}
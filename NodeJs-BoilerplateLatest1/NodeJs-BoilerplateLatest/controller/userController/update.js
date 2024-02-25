/**
 * NPM PACKAGE
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const usersCollection = common.db.users;


/**
 * [CREATED BY : PARTH]
 * USER UPDATE DETAILS FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.update = async(req) => {
    try {
        var errorFlag = 0;
        var errorArray = [];
        /**
         * PARAMS ID VALIDATION (REQUIRE)
         */
        if (req.params.id) {

            var decryptId = await common.helpers.decryptData(req.params.id)

            /**
             * DECRYPT ID VALIDATION
             */
            if (decryptId != false) {

                var userListQuery = { id: decryptId }
                var usersDetails = await common.query.findOne(usersCollection, userListQuery);

                var updateusersObject = {};

                if (usersDetails != null) {

                    /**
                     * UPDATE FIRSTNAME THEN CALL THIS CONDITION
                     */
                    if (typeof req.body.firstName != 'undefined' && req.body.firstName != '') {
                        var nameValidation = await common.helpers.nameValidation(req.body.firstName)
                        if (nameValidation == false) {

                            /**
                             * FIRST NAME VALIDATION
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_43");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.firstName, successOrError.location);
                            errorArray.push(resobj)

                        } else {

                            updateusersObject.firstName = req.body.firstName ? req.body.firstName : "";

                        }
                    } else {

                        updateusersObject.firstName = req.body.firstName

                    }

                    /**
                     * UPDATE LASTNAME THEN CALL THIS CONDITION
                     */
                    if (typeof req.body.lastName != 'undefined' && req.body.lastName != '') {
                        var validationLastName = await common.helpers.nameValidation(req.body.lastName)
                        if (validationLastName == false) {

                            /**
                             * FIRST NAME VALIDATION
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_44");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.lastName, successOrError.location);
                            errorArray.push(resobj)
                        } else {

                            updateusersObject.lastName = req.body.lastName ? req.body.lastName : "";

                        }
                    } else {

                        updateusersObject.lastName = req.body.lastName

                    }

                    /**
                     * IF UPDATE USERNAME THEN CALL THIS CONDITION
                     */
                    if (typeof req.body.username != 'undefined' && req.body.username != "") {

                        var findUsername = await common.query.findSome(usersCollection, { username: req.body.username })
                        var filter = findUsername.filter(item => item.dataValues.id != decryptId)

                        if (filter.length != 0) {

                            /**
                             * USERNAME ALREDY EXITS
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_28");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.username, successOrError.location);
                            errorArray.push(resobj);

                        } else {

                            var usernamevalidation = await common.helpers.nameValidation(req.body.username)
                            if (usernamevalidation == false) {
                                /**
                                 * USERNAME VALIDATION
                                 */
                                errorFlag = 1;
                                var successOrError = common.responseServices.successOrErrors("err_48");
                                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.username, successOrError.location);
                                errorArray.push(resobj)

                            } else {

                                updateusersObject.username = req.body.username ? req.body.username : "";

                            }
                        }
                    }

                    /**
                     * UPDATE PASSWORD THEN CALL THIS CONDITION
                     */
                    if (req.body.currentPassword != "" && typeof req.body.currentPassword != 'undefined' && typeof req.body.currentPassword == 'string') {

                        if (req.body.newPassword != "" && typeof req.body.newPassword != 'undefined' && typeof req.body.newPassword == 'string') {

                            if (req.body.confirmPassword != "" && typeof req.body.confirmPassword != 'undefined' && typeof req.body.confirmPassword == 'string') {

                                var comparePassword = await bcrypt.compare(req.body.currentPassword, usersDetails.password)

                                if (comparePassword == false) {

                                    /**
                                     * currentPassword WROND
                                     */
                                    updateusersObject.password = usersDetails.password

                                    errorFlag = 1;
                                    var successOrError = common.responseServices.successOrErrors("err_33");
                                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.currentPassword, successOrError.location);
                                    errorArray.push(resobj);

                                }

                                /**
                                 * CONFIRM PASSWORD VALIDATION
                                 */
                                if (req.body.newPassword != req.body.confirmPassword) {

                                    /**
                                     * CONFIRM PASSWORD OR PASSWORD NOT MATCH
                                     */
                                    updateusersObject.password = usersDetails.password

                                    errorFlag = 1;
                                    var successOrError = common.responseServices.successOrErrors("err_13");
                                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.confirmPassword, successOrError.location);
                                    errorArray.push(resobj)

                                }

                                var strongPassword = await common.helpers.checkPassword(req.body.newPassword);

                                if (strongPassword == true) {

                                    updateusersObject.password = bcrypt.hashSync(req.body.newPassword, salt)

                                } else {

                                    /**
                                     * INVALID PASSWORD(Password should be 8 characters long, including at least one upper case, at least one lower case, at least one special character and at least one digit)
                                     */
                                    updateusersObject.password = usersDetails.password

                                    errorFlag = 1;
                                    var successOrError = common.responseServices.successOrErrors("err_12");
                                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.newPassword, successOrError.location);
                                    errorArray.push(resobj);

                                }


                            } else {

                                /**
                                 * INVALID CONFIRM PASSWORD
                                 */
                                updateusersObject.password = usersDetails.password

                                errorFlag = 1;
                                var successOrError = common.responseServices.successOrErrors("err_37");
                                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.confirmPassword, successOrError.location);
                                errorArray.push(resobj);

                            }

                        } else {

                            updateusersObject.password = usersDetails.password

                            /**
                             * INVALID NEW PASSWORD
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_34");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.newPassword, successOrError.location);
                            errorArray.push(resobj);

                        }

                    }

                    /**
                     * UPDATE EMAIL THEN CALL THIS CONDITION
                     */
                    if (req.body.email != "" && typeof req.body.email != 'undefined' && typeof req.body.email == 'string') {
                        var emailValidation = await common.helpers.validateEmail(req.body.email)
                        var userListQueryemail = { email: req.body.email }
                        var usersDetailss = await common.query.findOne(usersCollection, userListQueryemail);
                        var userdetail;
                        if (usersDetailss == null || usersDetailss.length == 0) {
                            userdetail = []
                        } else {
                            userdetail = [usersDetailss]
                        }
                        var filter = userdetail.filter(item => item.dataValues.id != decryptId)
                        if (filter.length != 0) {

                            /**
                             * EMAIL ALREADY EXITS
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_04");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                            errorArray.push(resobj)

                        } else {
                            if (emailValidation == false) {
                                /**
                                 * INVALID EMAIL 
                                 */
                                errorFlag = 1;
                                var successOrError = common.responseServices.successOrErrors("err_03");
                                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                                errorArray.push(resobj)
                            } else {
                                updateusersObject.email = req.body.email ? req.body.email : usersDetails.dataValues.email;
                            }
                        }
                    }

                    /**
                     * IF UPDATE PHONE NUMBER THEN CALL THIS CONDITION
                     */
                    if (req.body.phone != "" && typeof req.body.phone != 'undefined') {
                        var phoneNum = await common.helpers.checkPhone(req.body.phone)
                        if (phoneNum == false) {

                            /**
                             * INVALID PHOE NUMBER
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_14");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.phone, successOrError.location);
                            errorArray.push(resobj)

                        } else {

                            var findPhone = await common.query.findSome(usersCollection, { phone: req.body.phone })
                            var filter = findPhone.filter(item => item.dataValues.id != decryptId)

                            if (filter.length != 0) {

                                /**
                                 * USERNAME ALREDY EXITS
                                 */
                                errorFlag = 1;
                                var successOrError = common.responseServices.successOrErrors("err_41");
                                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.phone, successOrError.location);
                                errorArray.push(resobj);

                            } else {

                                updateusersObject.phone = req.body.phone ? parseInt(req.body.phone) : "usersDetails.dataValues.phone"

                            }
                        }
                    }

                    /**
                     * IF UPDATE COUNTRY CODE THEN CALL THIS CONDITION
                     */
                    if (req.body.countryCode != "" && typeof req.body.countryCode != 'undefined') {

                        var countryCodeValidation = await common.helpers.countryCodeValidation(req.body.countryCode)

                        if (countryCodeValidation == false) {

                            /**
                             * INVALID COUNTRY CODE 
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_40");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.countryCode, successOrError.location);
                            errorArray.push(resobj)

                        } else {
                            updateusersObject.countryCode = req.body.countryCode ? req.body.countryCode : usersDetails.dataValues.countryCode

                        }
                    }

                    /**
                     * UPDATE DATE OF BIRTH THEN CALL THIS CONDITION
                     */
                    if (typeof req.body.dateOfBirth != 'undefined' && req.body.dateOfBirth != '') {

                        /**
                         * DATE VALIDATION
                         */
                        var validDate = await common.helpers.parseDate(req.body.dateOfBirth)

                        if (validDate == false) {

                            /**
                             * INVALID DATE
                             */
                            updateusersObject.dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : "";


                        } else {


                            var findAge = await common.helpers.getAge(req.body.dateOfBirth)
                            if (findAge <= 18) {

                                /**
                                 * YOU ARE NOT 18 YEAR OLD
                                 */
                                errorFlag = 1;
                                var successOrError = common.responseServices.successOrErrors("err_45");
                                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.date, successOrError.location);
                                errorArray.push(resobj)

                            } else if (isNaN(findAge)) {
                                /**
                                 * INVALID DATE
                                 */
                                errorFlag = 1;
                                var successOrError = common.responseServices.successOrErrors("err_54");
                                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.date, successOrError.location);
                                errorArray.push(resobj)
                            } else {

                                updateusersObject.dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : "";

                            }
                        }

                    } else {
                        updateusersObject.dateOfBirth = req.body.dateOfBirth
                    }

                    /**
                     * UPDATE LATITUDE THEN CALL THIS CONDITION
                     */
                    if (req.body.latitude != "" && typeof req.body.latitude != 'undefined') {
                        var latitudeValidation = common.helpers.latLong(req.body.latitude);
                        if (latitudeValidation == false) {
                            /**
                             * LATITUDE INVALID
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_52");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.latitude, successOrError.location);
                            errorArray.push(resobj)
                        }

                        if (latitudeValidation == true) {
                            updateusersObject.latitude = req.body.latitude ? req.body.latitude : usersDetails.dataValues.latitude;
                        }
                    }
                    /**
                     * UPDATE LONGITUDE THEN CALL THIS CONDITION
                     */
                    if ((req.body.longitude != "" && typeof req.body.longitude != 'undefined')) {
                        var longitudeValidation = common.helpers.latLong(req.body.longitude)
                        if (longitudeValidation == false) {
                            /**
                             * LONGITUDE INVALID
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_53");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.longitude, successOrError.location);
                            errorArray.push(resobj)
                        }

                        if (longitudeValidation == true) {

                            updateusersObject.longitude = req.body.longitude ? req.body.longitude : usersDetails.dataValues.longitude;

                        }
                    }
                    /**
                     * IF UPDATE PROFILE IMAGE THEN CALL THIS CONDITION 
                     */
                    if (req.files != null && req.files != undefined) {
                        var bytes = (req.files.profile.size / 1048576).toFixed(2)
                        if (bytes >= 5) {
                            /**
                             * INVALID PROFILE PICTURE MAXIMUM FILE SIZE IS 5 MB
                             */
                            errorFlag = 1;
                            var successOrError = common.responseServices.successOrErrors("err_46");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.profile, successOrError.location);
                            errorArray.push(resobj)
                        }
                        var usersProfilePath = `${process.env.userProfilePath}`
                        var profile = await common.helpers.img(req.files.profile, usersProfilePath)
                        var usersProfilePath = `${process.env.userProfilePath}`
                        var deleteImg = await common.helpers.destroyImg(usersDetails.dataValues.profile, usersProfilePath)
                        if (deleteImg != true) {

                            /**
                             * SOME THING WENT WRONG WHILE UPDATE PROFILE PICTURE
                             */
                            errorFlag = 1
                            var successOrError = common.responseServices.successOrErrors("err_72");
                            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.profile, successOrError.location);
                            errorArray.push(resobj);
                        } else {

                            updateusersObject.profile = req.files.profile ? profile : usersDetails.dataValues.profile;

                        }

                    }

                    if (req.body.profile == "") {
                        var findImg = await common.query.findOne(usersCollection, userListQuery)
                        if (findImg != null) {
                            if (findImg.dataValues.profile != "") {
                                updateusersObject.profile = req.body.profile ? req.body.profile : "";
                                var usersProfilePath = `${process.env.userProfilePath}`
                                var deleteImg = await common.helpers.destroyImg(findImg.dataValues.profile, usersProfilePath)
                                if (deleteImg != true) {

                                    /**
                                     * SOME THING WENT WRONG WHILE UPDATE PROFILE PICTURE
                                     */
                                    errorFlag = 1
                                    var successOrError = common.responseServices.successOrErrors("err_72");
                                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.profile, successOrError.location);
                                    errorArray.push(resobj);
                                }
                            }
                        }
                    }

                    updateusersObject.address = req.body.address ? req.body.address : "";
                    updateusersObject.isNotification = req.body.isNotification == "0" || req.body.isNotification == "1" ? req.body.isNotification : usersDetails.dataValues.isNotification;


                } else {
                    /**
                     * INVALID USER ID (PARAMS)
                     */
                    errorFlag = 1;
                    var successOrError = common.responseServices.successOrErrors("err_19");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
                    errorArray.push(resobj);

                }

            } else {
                /**
                 * INVALID USER ID
                 */
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_32");
                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
                errorArray.push(resobj);

            }
        } else {
            /**
             * INVALID USER ID
             */
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_32");
            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
            errorArray.push(resobj);

        }
        if (errorArray.length > 0 && errorFlag == 1) {
            return common.responseModel.failResponse("Errors", {}, errorArray)

        } else {

            var isUserUpdated = await common.query.updateOne(usersCollection, userListQuery, updateusersObject);
            if (isUserUpdated == 0) {
                /**
                 * SOME THING WENT WRONG WHIL UPDATE USER
                 */
                errorFlag = 1;
                var successOrError = await common.responseServices.successOrErrors("err_29");
                var resobj = common.responseModel.resObj(successOrError.message, successOrError.location);
                errorArray.push(resobj);

            }
            /**
             * SUCCESS RESPONSE
             */
            var usersDetails = await common.query.findOne(usersCollection, userListQuery);
            var response = await common.response.users.usersObjectRes(usersDetails)
            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successResponse(successOrError.update, response, []);
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
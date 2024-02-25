/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABA
 */
const usersCollection = common.db.users;

/**
 * [CREATED BY : PARTH]
 * FIND BY USER ID FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.findById = async(req) => {
    try {
        var errorArray = [];
        var errorFlag = 0
        if (req.params.id != "" && typeof req.params.id != 'undefined') {

            var decryptId = await common.helpers.decryptData(req.params.id)

            /**
             * IF USER IS IS VALID THEN CALL THIS CONDITION 
             */
            if (decryptId != false) {

                var userListQuery = { id: decryptId }
                var usersDetails = await common.query.findOne(usersCollection, userListQuery);

                if (usersDetails == null) {

                    /**
                     * USER NOT FOUND 
                     */
                    errorFlag = 1;
                    var successOrError = common.responseServices.successOrErrors("err_19");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
                    errorArray.push(resobj)

                }

            } else {

                /**
                 * INVALID USER ID
                 */
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_32");
                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
                errorArray.push(resobj)

            }

        } else {

            /**
             * INVALID USER ID
             */
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_32");
            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
            errorArray.push(resobj)

        }

        if (errorArray.length >= 0 && errorFlag == 1) {

            return common.responseModel.failResponse("Errors", {}, errorArray)

        } else {

            /**
             * SUCCESS RESPONSE
             */
            var response = await common.response.users.usersObjectRes(usersDetails)
            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successGetResponse(successOrError.get, response, []);

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
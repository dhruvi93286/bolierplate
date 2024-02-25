/**
 * HELPERS
 */
var common = require('../common');

/**
 * DATABASE
 */
const usersCollection = common.db.users;
const deviceCollection = common.db.device;
const notificationUsersCollection = common.db.notificationUsers;
const followCollection = common.db.follows;
const likeCollection = common.db.likes;


/**
 * [CREATED BY : PARTH]
 * DELETE USER FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.delete = async(req) => {
    try {
        var errorFlag = 0;
        var errorArray = [];
        if (req.params.id != "" && typeof req.params.id != 'undefined') {

            var decryptRes = await common.helpers.decryptData(req.params.id);
            if (decryptRes != false) {

                var userListQuery = { id: parseInt(decryptRes) }
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
                errorFlag = 1
                var successOrError = common.responseServices.successOrErrors("err_32");
                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
                errorArray.push(resobj)

            }

        } else {

            /**
             * INVALID USER ID
             */
            errorFlag = 1
            var successOrError = common.responseServices.successOrErrors("err_32");
            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
            errorArray.push(resobj)

        }
        if (errorArray.length >= 0 && errorFlag == 1) {
            return common.responseModel.failResponse("Errors", {}, errorArray)
        } else {

            var findLike = await common.query.findSome(likeCollection, { usersId: decryptRes })
            if (findLike.length != 0) {
                var removeLike = await common.query.deleteMany(likeCollection, { "usersId": decryptRes })
            }
            var findFollowUser = await common.query.findSome(followCollection, { "followerId": decryptRes, "userId": decryptRes })
            if (findFollowUser.length != 0) {
                var removeFollower = await common.query.deleteMany(followCollection, { where: { "followerId": decryptRes, "userId": decryptRes } })
            }

            var removeNotification = await common.query.deleteMany(notificationUsersCollection, { where: { "userId": decryptRes } })
            var removeDevice = await common.query.deleteMany(deviceCollection, { where: { "userId": decryptRes } })
            var isRemoved = await common.query.remove(usersCollection, userListQuery);
            if (isRemoved == 1 && removeDevice != 0) {
                var usersProfilePath = `${process.env.userProfilePath}`
                var deleteImg = await common.helpers.destroyImg(usersDetails.dataValues.profile, usersProfilePath)
                if (deleteImg != true) {
                    /**
                     * SOME THING WENT WRONG WHILE UPDATE PROFILE PICTURE
                     */
                    errorFlag = 1
                    var successOrError = common.responseServices.successOrErrors("err_72");
                    var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.profile, successOrError.location);
                    return common.responseModel.failResponse(successOrError.failMsg, {}, resobj)

                } else {
                    /**
                     * SUCCESS RESPONSE
                     */
                    var response = await common.response.users.usersObjectRes(usersDetails)
                    var successOrError = common.responseServices.successOrErrors("successMessage");
                    return common.responseModel.successResponse(successOrError.delete, response, []);
                }

            }
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
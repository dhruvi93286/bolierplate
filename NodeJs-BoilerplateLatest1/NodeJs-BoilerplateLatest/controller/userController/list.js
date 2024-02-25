/**
 * HELPERS
 */
var common = require('../common')

/**
 * DATABASE
 */
const usersCollection = common.db.users;
const Op = common.db.Sequelize.Op;

/**
 * [CREATED BY : PARTH]
 * FIND USERS LIST FUNCATION
 * @param {Object} req 
 * @returns Object
 */
module.exports.findAll = async(req) => {
    try {
        var errorFlag = 0;
        var errorArray = [];
        /**
         * PARAMS LIMIT 
         */
        var limit = req.query.limit;
        if (!limit || limit == 0) {

            limit = 10;

        } else {

            limit = parseInt(req.query.limit)

        }
        /**
         * PARAMS PAGE 
         */
        var page = req.query.page;
        if (!page || page == 0) {

            page = 1

        } else {

            page = parseInt(req.query.page)

        }
        const offset = (page - 1) * limit

        /**
         * PARAMS SEARCH
         */
        var search = {};

        if (req.query.search) {
            search = {
                [Op.or]: [{
                        email: {
                            [Op.like]: '%' + req.query.search + '%'
                        }
                    },
                    {
                        firstName: {
                            [Op.like]: '%' + req.query.search + '%'

                        }
                    },
                    {
                        username: {
                            [Op.like]: '%' + req.query.search + '%'

                        }
                    },
                    {
                        lastName: {
                            [Op.like]: '%' + req.query.search + '%'

                        },
                    },
                    {
                        phone: {
                            [Op.like]: '%' + req.query.search + '%'

                        },
                    }
                ]

            }

        }

        /**
         * PARAMS SORT
         */
        var sort = {}
        if (req.query.sort == -1 || req.query.sort == 1) {
            if (req.query.sort == -1) {
                sort = ['createdAt', 'DESC']
            }
            if (req.query.sort == 1) {
                sort = ['createdAt', 'ASC']
            }
        } else {
            sort = ['createdAt', 'ASC']
        }

        var usersTotalList = await usersCollection.findAll({

            where: search,
            order: [sort],
            limit: limit,
            offset: offset,

        })
        if (usersTotalList[0] == null) {
            /**
             * NOT FOUND USER DETAILS
             */
            errorFlag = 1;
            var successOrError = common.responseServices.successOrErrors("err_00");
            var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.page, successOrError.location);
            errorArray.push(resobj)
        } else {

            var userList = await common.query.findSome(usersCollection, search);

            var TotalPage = Math.ceil(userList.length / limit)
            var dataArray = [];

            for (let i = 0; i < usersTotalList.length; i++) {

                var response = await common.response.users.usersObjectRes(usersTotalList[i])
                dataArray.push(response)

            }
            var nextPage = 0;

            if (page < TotalPage) {

                nextPage++;

            } else {

                if (req.query.page == '0' || req.query.page == '' || page < TotalPage) {

                    nextPage++;

                } else {

                    nextPage = 0;

                }
            }
            var previous = 0;
            if (req.query.page <= TotalPage && req.query.page != '1' && req.query.page != '0' && req.query.page != '') {

                previous++;

            } else {

                previous = 0;

            }
            /**
             * PAGINATION FIELDS
             */
            pagination = {
                "previousPage": previous,
                "currentPage": page,
                "nextPage": nextPage,
                "totalCount": userList.length,
                "perPage": usersTotalList.length,
                "totalPage": TotalPage
            }

            if (TotalPage < req.query.page) {
                /**
                 * USERS DETAILS NOT FOUND
                 */
                errorFlag = 1;
                var successOrError = common.responseServices.successOrErrors("err_00");
                var resobj = common.responseModel.resObj(successOrError.message, successOrError.parameters.page, successOrError.location);
                errorArray.push(resobj)

            }

        }

        if (errorArray.length >= 0 && errorFlag == 1) {

            return common.responseModel.failResponse("Errors", [], errorArray)

        } else {

            /**
             * SUCCESS RESPONSE
             */
            var successOrError = common.responseServices.successOrErrors("successMessage");
            return common.responseModel.successGetResponse(successOrError.getall, dataArray, [], pagination);

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
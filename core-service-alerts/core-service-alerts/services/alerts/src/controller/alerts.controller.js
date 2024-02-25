/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */
const common = require('common-module')
const alertsService = require('../services/alerts.services');
const APIResponse = require('../../../../utils/helpers/APIResponse');
const colors = common.colors;
const logger = require('../../../../Logger');
const alertAssignService = require('../services/alertsAssign.services');
const paginationRes = require('../../../../utils/helpers/paginationHelper');

class alertsController {
  async createalerts(req, res) {
    const data = await alertsService.createalerts(req.body);
    if (data !== null) {
      logger.info(`status code: ${common.httpStatus.OK} messages: alerts create API call`, data);
      // console.log("Alerts Data Create API".green, data);
      logger.info(`status code: ${common.httpStatus.OK} messages:alerts created successfully`, data);
      return res.status(common.httpStatus.OK).json(new APIResponse('alerts created successfully', true, 200, data));
    }
    else {
      return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse('alerts data does not created', false, 400));
    }
  }

  async getalerts(req, res) {
    const data = await alertsService.getalerts();
    if (data) {
      logger.info(`status code: ${common.httpStatus.OK} messages: alerts Get API call`, data);
      console.log("Alerts Data Get API".green, data);
      logger.info(`status code: ${common.httpStatus.OK} messages:alerts Get successfully`, data);
      return res.status(common.httpStatus.OK).json(new APIResponse('alerts get successfully', true, 200, data));
    }
    else {
      return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse('alerts data does not Get', false, 400));
    }
  }

  async getalertsById(req, res) {
    const data = await alertsService.getalertsById(req.params.id);
    if (data) {
      logger.info(`status code: ${common.httpStatus.OK} messages: alerts Get API call`, data);
      console.log("Alerts Data GetById API".green, data);
      logger.info(`status code: ${common.httpStatus.OK} messages:alerts Get successfully`, data);
      return res.status(common.httpStatus.OK).json(new APIResponse('alerts get successfully', true, 200, data));
    }
    else {
      return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse('alerts data does not GetById', false, 404));
    }
  }

  async getAlertsByTitle(req, res) {
    try {
      const getDataByTitle = await alertsService.findByTitle(req.query.title)
      return res.status(common.httpStatus.OK).json(new APIResponse('Get alerts by alert title successfully', true, 200, getDataByTitle));
    } catch (error) {
      console.log("------ catch error ----------", error
      );
    }
  }

  async updatealerts(req, res) {
    const data = await alertsService.updatealerts(req.params.id, req.body);
    if (data) {
      logger.info(`status code: ${common.httpStatus.OK} messages: alerts Update API call`, data);
      console.log("Alerts Data Update API".green, data);
      logger.info(`status code: ${common.httpStatus.OK} messages:alerts Update successfully`, data);
      return res.status(common.httpStatus.OK).json(new APIResponse('alerts updated successfully', true, 200, data));
    } else {
      return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse('alerts data does not Update', false, 404));
    }
  }

  async deletealerts(req, res) {
    const data = await alertsService.deletealerts(req.params.id);
    if (data) {
      logger.info(`status code: ${common.httpStatus.OK} messages: alerts Delete API call`, data);
      console.log("Alerts Data Delete API".yellow, data);
      logger.info(`status code: ${common.httpStatus.OK} messages:alerts Delete successfully`, data);
      return res.status(common.httpStatus.OK).json(new APIResponse('alerts delete successfully', true, 200, data));
    } else {
      return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse('alerts data does not Delete', false, 400));
    }
  }

  async getAlertByPagination(req, res) {
    try {
      var limit = req.query.limit;
      if (!limit || limit == 0) {
        limit = 10;
      } else {
        limit = parseInt(req.query.limit)
      }
      /**
       * PARAMS PAGE VALIDATION
       */
      var page = req.query.page;
      if (!page || page == 0) {

        page = 1

      } else {

        page = parseInt(req.query.page)

      }
      const offset = (page - 1) * limit
      var search = {};

      var sort = {}
      if (req.query.sort == -1 || req.query.sort == 1) {
        if (req.query.sort == -1) {
          sort = { 'is_Assign': 'DESC' }
        }
        if (req.query.sort == 1) {
          sort = { 'is_Assign': 'ASC' }
        }
      } else {
        sort = { 'is_Assign': 'ASC' }
      }
      var findAlert = await alertsService.getAlertsByPagination(req.query.search, sort, limit, offset);
      logger.info(`status code: ${common.httpStatus.OK} messages: alerts get By pagination API call`, findAlert);
      var alertSearchList = await alertsService.getAlertSearchList(search);
      logger.info(`status code: ${common.httpStatus.OK} messages: alerts searchlist  API call`, alertSearchList);
      var TotalPage = Math.ceil(alertSearchList.length / limit)
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
      var pagination = {
        "previous_page": previous,
        "current_page": page,
        "next_page": nextPage,
        "total_count": alertSearchList.length,
        "per_page": findAlert.length,
        "total_page": TotalPage
      }

      if (TotalPage < req.query.page) {
        /**
         * USERS DETAILS NOT FOUND
         */
        return res.status(common.httpStatus.OK).json(new APIResponse('Alerts list not found', false, 401, []));
      } else if (findAlert.length > 0) {
        /**
         * SUCCESS RESPONSE
         */
        var findAssignAlert = await alertAssignService.findAllByAlertId(req.params.id)
        return res.status(common.httpStatus.OK).json(new paginationRes('Alerts list get successfully', true, 200, findAssignAlert, pagination));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new alertsController();

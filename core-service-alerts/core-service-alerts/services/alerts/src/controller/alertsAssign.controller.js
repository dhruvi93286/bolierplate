/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */
const common = require('common-module')
const mongoose = require('mongoose');
const alertsService = require('../services/alerts.services');
const alertsAssignService = require('../services//alertsAssign.services');
const APIResponse = require('../../../../utils/helpers/APIResponse');
const colors = common.colors;
const RABBITMQ = process.env.RABBITMQ || 'amqp://rabbitmq';
const publishToQueue = require('../../../../rabbitMQ/index');

const opt = { credentials: common.amqplib.credentials.plain('myuser', 'mypassword') };
const logger = require('../../../../Logger');

common.amqplib.connect(RABBITMQ, opt).then(function (conn) {
  process.once('SIGINT', function () { conn.close(); });
  return conn.createChannel().then(function (ch) {
    var ok = ch.assertQueue('alerts_locations_assigns', { durable: true, autoDelete: true });
    ch.consume('alerts_locations_assigns', async function (msg) {
      logger.info(`rabbitmq messages listener ${msg.content.toString()}`)
      console.log(" [x] Received '%s'", msg.content.toString());
      const Alerts = msg.content.toString();
      const alertsdata = JSON.parse(Alerts);
      let data, Alertsupdatedata, AlertsData;
      const alerts = await alertsAssignService.GetAlerts(alertsdata.title).then(async (data1) => {
        logger.info(`messages:Alert Data find in Alerts Table ${data1} `);
        const alertsdatas = {
          "locationId": alertsdata.locationId,
          "alertsId": data1
        }
        const data = await alertsAssignService.updatealerts(alertsdata.locationId, alertsdatas);
        logger.info(`AlertsAssign Data created ${data}`);
        Alertsupdatedata = await alertsAssignService.updatedAlerts(alertsdata.locationId, alertsdatas);
        logger.info(`AlertsAssign data Updated ${Alertsupdatedata}`);
        AlertsData = await alertsAssignService.getallalerts(alertsdata.locationId).then((data) => {
          logger.info(`AlertsAssign all the Data find `, data);
          logger.info(`Publish the rabbitmq Messagess ${data}`);
          var q = 'alerts_location_assign';
          logger.info(`Publish the rabbitmq Messagess ${data}`);
          publishToQueue(q, data);
        });
      });

    }, { autoAck: true });
  });
});

class alertsAssignController {
  async Assignalerts(req, res) {
    try {
      let checkArray = Array.isArray(req.body.alertsId);
      var data = [];
      if (checkArray) {
        for (let i = 0; i < req.body.alertsId.length; i++) {
          const assignAlert = {
            "locationId": req.body.locationId,
            "patientId": req.body.patientId,
            "title": req.body.title,
            "action": req.body.action,
            "actionstatus": req.body.actionstatus,
            "sender": req.body.sender,
            "alertsId": req.body.alertsId[i],
            "event": req.body.event,
          }
          const createAssign = await alertsAssignService.createalerts(assignAlert);
          logger.info(`status code: ${common.httpStatus.OK} messages: alerts Assign API call`, createAssign);
          if (createAssign !== null) {
            const alertAssignDetails = await alertsAssignService.getAssignAlertById(createAssign._id)
            logger.info(`status code: ${common.httpStatus.OK} messages: alerts Assign API call`, createAssign);
            if (alertAssignDetails !== null) {
              const returnObject = {
                locationId: alertAssignDetails.locationId,
                alertsId: alertAssignDetails.alertsId._id,
                ledId: alertAssignDetails.alertsId.ledId,
                is_Assign: alertAssignDetails.is_Assign
              }
              data.push(createAssign)
              var q = 'create_alerts';
              logger.info(`Publish the rabbitmq Messagess ${data}`);
              publishToQueue(q, returnObject);
            }
          } else {
            return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse('Alerts data not found', false, 401));
          }
        }
      } else {
        data = await alertsAssignService.createalerts(req.body)
        const alertAssignDetails = await alertsAssignService.getAssignAlertById(data._id);
        console.log("-------------", alertAssignDetails);
        if (alertAssignDetails != null) {
          const returnObject = {
            locationId: alertAssignDetails.locationId,
            alertsId: alertAssignDetails.alertsId._id,
            ledId: alertAssignDetails.alertsId.ledId,
            is_Assign: alertAssignDetails.is_Assign
          }
          if (returnObject) {
            var q = 'create_alerts';
            logger.info(`Publish the rabbitmq Messagess ${data}`);
            publishToQueue(q, returnObject);
          }
        }
      }
      let checkDataArray = Array.isArray(data);
      var getalerts, findAssignData;
      var assignData = []
      if (checkDataArray) {
        getalerts = await alertsAssignService.getalerts(data[0].locationId);
        for (let i = 0; i < data.length; i++) {
          assignData.push(await alertsAssignService.getAssignAlertById(data[i]._id))
        }
      } else {
        getalerts = await alertsAssignService.getalerts(data.locationId);
        assignData.push(await alertsAssignService.getAssignAlertById(data._id))
      }
      logger.info(`status code: ${common.httpStatus.OK} messages:Get all the AlertsAssign data ${getalerts}`);
      // console.log("data--------------->",data);
      res.status(common.httpStatus.OK).json(new APIResponse('alerts updated successfully', true, 200, getalerts));
      logger.info(`Publish the rabbitmq Messagess ${getalerts}`);
      if (getalerts) {
        var q = 'alerts_location_assign';
        logger.info(`Publish the rabbitmq Messagess ${data}`);
        publishToQueue(q, getalerts);
        var q = 'alerts_assign_msg';
        publishToQueue(q, assignData);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // alertsAssign

  async alertsAssign(req, res) {
    const data = await alertsService.findByTitle(req.query.title);
    const assignAlert = {
      "locationId": req.body.locationId,
      "title": data.alertTitle,
      "alertsId": data._id,
    }
    const Assigndata = await alertsAssignService.createalerts(assignAlert)
    return res.status(common.httpStatus.OK).json(new APIResponse('alerts get successfully', true, 200, Assigndata));
  }
  // alertsUnAssign
  async alertsUnAssign(req, res) {
    const Assigndata = await alertsAssignService.alertsUnAssign(req.query.title)
    return res.status(common.httpStatus.OK).json(new APIResponse('alerts get successfully', true, 200, Assigndata));
  }
  async getAssignalerts(req, res) {
    if (req.params.id) {
      const data = await alertsAssignService.getallalerts(req.params.id);
      logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign get API call ${data}`);
      logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign get successfully ${data}`);
      return res.status(common.httpStatus.OK).json(new APIResponse('alerts get successfully', true, 200, data));
    }
    else {
      return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse('alertsAssign Data not found', false, 404));
    }

  }
  // getAssignalertsId
  async getAssignalertsId(req, res) {
    if (req.params.id) {
      const data = await alertsAssignService.getallalerts(req.params.id);
      logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign get API call ${data}`);
      logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign get successfully ${data}`);
      return res.status(common.httpStatus.OK).json(new APIResponse('alerts get successfully', true, 200, data));
    }
    else {
      return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse('alertsAssign Data not found', false, 404));
    }

  }
  async getAllAssignalerts(req, res) {
    if (req.params.id) {
      const data = await alertsAssignService.getallalerts(req.params.id);
      logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign get API call ${data}`);
      logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign get successfully ${data}`);
      return res.status(common.httpStatus.OK).json(new APIResponse('alerts get successfully', true, 200, data));
    }
    else {
      return res.status(common.httpStatus.NOT_FOUND).json(new APIResponse('alertsAssign Data not found', false, 404));
    }
  }

  async unassignAlert(req, res) {
    try {
      const unassignUpdate = await alertsAssignService.updateAssign(req.params.id);
      if (unassignUpdate) {
        const getalerts = await alertsAssignService.getAssignAlertById(req.params.id);
        logger.info(`status code: ${common.httpStatus.OK} messages:Get all the AlertsUnAssign data ${getalerts}`)
        res.status(common.httpStatus.OK).json(new APIResponse('alerts unassign successfully', true, 200, getalerts));
        logger.info(`status code: ${common.httpStatus.OK} messages:alertsUnAssign get API call ${getalerts}`);
        logger.info(`status code: ${common.httpStatus.OK} messages:alertsUnAssign get successfully ${getalerts}`);
        const returnObject = {
          locationId: getalerts.locationId,
          alertsId: getalerts.alertsId._id,
          ledId: getalerts.alertsId.ledId,
          is_Assign: getalerts.is_Assign
        }
        var q = 'create_alerts';
        logger.info(`Publish the rabbitmq Messagess ${data}`);
        publishToQueue(q, returnObject);

      }
    } catch (error) {
    }
  }

  async createAlertsAssign(req, res) {
    try {
      var findUpdateData
      if (req.body.alertStatus == "ACTIVE") {
        const findAlertData = await alertsAssignService.findByTitle(req.body.alertTitle)
        logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign getByTitle API call ${findAlertData}`);
        logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign getByTitle successfully ${findAlertData}`);
        const alertAssignObject = {
          "locationId": req.body.locationId,
          "alertsId": findAlertData._id,
          "title": req.body.alertTitle,
          "sender": req.body.sender,
          "is_Assign": true
        }
        findUpdateData = await alertsAssignService.createAlertAssign(alertAssignObject)
        logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign create API call ${findUpdateData}`);
      } else if (req.body.alertStatus == "CANCLE") {
        const findAlertData = await alertsAssignService.getByTitle(req.body.alertTitle)
        logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign getByTitle API call ${findAlertData}`);
        await alertsAssignService.updateAssign(findAlertData._id)
        findUpdateData = await alertsAssignService.getAssignAlertById(findAlertData._id)
        logger.info(`status code: ${common.httpStatus.OK} messages:alertsAssign getById API call ${findUpdateData}`);
      }
      return res.status(common.httpStatus.OK).json(new APIResponse('alerts assign create successfully', true, 200, findUpdateData));
    } catch (error) {
      console.log("----------- catch error-----------", error);
    }
  }
}

module.exports = new alertsAssignController();

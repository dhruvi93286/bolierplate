const mongoose = require('mongoose');
const alerts = mongoose.model('Alerts');
const alertsAssign = mongoose.model('AlertsAssign');
class alertsService {

  // createalerts

  static async createalerts(data) {
    return alertsAssign.create(data);
  }

  static async updatealerts(location, alertsdatas) {
    const data = await alertsAssign.findOne(
      { "locationId": location }
    );
    if (data === null) {
      return await alertsAssign.create(alertsdatas, { new: true, runValidators: false });
    }
  }

  static async GetAlerts(data) {
    return alerts.find({ "alertTitle": data }, { _id: 0 });
  }

  static async getalerts(locationId) {
    return alertsAssign.find({
      "locationId": locationId,
      is_Assign: true
    }).select('locationId').select('title').select('alertsId').select('is_Assign').select('event')
      .populate({
        path: 'alertsId',
        model: 'Alerts',
        select: 'alertBackgroundColor  alertMessage alertIsOverlay  createdAt alertPriority alertForegroundColor alertTitle -_id'
      })
  }


  static async updatedAlerts(location, data) {
    const alertsId = data.alertsId[0];
    return alertsAssign.updateOne(
      { "locationId": location },
      {
        $addToSet: {
          alertsId
        }
      });
  }
  static async getallalerts(alertsId) {
    return alertsAssign.find({ "alertsId": alertsId });
  }

  static async updateAssign(id) {
    return alertsAssign.updateOne({ alertsId: id, is_Assign: true }, { is_Assign: false })
  }

  static async alertsUnAssign(title) {
    return alertsAssign.updateOne({ title: title, is_Assign: true }, { is_Assign: false })
  }
  static async getAssignAlertById(id) {
    return alertsAssign.findOne({ _id: id }).select('title')
      .populate({
        path: 'alertsId', model: 'Alerts', select: 'alertBackgroundColor  alertMessage alertIsOverlay  createdAt alertPriority alertForegroundColor alertTitle -_id'
      })
  }
  static async getByTitle(title) {
    return alertsAssign.findOne({ title: title, is_Assign: true })
  }

  static async createAlertAssign(data) {
    return alertsAssign.create(data)
  }

  static async findAllByAlertId(Id) {
    return alertsAssign.find({
      locationId: Id
    })
  }

}

module.exports = alertsService;

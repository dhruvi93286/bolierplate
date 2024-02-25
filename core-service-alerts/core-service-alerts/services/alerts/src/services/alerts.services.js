const mongoose = require('mongoose')
const alerts = mongoose.model('Alerts');
class alertsService {
  static async createalerts(data) {
    return alerts.create(data);
  }

  static async getalerts() {
    return alerts.find().select('alertBackgroundColor').select('alertForegroundColor').select('alertIsOverlay')
      .select('alertMessage').select('alertPriority').select('alertTitle')
      ;
  }

  static async getalertsById(id) {
    return alerts.findOne({ _id: id }).select('alertBackgroundColor').select('alertForegroundColor').select('alertIsOverlay')
      .select('alertMessage').select('alertPriority').select('alertTitle');
  }

  static async updatealerts(id, data) {
    return alerts.findByIdAndUpdate(id, data).select('alertBackgroundColor').select('alertForegroundColor').select('alertIsOverlay')
      .select('alertMessage').select('alertPriority').select('alertTitle');
  }

  static async deletealerts(id) {
    return alerts.deleteById(id);
  }
  static async createAlert(data) {
    return alerts.findOneAndUpdate({ alertTitle: data.alertTitle }, data)
  }
  static async findByTitle(title) {
    return alerts.findOne({ alertTitle: title })
  }
}

module.exports = alertsService;

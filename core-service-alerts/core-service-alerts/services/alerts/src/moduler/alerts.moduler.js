const mongoose = require('mongoose')
const logger = require('../../../../Logger');
const { Schema } = mongoose;
logger.info("Alerts Table schema created successfully");
const alertsSchema = new Schema({
  alertBackgroundColor: { type: String },
  alertForegroundColor: { type: String },
  alertIsOverlay: { type: String },
  alertMessage: { type: String },
  alertCreatedAt: { type: String },
  alertPriority: { type: Number },
  alertSender: { type: String },
  alertTitle: { type: String },
  iconurl: { type: String },
  ledId: { type: String },
  isAudio: { type: String },
}, {
  timestamps: true,
});

module.exports = alertsSchema;

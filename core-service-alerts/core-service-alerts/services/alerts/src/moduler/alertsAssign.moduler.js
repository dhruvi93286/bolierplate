const mongoose = require('mongoose');
const logger = require("../../../../Logger");
const { Schema } = mongoose;
logger.info("AlertsAssign Table schema created successfully");
const alertsAssignSchema = new Schema({
  locationId: { type: Number },
  title: { type: String },
  action: { type: String },
  actionstatus: { type: String },
  sender: { type: String },
  alertsId: { type: Schema.Types.ObjectId, ref: 'Alerts' },
  is_Assign: { type: Boolean, default: true },
  event: { type: String, trim: true },
  time: { type: Date, default: Date.now }
}, {
  timestamps: true,
}, { _id: false });

module.exports = alertsAssignSchema;

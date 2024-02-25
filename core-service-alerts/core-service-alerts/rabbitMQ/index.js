#!/usr/bin/env node
const common = require('common-module')
var ok;
var msg
var q, ch;
const logger = require("../Logger");
require("dotenv").config({ path: './../.env' });
const RABBITMQ = process.env.RABBITMQ || 'amqp://rabbitmq';
const opt = { credentials: common.amqplib.credentials.plain('myuser', 'mypassword') };
common.amqplib.connect(RABBITMQ, opt).then(function (conn) {
  logger.info("rabbitmq connection Successfully");
  return common.when(conn.createChannel().then(function (channel) {
    ch = channel
    ok = channel.assertQueue(q, { durable: true, autoDelete: true });
  }));
}).then(null, console.warn);

module.exports = publishToQueue = async (queueName, data) => {
  logger.info(`messages:rabbitmq messages publisher QueueName:${queueName} Data:${data}`);
  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true }, (err) => {
    if (err) die(err);
  });
  console.log(" [x] Sent '%s'", JSON.stringify(msg));
}


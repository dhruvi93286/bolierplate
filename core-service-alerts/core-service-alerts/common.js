const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const http = require('http');
const amqplib = require('amqplib');
const axios = require('axios');
const chai = require('chai');
const chaiHttp = require('chai-http');
const httpStatus = require('http-status');
const joi = require('joi');
const when = require('when');
const winston = require('winston');
const winstonMongodb = require('winston-mongodb');
const keycloakConnect = require('keycloak-connect');
const router = require("express").Router();
const server = require('http').createServer(app);
const colors = require('colors');
const qs = require('qs');
const fs = require('fs');
const etl = require('etl');
const crypto = require('crypto');
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


module.exports = {
  express,  amqplib, axios, chai, chaiHttp, httpStatus, joi, when,  winston, winstonMongodb, keycloakConnect, app, router, server, colors,
  cors, qs,  fs, etl, crypto,
  dotenv,
  expressSession,
  http
};
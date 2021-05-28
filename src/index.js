'use strict'

const config      = require('config')
const { Service } = require('@kravc/dos')

const URL = config.get('url')
const api = [
  require('src/api/Devices/ValidateDeviceToken')
]

const service = new Service(api, URL)

module.exports = service

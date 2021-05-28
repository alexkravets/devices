'use strict'

const service = require('./src')

exports.handler = async (request) => {
  const result = await service.handler(request)
  return result
}

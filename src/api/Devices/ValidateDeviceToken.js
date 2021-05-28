'use strict'

const config          = require('config')
const { sign }        = require('jsonwebtoken')
const { v4: uuid }    = require('uuid')
const { Operation }   = require('@kravc/dos')
const { httpRequest } = require('@kravc/request')

const kid = config.get('keyId')
const iss = config.get('teamId')
const url = config.get('validateUrl')
const privateKey = config.get('privateKey')

class ValidateDeviceToken extends Operation {
  static get tags() {
    return [ 'Devices' ]
  }

  static get summary() {
    return 'Validate device token'
  }

  static get type() {
    return Operation.types.CREATE
  }

  static get mutation() {
    return {
      deviceToken: {
        required: true
      }
    }
  }

  static get output() {
    return {
      data: {
        properties: {
          isValid: {
            type:     'boolean',
            required: true
          },
          errorMessage: {
          }
        },
        required: true
      }
    }
  }

  async action(parameters) {
    const { deviceToken } = parameters.mutation

    const [ isValid, errorMessage ] = await this._validateDeviceToken(deviceToken)

    return {
      data: {
        isValid,
        errorMessage
      }
    }
  }

  async _validateDeviceToken(deviceToken) {
    const algorithm     = 'ES256'
    const accessToken   = sign({ iss }, privateKey, { algorithm, header: { kid } })
    const Authorization = `Bearer ${accessToken}`

    const options = {
      url,
      method:  'POST',
      headers: { Authorization },
      body: JSON.stringify({
        timestamp:      Date.now(),
        device_token:   deviceToken,
        transaction_id: uuid()
      })
    }

    const { statusCode, body: buffer } = await httpRequest(console, options)
    const isOk = statusCode === 200

    if (!isOk) {
      const message = buffer.toString()
      return [ false, message ]
    }

    return [ true ]
  }
}

module.exports = ValidateDeviceToken

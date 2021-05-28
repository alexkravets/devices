'use strict'

const nock       = require('nock')
const service    = require('src')
const { test }   = require('@kravc/dos')
const { expect } = require('chai')

const exec = test.execute(service)

describe('ValidateDeviceToken', () => {
  it('validates device token', async () => {
    nock('https://api.development.devicecheck.apple.com')
      .post('/v1/validate_device_token')
      .reply(200)

    const deviceToken = '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'

    const { statusCode, result } = await exec('ValidateDeviceToken', {
      mutation: { deviceToken }
    })

    expect(statusCode).to.eql(201)
    expect(result.data.isValid).to.eql(true)
    expect(result.data.errorMessage).to.not.exist
  })

  it('fails to validate device token, returns error message', async () => {
    const errorMessage = 'Missing or incorrectly formatted device token payload'

    nock('https://api.development.devicecheck.apple.com')
      .post('/v1/validate_device_token')
      .reply(400, () => {
        return errorMessage
      })

    const deviceToken = 'DEVICE_TOKEN'

    const { statusCode, result } = await exec('ValidateDeviceToken', {
      mutation: { deviceToken }
    })

    expect(statusCode).to.eql(201)
    expect(result.data.isValid).to.eql(false)
    expect(result.data.errorMessage).to.eql(errorMessage)
  })
})

# @kravc/devices

Device token validation service for iOS wrapped into `AWS Serverless` function
that relies on `AWS Secrets Manager` to store private key.

API Reference: https://api.dev.devices.kra.vc/v1/#/


## Configuration

Update `url` value to where the service is going to be hosted in configuration
files:

- `config/serverless-dev.yaml`
- `config/serverless-prd.yaml`

Create secret via AWS secret manager to include:

```json
{
  "devices": {
    "keyId":      "KEY_ID",
    "teamId":     "TEAM_ID",
    "privateKey": "PRIVATE_KEY"
  }
}
```

NOTE: Check the tutorial on how to get secret values:
      https://fluffy.es/devicecheck-tutorial/#serverside

Update `serverless.custom.secrets` value to include secret path (`kravc/dev` and
`kravc/prd` has to be replace with custom values):

- `config/serverless-dev.yaml`
- `config/serverless-prd.yaml`

Update `aws.region` and `aws.profile` to match your deployment preferences.


## Build, Test, Deploy

Install dependencies:

```sh
npm install
```

Run test:

```sh
npm run test
```

Run service locally:

```sh
npm run start
```

Deploy service to `dev` (`prd`) environment:

```sh
npx deploy dev
```

Show service logs from `dev` (`prd`) environment:

```sh
npx logs dev
```

Show service details from `dev` (`prd`) environment:

```sh
npx info dev
```


---

Author: [Alexander Kravets](mailto:a@kra.vc)

Revision: June 19, 2021

# cubos_clinica_api

Basic Express.js REST API. Tests are made with Gulp + Mocha + Chai + Supertest

## How to run it

```shell
git clone https://github.com/JoodyKonno/cubos_clinica_api.git
cd cubos_clinica_api
npm install
npm test
npm start
```

## Endpoints

#### GET /checkin/rules
Returns a list of rules

#### POST /checkin/rules
Save a new rule

#### DELETE /chekin/rules/:id
Delete the specified rule

#### GET /checkin/availabilities
Returns a list of availabilities grouped by day

## TODO

* Validate the entries on rules to avoid conflicts
* Sanitize dates
* Sanitize hours
* Add endpoint for single rule

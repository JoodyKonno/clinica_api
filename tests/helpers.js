const supertest = require('supertest');
const app = require('../app');
const chai = require('chai');

global.app = app;
global.expect = chai.expect;
global.request = supertest(app);
const jsonfile = require('jsonfile');
const path = require('path');

const checkinRulesModel = require('../../models/CheckinRulesModel');

const storeRulesPath = path.resolve('tests/store/rules.json');

describe('Route /checkin/rules', () => {

  beforeEach(() => {
    const preData = [
      {
        id: 1,
        type: 'daily',
        intervals: [
          {
            start: '9:00',
            end: '10:00',
          }
        ]
      },
      {
        id: 2,
        type: 'custom',
        date: '20-04-2019',
        intervals: [
          {
            start: '9:00',
            end: '12:00',
          }
        ]
      }
    ];
    
    jsonfile.writeFileSync(storeRulesPath, preData);
  });

  afterEach(() => {
    const preData = [];
    jsonfile.writeFileSync(storeRulesPath, preData);
  });

  describe('POST /checkin/rules', () => {
    it('should save a new checkin rule', () => {
      return request
        .post('/checkin/rules')
        .send({
          type: 'daily',
          intervals: [
            {
              start: '09:00',
              end: '11:00',
            },
            {
              start: '13:00',
              end: '16:00',
            }
          ]
        })
        .set('content-type', 'application/json')
        .expect(201)
        .then(res => {
          const body = res.body;

          expect(body).to.have.property('data')

          expect(body.data).to.have.property('href');
        });
    });
  });

  describe('DELETE /checkin/rules/:id', () => {
    it('should delete a checkin rule', () => {
      return request
        .delete(`/checkin/rules/1`)
        .set('content-type', 'application/json')
        .expect(204);
    });
  });

  describe('GET /checkin/rules', () => {
    it('should return the checkin rules', () => {
      return request
        .get(`/checkin/rules`)
        .set('content-type', 'application/json')
        .expect(200)
        .then(res => {
          const body = res.body;

          expect(body).to.have.property('data')
            .and.to.be.an('array');

          expect(body.data).to.have.length(2);

          const rule = body.data[0];

          expect(rule.id).to.not.be.undefined;
          expect(rule.type).to.not.be.undefined;
          expect(rule.intervals).to.not.be.undefined;

          expect(body).to.have.property('pagination')
            .and.to.be.an('object');

          expect(body.pagination).to.have.property('totalItens');

        });
    });    
  });

});

const jsonfile = require('jsonfile');
const path = require('path');

const checkinRulesModel = require('../../models/CheckinRulesModel');

const storeRulesPath = path.resolve('tests/store/rules.json');

describe('checkinRulesModel', () => {
  
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
  
  describe('save', () => {
    it('should save a new rule on storage', async () => {
      const newRule = {
        type: 'daily',
        intervals: [
          {
            start: '13:00',
            end: '15:00',
          }
        ]
      };

      await checkinRulesModel.save(newRule);

      const result = jsonfile.readFileSync(storeRulesPath);

      expect(result).to.be.an('Array')
        .and.to.have.length(3);

      const lastRule = result[2];

      expect(lastRule.id).to.not.be.undefined;
      expect(lastRule.type).to.be.equals('daily');
      expect(lastRule.intervals).to.be.an('array')
        .and.to.have.length(1);
    });
  });

  describe('remove', () => {
    it('should remove the collection', () => {
      checkinRulesModel.remove(1);

      const result = jsonfile.readFileSync(storeRulesPath);

      expect(result).to.be.an('Array')
        .and.to.have.length(1);
    })
  });
})
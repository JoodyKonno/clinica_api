const jsonfile = require('jsonfile');
const path = require('path');

const checkinRulesModel = require('../../models/CheckinRulesModel');

const storeRulesPath = path.resolve('tests/store/rules.json');

describe('checkinRulesModel', () => {
  
  beforeEach(() => {
    const preData = [
      {
        type: 'daily',
        intervals: [
          {
            start: '9:00',
            end: '10:00',
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
        .and.to.have.length(2);

      const lastRule = result[1];

      expect(lastRule.id).to.not.be.undefined;
      expect(lastRule.type).to.be.equals('daily');
      expect(lastRule.intervals).to.be.an('array')
        .and.to.have.length(1);
    });
  });
})
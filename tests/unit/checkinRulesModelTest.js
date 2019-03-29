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
            start: '18:00',
            end: '20:00',
          }
        ]
      },
      {
        id: 3,
        type: 'weekly',
        weekday: 7,
        intervals: [
          {
            start: '15:00',
            end: '16:00',
          }
        ]
      },
      {
        id: 4,
        type: 'weekly',
        weekday: 1,
        intervals: [
          {
            start: '16:00',
            end: '17:00',
          }
        ]
      },
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
        .and.to.have.length(5);

      const lastRule = result[4];

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
        .and.to.have.length(3);
    })
  });

  describe('list', () => {
    it('should return a list of rules', () => {
      const rules = checkinRulesModel.list();

      expect(rules).to.be.an('array')
        .and.to.have.length(4);
    });
  });

  describe('listAvailabities', () => {
    it('should return all the available intervals', () => {
      const availabilities = checkinRulesModel.listAvailabilities('2019-04-19', '2019-04-22');

      expect(availabilities).to.be.an('array')
        .and.to.have.length(4);

      expect(availabilities).to.deep.equals([
        {
          date: '19-04-2019',
          intervals: [
            {
              start: '9:00',
              end: '10:00',
            }
          ],
        },
        {
          date: '20-04-2019',
          intervals: [
            {
              start: '18:00',
              end: '20:00',
            }
          ],
        },
        {
          date: '21-04-2019',
          intervals: [
            {
              start: '15:00',
              end: '16:00',
            }
          ],
        },
        {
          date: '22-04-2019',
          intervals: [
            {
              start: '16:00',
              end: '17:00',
            }
          ],
        },
      ])
    });
  });
})
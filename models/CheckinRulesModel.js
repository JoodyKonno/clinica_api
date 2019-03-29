const jsonFile = require('jsonfile');
const path = require('path');
const moment = require('moment');

const storePath = process.env.STORE_PATH;
const entity = 'rules.json';

const dbPath = path.join(storePath, entity);

const listAll = () => {
  return jsonFile.readFileSync(dbPath);
};

const save = newModel => {
  const rules = listAll();
  
  const newRequest = {
    id: rules.length + 1,
    ...newModel
  }
  rules.push(newRequest);
  
  try {
    jsonFile.writeFileSync(dbPath, rules);

    return newRequest;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const remove = id => {
  const rules = listAll();

  const filteredRules = rules.filter(rule => rule.id != id);

  try {
    jsonFile.writeFileSync(dbPath, filteredRules);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }

};

const list = () => listAll();

const listWeekly = () => listAll()
  .filter(rule => rule.type == 'weekly');

const getWeekly = date => {
  const filteredRules = listWeekly()
    .filter(rule => rule.weekday == moment(date).format('E'))

  return filteredRules ? filteredRules[0] : {};
};

const getDaily = () => {
  const filteredRules = listAll()
    .filter(rule => rule.type == 'daily');

  return filteredRules ? filteredRules[0] : {};
} ;

const listCustom = () => listAll()
  .filter(rule => rule.type == 'custom');

const getCustom = date => {
  const filteredRules = listCustom()
    .filter(rule => rule.date == date);

  return filteredRules ? filteredRules[0] : {};
};

const listAvailabilities = (start, end) => {
  const dateDiff = moment(end).diff(start, 'days');
  if (dateDiff > 90) {
    console.log('Date difference is too big');
    return false;
  }

  return Array(dateDiff + 1)
    .fill({})
    .reduce((availabilities, item, i) => {
      const date = moment(start).add(i, 'days').format('DD-MM-YYYY');
      
      let intervals = [];
      const daily = getDaily();
      const weekly = getWeekly(date);
      const custom = getCustom(date);
      
      if (daily) {
        intervals = daily.intervals;
      }

      if (weekly) {
        intervals = weekly.intervals;
      }

      if (custom) {
        intervals = custom.intervals;
      }

      availabilities.push({
        date: date,
        intervals: intervals,
      });

      return availabilities;
    }, []);
};

module.exports = {
  save,
  remove,
  list,
  listAvailabilities
}
const jsonFile = require('jsonfile');
const path = require('path');

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

module.exports = {
  save,
}
import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'
const shortid = require('shortid')
const crypto = require('crypto')
const assert = require('assert')
const fs = require('fs')

var algorithm = 'aes256'
var key = 'SuperSecretKey'
function isJson(item) {
  item = typeof item !== "string" ?
    JSON.stringify(item) :
    item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }
  return false;
}
const afterSerialization = function (doc) {
  // if (isJson(doc)) {
  //   let cipher = crypto.createCipher(algorithm, key);
  //   let encrypted = cipher.update(JSON.stringify(doc), 'utf8', 'hex') + cipher.final('hex');
  //   return encrypted;
  // }
  // return doc;
  let decipher = crypto.createDecipher(algorithm, key);
  try {
    let decrypted = decipher.update(doc, 'hex', 'utf8') + decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch (e) {
    return doc
  }
}
const beforeDeserialization = function (doc) {
  let decipher = crypto.createDecipher(algorithm, key);
  try {
    let decrypted = decipher.update(doc, 'hex', 'utf8') + decipher.final('utf8');
    return JSON.parse(decrypted);
  } catch (e) {
    return doc
  }
}

var db = {}

db.students = new Datastore ({
  filename: path.join(remote.app.getPath('userData'), '/path/students.db'),
  autoload: true,
  timestampData: true,
  afterSerialization: afterSerialization,
  beforeDeserialization: beforeDeserialization
})
db.departments = new Datastore ({
  filename: path.join(remote.app.getPath('userData'), '/path/departments.db'),
  autoload: true,
  timestampData: true,
  afterSerialization: afterSerialization,
  beforeDeserialization: beforeDeserialization
})
db.levels = new Datastore ({
  filename: path.join(remote.app.getPath('userData'), '/path/levels.db'),
  autoload: true,
  timestampData: true,
  afterSerialization: afterSerialization,
  beforeDeserialization: beforeDeserialization
})
db.statistics = new Datastore ({
  filename: path.join(remote.app.getPath('userData'), '/path/statistics.db'),
  autoload: true,
  timestampData: true,
  afterSerialization: afterSerialization,
  beforeDeserialization: beforeDeserialization
})
db.users = new Datastore ({
  filename: path.join(remote.app.getPath('userData'), '/path/users.db'),
  autoload: true,
  timestampData: true,
  afterSerialization: afterSerialization,
  beforeDeserialization: beforeDeserialization
})
db.admissions = new Datastore ({
  filename: path.join(remote.app.getPath('userData'), '/path/admissions.db'),
  autoload: true,
  timestampData: true,
  afterSerialization: afterSerialization,
  beforeDeserialization: beforeDeserialization
})
db.settings = new Datastore ({
  filename: path.join(remote.app.getPath('userData'), '/path/settings.db'),
  autoload: true,
  timestampData: true,
  afterSerialization: afterSerialization,
  beforeDeserialization: beforeDeserialization
})

fs.readFile(path.join(remote.app.getPath('userData'), '/path/settings.db'), 'utf8', function (err, data) {
  if (!data) {
    var setting = {
      logo: '',
      name: '',
      number: '',
      email: '',
      link: '',
      tax: '',
      checkTax: false,
      note: ''
    }
    fs.writeFileSync(path.join(remote.app.getPath('userData'), '/path/settings.db'), 
    db.settings.insert(setting, function (err, item) {
    }), 'utf8')
    return
  }
})
fs.readFile(path.join(remote.app.getPath('userData'), '/path/users.db'), 'utf8', function (err, data) {
  if (!data) {
    var user = {
      username: 'admin',
      pass: 'admin',
      role: 'Admin'
    }
    fs.writeFileSync(path.join(remote.app.getPath('userData'), '/path/users.db'), 
    db.users.insert(user, function (err, item) {
    }), 'utf8')
    return
  }
})
fs.readFile(path.join(remote.app.getPath('userData'), '/path/admissions.db'), 'utf8', function (err, data) {
  if (!data) {
    var admission = {
      number: '3001',
    }
    fs.writeFileSync(path.join(remote.app.getPath('userData'), '/path/admissions.db'), 
    db.admissions.insert(admission, function (err, item) {
    }), 'utf8')
    return
  }
})

const insert = function(table, item, callback) {
  db[table].insert(item, callback);
}

const find = function (table, callback) {
  db[table].find({} ,callback)
}

const findOne = function(table, id, callback) {
  db[table].findOne({
    _id: id
  }, {}, callback);
}

const findParams = function(table, params, callback) {
  db[table].findOne(params, {}, callback);
}

const findSortId = function(table, id, callback) {
  db[table].findOne({
    shortid: id
  }, {}, callback);
}

const findUsername = function(table, username, callback) {
  db[table].findOne({
    username: username
  }, {}, callback);
}

const remove = function(table, id, callback) {
  db[table].remove({
    _id: id,
  }, { multi: true }, callback);
}

const removeByShortid = function(table, id, callback) {
  db[table].remove({
    shortid: id,
  }, { multi: true }, callback);
}

const update = function (table, id, item, callback) {
  db[table].update({ _id: id }, item, { multi: true }, callback)
}

const updateByShortid = function (table, id, item, callback) {
  db[table].update({ shortid: id }, item, { multi: true }, callback)
}

const pushLevel = function (table, id, item, callback) {
  db[table].update({ shortid: id }, { $push: { levels: item } }, { multi: true }, callback);
}

const popSubDocument = function (table, id, item, callback) {
  console.log(item)
  db[table].update({ _id: id }, { $pull: { archive: item } }, {}, callback)
}

export default {
  insert,
  find,
  findOne,
  findSortId,
  findUsername,
  findParams,
  remove,
  removeByShortid,
  update,
  updateByShortid,
  pushLevel,
  popSubDocument
}
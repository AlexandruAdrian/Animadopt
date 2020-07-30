const {
  ConflictError,
  NotFoundError,
  InvalidError,
} = require("../errors/index");

let registeredErrorFactories = {};

registeredErrorFactories["conflict"] = ConflictError;
registeredErrorFactories["notfound"] = NotFoundError;
registeredErrorFactories["invalid"] = InvalidError;

class ErrorsFactory {
  constructor(type, name, params) {
    return new registeredErrorFactories[type](name, params);
  }
}

module.exports = ErrorsFactory;

const {
  ConflictError,
  NotFoundError,
  InvalidError,
  AuthorizationError,
} = require("../errors/index");

let registeredErrorFactories = {};

registeredErrorFactories["conflict"] = ConflictError;
registeredErrorFactories["notfound"] = NotFoundError;
registeredErrorFactories["invalid"] = InvalidError;
registeredErrorFactories["authorization"] = AuthorizationError;

class ErrorsFactory {
  constructor(type, name, params) {
    return new registeredErrorFactories[type](name, params);
  }
}

module.exports = ErrorsFactory;

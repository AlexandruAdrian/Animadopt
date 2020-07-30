class CustomError extends Error {
  constructor(name, ...params) {
    super(...params);

    this.name = name;
    this.date = new Date();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.name);
    }
  }
}

class ConflictError extends CustomError {
  constructor(name, params) {
    super(name, params);
  }
}

class NotFoundError extends CustomError {
  constructor(name, params) {
    super(name, params);
  }
}

class InvalidError extends CustomError {
  constructor(name, params) {
    super(name, params);
  }
}

class AuthorizationError extends CustomError {
  constructor(name, params) {
    super(name, params);
  }
}

module.exports = {
  ConflictError,
  NotFoundError,
  InvalidError,
  AuthorizationError,
};

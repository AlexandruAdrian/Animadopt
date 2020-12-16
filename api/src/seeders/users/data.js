const {
  USER_ROLE_OWNER,
  USER_ROLE_ADMIN,
  USER_ROLE_USER,
} = require("../../models/role/constants");

const defaultRoles = [
  {
    type: USER_ROLE_OWNER,
  },
  {
    type: USER_ROLE_ADMIN,
  },
  {
    type: USER_ROLE_USER,
  }
];

const fakeUsers = [
  {
    email: 'owner1@animadopt.ro',
    firstName: 'fake',
    lastName: 'owner1',
    password: '$2a$10$X329354LDVDWlsL17uBgNe/30hqjzGJwsVwUpEh7kIu8pqjKTLkl6',
    phone: '0761555348',
    gender: 'F',
    isActive: true,
  },
  {
    email: 'admin1@animadopt.ro',
    firstName: 'fake',
    lastName: 'admin1',
    password: '$2a$10$X329354LDVDWlsL17uBgNe/30hqjzGJwsVwUpEh7kIu8pqjKTLkl6',
    phone: '0761555348',
    gender: 'F',
    isActive: true,
  },
  {
    email: 'admin2@animadopt.ro',
    firstName: 'fake',
    lastName: 'admin2',
    password: '$2a$10$X329354LDVDWlsL17uBgNe/30hqjzGJwsVwUpEh7kIu8pqjKTLkl6',
    phone: '0761555348',
    gender: 'F',
    isActive: true,
  },
  {
    email: 'user1@animadopt.ro',
    firstName: 'fake',
    lastName: 'user1',
    password: '$2a$10$X329354LDVDWlsL17uBgNe/30hqjzGJwsVwUpEh7kIu8pqjKTLkl6',
    phone: '0761555348',
    gender: 'M',
    isActive: true,
  },
  {
    email: 'user2@animadopt.ro',
    firstName: 'fake',
    lastName: 'user2',
    password: '$2a$10$X329354LDVDWlsL17uBgNe/30hqjzGJwsVwUpEh7kIu8pqjKTLkl6',
    phone: '0761555348',
    gender: 'F',
    isActive: true,
  },
  {
    email: 'user3@animadopt.ro',
    firstName: 'fake',
    lastName: 'user3',
    password: '$2a$10$X329354LDVDWlsL17uBgNe/30hqjzGJwsVwUpEh7kIu8pqjKTLkl6',
    phone: '0761555348',
    gender: 'F',
    isActive: true,
  },
];

module.exports = {
  fakeUsers,
  defaultRoles,
};

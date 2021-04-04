const User = require("../../models/user/userModel");
const Role = require("../../models/role/roleModel");
const { fakeUsers, defaultRoles } = require("./data");

function seedUsersAndRoles() {
  console.log("** Creating fake users and roles");
  let ownerRole, adminRole, userRole;
  Role.countDocuments({}, (err, count) => {
    try {
      if (count <= 0) {
        ownerRole = new Role(defaultRoles[0]);
        adminRole = new Role(defaultRoles[1]);
        userRole = new Role(defaultRoles[2]);
        ownerRole.save();
        adminRole.save();
        userRole.save();
      }
    } catch (err) {
      console.log("Failed to seed roles: ", err);
    }
  });

  User.countDocuments({}, (err, count) => {
    try {
      if (count <= 0) {
        fakeUsers.forEach((fakeUser, index) => {
          if (index === 0) {
            fakeUser["role_id"] = ownerRole._id;
          } else if (index === 1 || index === 2) {
            fakeUser["role_id"] = adminRole._id;
          } else {
            fakeUser["role_id"] = userRole._id;
          }
          const user = new User(fakeUser);
          user.save();
        });
      }
    } catch (err) {
      console.log("Failed to seed users: ", err);
    }
  });

  console.log("** Created fake users");
}

module.exports = seedUsersAndRoles;

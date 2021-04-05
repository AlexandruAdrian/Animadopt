const User = require("../../models/user/userModel");
const Role = require("../../models/role/roleModel");
const { fakeUsers, defaultRoles } = require("./data");
const asyncForEach = require("../../utilities/asyncForEach");

async function seedUsersAndRoles() {
  console.log("** Creating fake users and roles");
  let ownerRole, adminRole, userRole;
  await Role.countDocuments({}, async (err, count) => {
    try {
      if (count <= 0) {
        ownerRole = new Role(defaultRoles[0]);
        adminRole = new Role(defaultRoles[1]);
        userRole = new Role(defaultRoles[2]);
        await ownerRole.save();
        await adminRole.save();
        await userRole.save();
      }
    } catch (err) {
      console.log("Failed to seed roles: ", err);
    }
  });

  await User.countDocuments({}, async (err, count) => {
    try {
      if (count <= 0) {
        await asyncForEach(fakeUsers, (fakeUser, index) => {
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

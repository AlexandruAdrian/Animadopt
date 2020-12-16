const seedAnimalCategories = require('./categories/seedCategories');
const seedCounties = require('./counties/seedCounties');
const seedUsersAndRoles = require('./users/seedUsers');

function initSeeding() {
    console.log('* Initializing seeders');
    seedAnimalCategories();
    seedCounties();
    seedUsersAndRoles();
    console.log('* Seeding initialized \n');
}

module.exports = initSeeding;

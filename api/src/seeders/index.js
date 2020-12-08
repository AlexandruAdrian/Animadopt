const seedAnimalCategories = require('./seedCategories');
const seedCounties = require('./seedCounties');

function initSeeding() {
    console.log('Initializing seeders...');
    seedAnimalCategories();
    seedCounties();
    console.log('Seeding initialized');
}

module.exports = initSeeding;

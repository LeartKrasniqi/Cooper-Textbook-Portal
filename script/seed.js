const db = require('../server/db')
const {Users, Courses, Textbooks} = require('../server/db/models')
const courses = require('./courses.json')
const textbooks = require('./textbooks.json')
const users = require('./users.json')


async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  /* Seed users */
  console.log('----- Seeding users -----')
  await Promise.all(await Users.bulkCreate(users))
  console.log(`----- Seeded ${users.length} users ------`)

  /* Seed textbooks */
  console.log('----- Seeding textbooks -----')
  await Promise.all(await Textbooks.bulkCreate(textbooks))
  console.log(`----- Seeded ${textbooks.length} textbooks -----`)

  /* Seed courses */
  console.log('----- Seeding courses -----')
  await Promise.all(await Courses.bulkCreate(courses))
  console.log(`----- Seeded ${inventories.length} courses -----`)


  console.log(`--------------- DONE SEEDING ----------------`)
}


/* Function that actually runs the seed */
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}


if (module === require.main) {
  runSeed()
}

module.exports = seed
const db = require('../backend/db')
const {Users, Courses, Textbooks, Course_Textbooks, User_Courses, Suggested_Links} = require('../backend/db/models')
const courses = require('./courses.json')
const textbooks = require('./textbooks.json')
//const users = require('./users.json')
const course_textbooks = require('./course_textbooks.json')
const user_courses = require('./user_courses')
const suggested_links = require('./suggested_links')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // /* Seed users */
  // console.log('----- Seeding users -----')
  // await Promise.all(await Users.bulkCreate(users))
  // console.log(`----- Seeded ${users.length} users ------`)

  /* Seed textbooks */
  console.log('----- Seeding textbooks -----')
  await Promise.all(await Textbooks.bulkCreate(textbooks))
  console.log(`----- Seeded ${textbooks.length} textbooks -----`)

  /* Seed courses */
  console.log('----- Seeding courses -----')
  await Promise.all(await Courses.bulkCreate(courses))
  console.log(`----- Seeded ${courses.length} courses -----`)

  /* Seed course textbooks */
  console.log('----- Seeding course_textbooks -----')
  await Promise.all(await Course_Textbooks.bulkCreate(course_textbooks))
  console.log(`----- Seeded ${course_textbooks.length} course_textbooks -----`)

  /* Seed user courses */
  console.log('----- Seeding user_courses -----')
  await Promise.all(await User_Courses.bulkCreate(user_courses))
  console.log(`----- Seeded ${user_courses.length} user_courses -----`)

  /* Seed suggested_links */
  console.log('----- Seeding suggested_links -----')
  await Promise.all(await Suggested_Links.bulkCreate(suggested_links))
  console.log(`----- Seeded ${suggested_links.length} suggested_links -----`)


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
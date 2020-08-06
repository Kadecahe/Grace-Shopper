'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123456',
      firstName: 'Cody',
      lastName: 'Davidson',
      phoneNumber: '(402)773-5461',
      address: '810 W Cedar St, Sutton, NE, 68979',
      isAdmin: true
    }),
    User.create({
      email: 'murphy@email.com',
      password: '123456',
      firstName: 'Eddie',
      lastName: 'Murphy',
      phoneNumber: '(718)945-0832',
      address: '6952 Hillmeyer Ave, Arverne, NY, 11692'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Cotton Facemask',
      price: 494,
      quantity: 55,
      category: 'mask',
      description:
        'Facemask Cotton Face Mask With Filter Pocket PM2.5 Filter 2 Layer Washable Face Mask Reusable Mask'
    }),
    Product.create({
      name: 'Rainbow Sun Shield',
      price: 1699,
      quantity: 15,
      category: 'face-shield',
      description:
        'Sun visor UV Protection, Hat Cap, Rainbow Visor, Sun cap, Face Shield',
      imageUrl:
        'https://i.etsystatic.com/18717999/r/il/c67c2d/2487349479/il_794xN.2487349479_qr23.jpg'
    }),
    Product.create({
      name: 'Ladybug Faceshield',
      price: 1950,
      quantity: 40,
      category: 'face-shield',
      color: 'red',
      description:
        'Clear Face Shield with Printed Designs for Kids and Adults. Comfortable PPE that can be used with goggles & facemask if needed',
      imageUrl:
        'https://i.etsystatic.com/22957671/r/il/9d0aec/2449990780/il_794xN.2449990780_3re3.jpg'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeding ${products.length} products successfully`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

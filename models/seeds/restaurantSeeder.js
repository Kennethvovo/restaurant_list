const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json')

db.once('open', () => {
  restaurantList.results.forEach((seed) => {
    Restaurant.create(seed).catch(() => console.log(`${seed.name} is error!`))
  })
  console.log('seed finish!')
})

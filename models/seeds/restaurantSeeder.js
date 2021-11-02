const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant_list')
const db = mongoose.connection
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  restaurantList.forEach((restaurant) => {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
    })
  })

  console.log('Restaurant Seeder Done')
})

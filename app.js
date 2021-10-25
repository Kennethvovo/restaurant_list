// app.js
// require packages used in the project
const express = require('express')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find((restaurant) => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})
// 搜尋功能判斷
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(
    (restaurantItem) =>
      restaurantItem.name.toLowerCase().includes(keyword) || restaurantItem.category.toLowerCase().includes(keyword)
  )
  res.render('index', { restaurants, keyword: req.query.keyword.trim() })
})
// setting static files
app.use(express.static('public'))

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

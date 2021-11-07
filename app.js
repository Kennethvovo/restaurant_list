const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const RestaurantList = require('./models/restaurant')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
const port = 3000
require('./config/mongoose')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  RestaurantList.find()
    .lean()
    .then((restaurants) => {
      const searchedRestaurants = restaurants.filter((restaurant) => {
        return restaurant.category.toLowerCase().includes(keyword) || restaurant.name.toLowerCase().includes(keyword)
      })
      res.render('index', { RestaurantList: searchedRestaurants, keyword })
    })
})
app.use(bodyParser.urlencoded({ extended: true }))

//setting static files
app.use(express.static('public'))
app.use(routes)
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

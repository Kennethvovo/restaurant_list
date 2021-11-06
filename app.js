// app.js
// require packages used in the project
const express = require('express')
const RestaurantList = require('./models/restaurant')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const restaurantList = require('./restaurant')
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/restaurant_list') // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})
// require handlebars in the project
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// routes setting
app.get('/', (req, res) => {
  RestaurantList.find() // 取出 RestaurantList model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((RestaurantList) => res.render('index', { RestaurantList })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)) // 錯誤處理
})

// new 功能
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
app.post('/restaurants', (req, res) => {
  return RestaurantList.create(req.body)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch((error) => console.log(error))
})
//setting static files
app.use(express.static('public'))

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const phone = req.body.phone
  const description = req.body.description
  const image = req.body.image
  const google_map = req.body.google_map
  const location = req.body.location
  return RestaurantList.findById(id)
    .then((restaurant) => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      restaurant.google_map = google_map
      restaurant.location = location
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
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
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

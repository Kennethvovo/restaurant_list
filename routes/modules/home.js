const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurant')

// routes setting
router.get('/', (req, res) => {
  RestaurantList.find() // 取出 RestaurantList model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((RestaurantList) => res.render('index', { RestaurantList })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error)) // 錯誤處理
})
router.get('/search', (req, res) => {
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

// 匯出路由器
module.exports = router

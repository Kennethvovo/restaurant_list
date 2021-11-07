const express = require('express')
const router = express.Router()
// 引入模組
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
// 將網址結構符合的導向模組
router.use('/', home)
router.use('/restaurants', restaurants)
// 匯出路由器
module.exports = router

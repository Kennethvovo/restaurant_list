const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurant')

// new 功能
router.get('/new', (req, res) => {
  return res.render('new')
})
router.post('/', (req, res) => {
  return RestaurantList.create(req.body)
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch((error) => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/${id}`))
    .catch((error) => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return RestaurantList.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})
// 匯出路由器
module.exports = router

const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const RestaurantList = require('./models/restaurant')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
const port = 3000

// get mongodb connection
require('./config/mongoose')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//setting static files
app.use(express.static('public'))
// 將 request 導入路由器
app.use(routes)
// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})

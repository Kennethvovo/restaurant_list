const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect('mongodb://localhost/restaurant_list') // 設定連線到 mongoDB
// 取得資料庫連線狀態
const db = mongoose.connection
// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

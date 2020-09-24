var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
  console.log(req.body)
  console.log('Hello')
})

router.post('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
  console.log(req.body)
  console.log('Hello_POST')
  var obj = new Object()
  obj.hello = 'World'
  console.log(JSON.stringify(obj))
})

router.get('/SUCCESS', function (req, res, next) {
  res.render('index', { title: 'Success' })
})

router.post('/test', function (req, res, next) {
  res.render('index', { title: 'Express' })
  console.log(req.body)
  console.log('Hello_POST_TEST')
  var obj = new Object()
  obj.hello = 'World'
  console.log(JSON.stringify(obj))
})

module.exports = router

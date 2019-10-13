var express = require('express');
var usersController=require('../controllers/users.js')
var multer = require('multer')

var router = express.Router();
var upload = multer({
  dest: 'public/uploads/'
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// 创建接口
router.post('/login',usersController.login);  // 登录接口
router.post('/register', usersController.register);  // 注册接口
router.get('/verify', usersController.verify);  // 验证接口
router.get('/logout', usersController.logout); // 退出接口
router.get('/getUser', usersController.getUser);   // 
router.post('/findPassword', usersController.findPassword);
router.get('/verifyImg', usersController.verifyImg);
router.post('/uploadUserHead', upload.single('file'), usersController.uploadUserHead)

module.exports = router;

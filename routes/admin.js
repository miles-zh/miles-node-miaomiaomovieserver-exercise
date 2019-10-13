var express = require('express');
var adminController = require('../controllers/admin.js')
var router = express.Router();

router.use((req,res,next)=>{  // 判断是否具有管理权限
    if(req.session.username && req.session.isAdmin == true){
        next()
    }else{
        res.send({
            msg:'没有管理权限',
            status:-1
        })
    }
})
router.get('/', adminController.index);
router.get('/usersList',adminController.usersList);
router.post('/updateFreeze',adminController.updateFreeze);
router.post('/deleteUser',adminController.deleteUser);

module.exports = router;
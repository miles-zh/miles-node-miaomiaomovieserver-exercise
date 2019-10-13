var mongoose=require('mongoose');
var {Head} = require('../untils/config.js')
var url=require('url')
mongoose.set("userCreateIndex",true);

var UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:{unique:true}
    },
    password:{
        type:String,
        required:true
    },
    email: {
        type: String,    // 字符串
        required: true,  // 不能为空
        index: {
            unique: true  // 唯一性
        }
    },
    date:{
        type:Date,
        default:Date.now()
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isFreeze:{
        type:Boolean,
        default:false
    },
    userHead:{
        type:String,
        default:url.resolve(Head.baseUrl,'default.jpg')

    }
})
var UserModel=mongoose.model('user',UserSchema)
UserModel.createIndexes();  // user的index生效
var save=(data)=>{
    var user=new UserModel(data);
    return user.save().then(()=>{
        return true;
    }).catch(()=>{
        return false;
    });
}


var findLogin=(data)=>{
    return UserModel.findOne(data);
}
var updataPassword=(email,password)=>{
    return UserModel.update({email},{$set:{password}})
            .then(()=>{
                return true
            })
            .catch(()=>{
                return false
            });
}

var usersList =()=>{
    return UserModel.find();  // 返回所有的用户
}
var updateFreeze=(email,isFreeze)=>{  // 冻结账号
    return UserModel.update({email},{$set:{isFreeze}}).then(()=>{
        return true
    }).catch(()=>{
        return false
    })
}
var deleteUser=(email)=>{
    return UserModel.deleteOne({email});
}
var updateUserHead=(username,userHead)=>{
     return UserModel.update({
         username
     }, {
         $set: {
            userHead
         }
     }).then(() => {
         return true
     }).catch(() => {
         return false
     })
}
module.exports={
    save,
    findLogin,
    updataPassword,
    usersList,
    updateFreeze,
    deleteUser,
    updateUserHead
}
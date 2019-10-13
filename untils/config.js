// 连接mongodb数据库
var  mongoose=require('mongoose');
var nodemailer=require('nodemailer');
var Mongoose={
    url:'mongodb://localhost:27017/miaomiao',
    connect(){   // 连接数据库的方法
        mongoose.connect(this.url,{useNewUrlParser:true},(err)=>{
            if(err){
                console.log('数据库连接失败');
                return ;
            }
            console.log('数据库连接成功')
        })
    }
};
// 邮箱验证配置
var Email = {
    config : {
        host: 'smtp.qq.com',
        port: 587,
        auth: {
            user: "917743736@qq.com", // generated ethereal user
            pass: "bddupglgevoxbffh" // generated ethereal password
        }
    },
    get transporter(){ // 发送用户名密码
        return nodemailer.createTransport(this.config);
    },
    get verify(){ // 生成验证码
        return Math.random().toString().substring(2,6);
    },
    get time(){
        return Date.now()
    }
}

var Head={
    baseUrl: 'http://localhost:3000/uploads/'
}
module.exports={
    Mongoose,
    Email,
    Head
    
}
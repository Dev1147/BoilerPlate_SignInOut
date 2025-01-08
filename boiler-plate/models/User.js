const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
var jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim: true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    image: String,
    token:{
        type:String,
        required: false, // 필수 여부 확인
        default: '' // 기본값 확인
    },
    tokenExp:{
        type:Number
    }
})

//index.js의 save()전 실행
userSchema.pre('save', function(next){
    var user = this; //스키마를 가르킴킴
    if(user.isModified('password')){
        //바밀번호 암호화 진행 npm.js.com참고
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            //myPlaintextPassword -> 원본 비밀번호 (암호화 전)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    }else { //비번 변경 X
        next()
    }

})
//원본
// userSchema.methods.comparePassword = function(plainPassword, cb){
//     //plainPassword 1234567 암호환 비번: $3873429047
//     //복호화 X 암호화하여 암호화된 비번이 맞는지
//     bcrypt.compare(plainPassword,this.password, function(err, isMatch){
//         if(err) return cb(err), //false
//         cb(null, isMatch) //true
        
//     })
// }

// userSchema.methods.generateToken = function(cb){
//     var user = this;
//     //jsonwebtoken을 이용해서 토큰 발급급
//     var token = jwt.sign(user._id.toHexString(),'secretToken')

//     // user._id + 'secretToken' = token
//     // ->
//     // 'secretToken' -> user.id // 토큰을 만듬
//     user.token = token
//     user.save(function(err, user){
//         if(err) return cb(err);
//         cb(null, user);
//     })

// }

// 수정 comparePassword와 generateToken
userSchema.methods.comparePassword = function(plainPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return reject(err);  // Reject the Promise on error
        resolve(isMatch);  // Resolve the Promise with the match result
      });
    });
  };
  
//jwt.sign()을 Promise로 래핑
userSchema.methods.generateToken = function() {
  const user = this;

  return new Promise((resolve, reject) => {
    // jsonwebtoken을 이용해서 토큰 발급
    jwt.sign(user._id.toHexString(), 'secretToken', (err, token) => {
      if (err) return reject(err); // 오류 발생 시 reject

      user.token = token;
      user.save()
        .then(savedUser => resolve(savedUser)) // 저장 성공 시 resolve
        .catch(saveErr => reject(saveErr)); // 저장 실패 시 reject
    });
  });
};

  



//원본 findByToken
// userSchema.statics.findByToken = function(token, cb){
//     var user = this;

//     //user._id + '' =token
//     //토큰을 decode 한다.
//     jwt.verify(token, 'secretToken', function(err, decode){
//         //유저 아이디를 이용해서 유저를 찾는다.
//         //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
//         User.findOne({"_id":decode, "token": token}, function(err, user){
//             if(err) return cb(err);
//             cb(null,user)
//         })
//     })
// }

//수정 findByToken
userSchema.statics.findByToken = function(token) {
    const user = this;
  
    return new Promise((resolve, reject) => {
      // 토큰을 decode 한다.
      jwt.verify(token, 'secretToken', (err, decode) => {
        if (err) return reject(err);
  
        // 유저 아이디를 이용해서 유저를 찾는다.
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ _id: decode, token: token })
          .then(foundUser => resolve(foundUser)) // 유저를 찾으면 resolve
          .catch(err => reject(err)); // 오류가 발생하면 reject
      });
    });
  };
  

  



const User = mongoose.model('User',userSchema)

module.exports = {User}
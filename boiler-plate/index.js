const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const {User} = require("./models/User"); 
const {auth} = require("./middleware/auth");

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json 타입으로 분석하여 가져옴옴
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// ,{useNewUrlParser:true, useUnifiedTopology:true  useCreateIndex:true, useFindAndModify:false}



app.get('/', (req, res) => {res.send('Hello World! 안녕~!')})

// app.post('/register',(req,res) => {
//   //회원 가입할때 필요한 정보들을 client에서 가져오면, 데이터 베이스에 넣는다.
//   const user = new User(req.body)

//   user.save((err,userInfo)=>{
//     if(err) return res.json({success: false, err})
//     return res.status(200).json({
//       success: true
//     })
//   }) 
// })

//then/catch 또는 ansyc 방식으로 해야 됨
app.post('/api/users/register', (req, res) => {
  // 회원 가입할 때 필요한 정보를 client에서 가져오면, 데이터베이스에 저장한다.
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch(err => {
      console.error('Error saving user:', err);
      return res.status(500).json({ success: false, err });
    });
});

//로그인 기능
// app.post('/api/users/login',(req, res)=>{
//   //요청된 이메일을 데이터베이스에서 찾는다.
//   User.findOne({email: req.body.email}, (err, userInfo)=>{
//     if(userInfo){
//       return res.json({
//         loginSuccess: true,
//         message:"제공된 이메일에 해당하는 유저가 있습니다."
//       })
      
//     }else{
//       return res.json({
//         loginSuccess: false,
//         message: "제공된 이메일에 해당하는 유저가 없습니다."
//       })
//     }
//   })

//   //요청된 이메일이 데이터베이스에 있다면 비번이 맞는 확인한다.
//   user.comparePassword(req.body.password,(err,isMatch)=>{
//     if(!isMatch){
//       return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})
//     }
//   })

//   //비번이 맞다면 토큰 생성하기.
//   user.generateToken((err, user)=>{
//     if(err) return res.status(400).send(err);
    
//     //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
//     res.cookie("x_auth",user.token)
//     .status(200)
//     .json({loginSuccess: true, userId: user._id}) 

//   })
// })


// Model.findOne(), save()  no longer accepts a callback에러 then/catch 또는 ansyc 방식으로 해야 됨
app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 데이터베이스에서 찾는다.
  User.findOne({ email: req.body.email })
    .then(userInfo => {
      if (userInfo) {
        // 이메일이 존재하면 비밀번호 확인
        userInfo.comparePassword(req.body.password)
          .then(isMatch => {
            if (!isMatch) {
              return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            }

            // 비밀번호가 맞다면 토큰 생성
            userInfo.generateToken()
              .then(user => {
                // 토큰을 쿠키에 저장
                res.cookie("x_auth", user.token)
                  .status(200)
                  .json({ loginSuccess: true, userId: user._id });
              })
              .catch(err => {
                return res.status(400).send(err);
              });
          })
          .catch(err => {
            return res.json({ loginSuccess: false, message: err.message });
          });
      } else {
        return res.json({ loginSuccess: false, message: "제공된 이메일에 해당하는 유저가 없습니다." });
      }
    })
    .catch(err => {
      return res.status(500).json({ loginSuccess: false, message: err.message });
    });
});






app.get('/api/users/auth', auth,(req,res)=>{
  //여기까지 미들웨어를 통과는 Authenticationdl True
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})



//원본 로그아웃
//User.findOneAndUpdate에 콜백을 사용하고 있습니다. Mongoose 6 이상에서는 콜백 대신 Promise를 사용해야 하므로 수정이 필요합니다.
// app.get('/api/users/logout', auth, (req, res)=>{
//   User.findOneAndUpdate({_id: req.user._id},
//       {token: ""},
//       (err, user)=>{
//           if(err) return res.json({ success: false, err})
//           return res.status(200).send({
//               success: true
//           })
//       }

//   )
// })

//수정 로그아웃
// 로그아웃
app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" }
  )
    .then(() => {
      res.status(200).send({ success: true });
    })
    .catch(err => {
      res.json({ success: false, err });
    });
});











app.listen(port, () => {console.log(`Example app listening on port ${port}`)})



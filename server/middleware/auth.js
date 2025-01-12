const {User} = require('../models/User');

// 원본 auth midleware
//User.findByToken에서 콜백을 사용하고 있기 때문에 수정이 필요합니다. 최신 Mongoose와 Promise 방식을 사용하도록 코드를 업데이트해야 합니다.
// let auth = (req, res, next) => {
//     //인증처리 하는 곳곳

//     //클라이언트 쿠키에서 토큰을 가져온다.
//     let token = req.cookies.x_auth;
//     //토큰을 복호화한 후 유저를 찾는다.
//     User.findByToken(token,(err,user)=>{
//         if(err) return err;
//         if(!user) return res.json({isAuth:false, error:true})

//         req.token = token;
//         req.user = user;
//         next();
//     })
//     //유저저가 있으면 인증

//     //유저가 없으연 인증 X
// }

//수정 auth
let auth = (req, res, next) => {
    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
  
    // 토큰을 복호화한 후 유저를 찾는다.
    User.findByToken(token)
      .then(user => {
        if (!user) {
          return res.json({ isAuth: false, error: true });
        }
  
        req.token = token;
        req.user = user;
        next();
      })
      .catch(err => {
        res.status(400).send(err);
      });
  };

  //mongoose와 express의 최신 버전에는 Promise또는  async/await 사용
//   Promise 코드: then/catch
//   User.findById(id)
//   .then(user => {
//     if (!user) throw new Error("User not found");
//     return user;
//   })
//   .catch(err => {
//     console.error(err);
//   });


// Async/Await 코드: try/catch
// try {
//   const user = await User.findById(id);
//   if (!user) throw new Error("User not found");
//   console.log(user);
// } catch (err) {
//   console.error(err);
//}

  
module.exports = {auth};








import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import {loginUser} from '../../../_actions/user_action'
import { useNavigate } from 'react-router-dom';


function LoginPage(props) {  
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  
  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault();
    //console.log('Email',Email)
    //console.log('Password',Password)
    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then(response=>{
      console.log('Response:', response);  // response 전체 출력
      console.log('Response data', response.data); 
      console.log('Response Payload:', response.payload);  // payload만 출력
      console.log('Response loginSuccess:', response.loginSuccess); 

      if(response.loginSuccess){
        //props.history.push('/') // React Router v6 이상에서 history가 더 이상 props로 전달되지 않기 때문입니다.
        navigate('/');
      }else{
        alert("아이디또는 비밀번호가 틀렸습니다.")
      }
    }) 
    .catch((error) => {
      console.error(error);
      alert('An error occurred during login.');

    });

  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center'
      ,width:'100xh', height:'100vh'
    }}>
      <form style={{ display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}></input>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}></input>
        <br/>
        <button>Login</button>
      </form> 
    </div>
  )
}

export default LoginPage
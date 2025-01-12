import React from 'react' //, { useEffect }
import axios from 'axios'
import { useNavigate } from 'react-router-dom';;


function LandingPage() {
  const navigate = useNavigate(); 

  // useEffect(()=>{
  //   axios.get('/api/hello')
  //   .then(response => console.log(response.data),[])
  // })

  const onClickHandler = async ()=>{
    axios.get('/api/users/logout')
    .then(response =>{
      console.log(response);
      console.log(response.data);
      console.log(response.data.success);
      if(response.data.success){
        navigate("/login");
      }else{
        alert("로그아웃에 실패했습니다.");
      }
      // const { isAuth, error } = response.data;

      // if (isAuth === false && error === true) { // 로그아웃 실패 확인
      //   alert("로그아웃에 실패했습니다.");
      // } else {
      //   // 로그아웃 성공 처리
      //   navigate("/");
      // }
    })
    .catch(error => {
      console.error("Logout Error:", error); // 에러 로깅
      alert("로그아웃 요청 중 문제가 발생했습니다."); // 사용자 알림
    });
  }

  return (
    <div  style={{ display: 'flex', justifyContent: 'center', alignItems:'center'
      ,width:'100xh', height:'100vh'
    }}
    >
      <h2>시작페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}

export default LandingPage
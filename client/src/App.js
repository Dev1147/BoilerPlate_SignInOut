import './App.css';
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Provider를 임포트
import store from './store'; // store를 임포트

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {

  const ProtectedLandingPage = Auth(LandingPage, null)
  const ProtectedLoginPage = Auth(LoginPage, false)
  const ProtectedRegisterPage = Auth(RegisterPage, false)
  return (
    <Provider store={store}> {/* Provider로 애플리케이션 감싸기 */}
      <BrowserRouter>
        <div>
          <Routes>
            {/* <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} /> */}

            {/* <Route path="/" element={Auth(LandingPage,null)} />
            <Route path="/login" element={Auth(LoginPage,false)} />
            <Route path="/register" element={Auth(RegisterPage, false)} />  */}
      
            {/* <Route path="/" element={<Auth SpecificComponent={LandingPage} option={null} />} />
            <Route path="/login" element={<Auth SpecificComponent={LoginPage} option={false} />} />
            <Route path="/register" element={<Auth SpecificComponent={RegisterPage} option={false} />} />
            */}
            <Route path="/" element={<ProtectedLandingPage />} />
            <Route path="/login" element={<ProtectedLoginPage />} />
            <Route path="/register" element={<ProtectedRegisterPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

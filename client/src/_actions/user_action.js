// import axios from 'axios'
// import {LOGIN_USER} from './types'

// export function loginUser(dataToSubmit){
//     const requset = axios.post('/api/user/login', dataToSubmit)
//     .then(response =>response.data)

//     return{
//         type:LOGIN_USER,
//         payload: requset,
//     }
// }

// _actions/user_action.js
import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export function loginUser(dataToSubmit) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/users/login', dataToSubmit);
      console.log('Axios Response Data:', response.data);
      dispatch({
        type: LOGIN_USER,
        payload: response.data,
      });
      return response.data; // Promise 반환
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // 에러를 호출한 곳으로 전달
    }
  };
}

export function registerUser(dataToSubmit) {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/users/register', dataToSubmit);
      console.log('Axios Response Data:', response.data);
      dispatch({
        type:REGISTER_USER,
        payload: response.data,
      });
      return response.data; // Promise 반환
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // 에러를 호출한 곳으로 전달
    }
  };
}


export function auth() {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/users/auth');
      //console.log('Axios Response Data:', response.data);
      dispatch({
        type:AUTH_USER,
        payload: response.data,
      });
      return response.data; // Promise 반환
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // 에러를 호출한 곳으로 전달
    }
  };
}

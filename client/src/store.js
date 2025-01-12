import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // 'redux-thunk'에서 'thunk'를 가져옵니다.
import rootReducer from './_reducers'; // rootReducer는 reducers/index.js 파일에 정의되어야 합니다.

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) // redux-thunk 미들웨어 적용
);

export default store;

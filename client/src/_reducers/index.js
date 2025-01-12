import { combineReducers } from "redux";
import user from './user_reducer'; // 정확한 파일 경로로 수정

const rootReducer = combineReducers({
    user // 'user' 리듀서를 추가
});

export default rootReducer;
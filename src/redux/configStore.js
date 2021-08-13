import { combineReducers, createStore } from 'redux';
import { baiTapQuanLySinhVienReducer } from './reducers/baiTapQuanLySinhVienReducer'


//state trong redux là reducer
const rootReducer = combineReducers({
    //Các state ứng dụng sẽ được lưu tại đây
    baiTapQuanLySinhVienReducer

});



export const store = createStore(
    rootReducer,

);


import {configureStore} from '@reduxjs/toolkit';
import housesReducer from './housesReducer';
import userReducer from './userReducer';
// import userReducer from './userReducer';


export default configureStore({
    reducer : {
        houses : housesReducer,
        user : userReducer,
    }
})
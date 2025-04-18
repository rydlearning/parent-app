
// redux/store.ts
import {  combineReducers } from '@reduxjs/toolkit';

// Import your reducers here
// import myReducer from './myReducer';
import authReducer from './reducers/authSlice';
import userReducer from './reducers/userSlice'



const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof rootReducer.dispatch;

export default rootReducer;




import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Reducers/UserReducer';
import screenDataReducer from './Reducers/screenDataReducer';
import cartReducer from './Reducers/cartRecucer';
import accountDetailsReducer from "./Reducers/MyAccountReducer";
import myOrdersReducer from "./Reducers/MyOrdersReducer";

export const server = "http://43.205.79.142/api/auth";

const store = configureStore({
    reducer: {
        user: userReducer,
        screenData: screenDataReducer,
        cart: cartReducer,
        myAccountDetails: accountDetailsReducer,
        myOrdersDetails: myOrdersReducer,
    },
})
export default store;

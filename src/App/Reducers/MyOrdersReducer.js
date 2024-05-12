import { createReducer } from '@reduxjs/toolkit';


const myOrdersReducer = createReducer(
    {
        productOrder: [],
        tiffineSubscription: [],
        orderLogsByOrderNo: [],
        onSuccessfullOrderPlaced: [],
        isloading: false,
    },
    {
        getMyOrdersRequest: state => {
            state.isloading = true;
        },
        getMyOrdersFail: (state, action) => {
            console.log({ state });
            state.isloading = false;
            state.productOrder = [];
            state.tiffineSubscription = [];
            console.log({ state }, { action });
        },
        getMyOrdersSuccess: (state, action) => {
            state.isloading = false;
            state.productOrder = action.payload && action.payload.product_order ? action.payload.product_order : [];
            state.tiffineSubscription = action.payload && action.payload.tiffin_subscription ? action.payload.tiffin_subscription : [];
        },

        // get order logs by order_id:-
        getLogsForOrdersRequest: state => {
            state.isloading = true;
        },
        getLogsForOrdersFail: (state, action) => {
            state.isloading = false;
            state.aleartData = action.payload.aleartData;
        },
        getLogsForOrdersSuccess: (state, action) => {
            state.isloading = false;
            state.orderLogsByOrderNo = action.payload ? action.payload : [];
        },
        clearData: state => {
            state.aleartData = null;
            state.isOtpSent = false;
        },

        // on successfull order placed:-
        getResponseDataRequest: state => {
            state.isloading = true;
        },
        getResponseDataFail: (state, action) => {
            state.isloading = false;
            state.aleartData = action.payload.aleartData;
        },
        getResponseDataSuccess: (state, action) => {
            state.isloading = false;
            state.onSuccessfullOrderPlaced = action.payload ? action.payload : [];
            console.log("in action:-", action.payload);
        },
        clearData: state => {
            state.aleartData = null;
            state.isOtpSent = false;
        },
    },

);


export default myOrdersReducer;

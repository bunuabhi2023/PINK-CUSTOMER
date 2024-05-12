import axios from "axios";
import { server } from "../store";


// get account-profile details of customer:-
export const getMyOrders = () => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "getMyOrdersRequest" });
        axios.get(`${server}/get-my-order`, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({ type: 'getMyOrdersSuccess', payload: res.data ? res.data : [] });
            dispatch({ type: 'clearData' });
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong" };
            dispatch({ type: 'getMyOrdersFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'getMyOrdersFail', payload: { aleartData } });
    }
}


// get logs for orders:-
export const getLogsForOrders = (orderNo) => async (dispatch) => {
    console.log({ orderNo });
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "getLogsForOrdersRequest" });
        axios.get(`${server}/get-order-logs/${orderNo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(result => {
            dispatch({ type: 'getLogsForOrdersSuccess', payload: result && result.data && result.data.data ? result.data.data : [] });
            dispatch({ type: 'clearData' });
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'getLogsForOrdersFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'getLogsForOrdersFail', payload: { aleartData } });
    }
}


// get logs for orders:-
export const getResponseOnOrderSuccessfull = (orderNo) => async (dispatch) => {
    console.log({ orderNo });
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "getResponseDataRequest" });
        axios.get(`${server}/get-by-order_no/${orderNo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(result => {
            dispatch({ type: 'getResponseDataSuccess', payload: result && result.data && result.data.product_order ? result.data.product_order : [] });
            dispatch({ type: 'clearData' });
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'getResponseDataFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'getResponseDataFail', payload: { aleartData } });
    }
}

import axios from "axios";
import { server } from "../store";


// get account-profile details of customer:-
export const getAccountDetails = () => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "accountDetailsRequest" });
        axios.get(`${server}/get-customer-profile`, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            dispatch({ type: 'accountDetailsSuccess', payload: res && res.data ? res.data : [] });
            dispatch({ type: 'clearData' });
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "please enter correct otp" };
            dispatch({ type: 'accountDetailsFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'accountDetailsFail', payload: { aleartData } });
    }
}


// update customers profile details:-
export const updateCustomerDetails = (data) => async (dispatch) => {
    console.log({data});
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "updateCustomerDetailsRequest" });
        axios.post(`${server}/update-customer`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(data => {
            dispatch({ type: 'updateCustomerDetailsSuccess', payload: data });
            dispatch({ type: 'clearData' });
            dispatch(getAccountDetails());
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'updateCustomerDetailsFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'updateCustomerDetailsFail', payload: { aleartData } });
    }
}


// get otp via mail:-
export const getOtpWithMailFunc = (data) => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "verifyWithEmailRequest" });
        axios.post(`${server}/send-email-otp`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            console.log({ res })
            dispatch({ type: 'verifyWithEmailSuccess', payload: res });
            dispatch({ type: 'clearData' });
            dispatch(getAccountDetails());
        }).catch(error => {
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'verifyWithEmailFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'verifyWithEmailFail', payload: { aleartData } });
    }
}


// verify otp with mail:-
export const submitOtpWithMailFunc = (data) => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "submitWithEmailRequest" });
        axios.post(`${server}/verify-customer-mobile-or-email`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            console.log({ res })
            dispatch({ type: 'submitWithEmailSuccess', payload: res });
            dispatch({ type: 'clearData' });
            dispatch(getAccountDetails());
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'submitWithEmailFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'submitWithEmailFail', payload: { aleartData } });
    }
}


// get otp with mobile:-
export const getOtpWithWithMobile = (data) => async (dispatch) => {
    console.log({data});
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "getOtpwithMobileRequest" });
        axios.post(`${server}/send-otp`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            console.log({ res })
            dispatch({ type: 'getOtpwithMobileSuccess', payload: res });
            dispatch({ type: 'clearData' });
            dispatch(getAccountDetails());
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'getOtpwithMobileFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'getOtpwithMobileFail', payload: { aleartData } });
    }
}


// verify otp with mobile no.:-
export const submitOtpWithMobileFunc = (data) => async (dispatch) => {
    console.log({data});
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "submitWithMobileRequest" });
        axios.post(`${server}/verify-customer-mobile-or-email`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            dispatch({ type: 'submitWithMobileSuccess', payload: res });
            dispatch({ type: 'clearData' });
            dispatch(getAccountDetails());
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'submitWithMobileFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'submitWithMobileFail', payload: { aleartData } });
    }
}


// delete address:-
export const deleteAddressFunc = (id) => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "deleteAddressRequest" });
        axios.delete(`${server}/delete-address/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            dispatch({ type: 'deleteAddressSuccess', payload: res });
            dispatch({ type: 'clearData' });
            dispatch(getAccountDetails());
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'deleteAddressFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'deleteAddressFail', payload: { aleartData } });
    }
}



// get address by Id:-
export const getAddressByIdFunc = (id) => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "getAddressByIdRequest" });
        axios.get(`${server}/get-address-by-id/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            dispatch({ type: 'getAddressByIdSuccess', payload: res });
            dispatch({ type: 'clearData' });
            dispatch(getAccountDetails());
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'getAddressByIdFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'getAddressByIdFail', payload: { aleartData } });
    }
}


// update address :-
export const updateAddressFunc = (data) => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem("token"));
        dispatch({ type: "updateAddressRequest" });
        axios.put(`${server}/update-address`, data, {
            headers: {
                Params: null,
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then(res => {
            dispatch({ type: 'updateAddressSuccess', payload: res });
            dispatch({ type: 'clearData' });
            dispatch(getAccountDetails());
        }).catch(error => {
            console.log(error.response.data);
            const aleartData = { status: "error", message: "something went wrong!" };
            dispatch({ type: 'updateAddressFail', payload: { aleartData } });
        })
    }
    catch (error) {
        console.log(error.response.data);
        const aleartData = { status: "error", message: "please try again" };
        dispatch({ type: 'updateAddressFail', payload: { aleartData } });
    }
}

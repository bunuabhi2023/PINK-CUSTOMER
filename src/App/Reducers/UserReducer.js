// Action creators are generated for each case reducer function
// export const {} = counterSlice.actions;

import { createReducer } from '@reduxjs/toolkit';

const userReducer = createReducer(
  {
    userLocation: null,
    user: {},
    isAuthenticated: false,
    isloading: false,
    isOtpSent: false,
    aleartData: null,
    token: '',
    address:[]
  },
  {
    loadUserLocation: state => {
      let location = JSON.parse(localStorage.getItem('userLocation'));
      state.userLocation = location;
      let isAuth = localStorage.getItem('isAuth');
     state.isAuthenticated = isAuth ;
      let user = JSON.parse(localStorage.getItem('user'));
      state.user = user;

    },
    setUserloaction: (state, action) => {
      console.log(action);
      localStorage.setItem('userLocation', JSON.stringify(action.payload));
      state.userLocation = action.payload;
      
    },
    registerRequest: state => {
      state.isloading = true;
    },
    registerFail: (state, action) => {
      console.log({ state });
      state.isloading = false;
      state.aleartData = action.payload.aleartData;
      state.isOtpSent = action.payload.isOtpSent;

      console.log({ state }, { action });
    },
    registerSuccess: (state, action) => {
      state.isloading = false;
      state.aleartData = action.payload.aleartData;
      state.user = action.payload.user;
      state.isOtpSent = action.payload.isOtpSent;
    },
    loginRequest: state => {
      state.isloading = true;
    },
    loginFail: (state, action) => {
      state.isloading = false;
      console.log({ state });
      state.aleartData = action.payload.aleartData;
      console.log({ state }, { action });
    },
    loginSuccess: (state, action) => {
      state.isloading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem("isAuth", true);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
    },
    clearData: state => {
      state.aleartData = null;
      state.isOtpSent = false;
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.token = "";
      localStorage.removeItem("isAuth");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loadUserFail: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setweelSpined:(state,action)=>{
      if (state.user) {
        state.user.has_spun_wheel = 1;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      } else {
        state.user = { has_spun_wheel: 1 }; // Initialize user object
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    addressRequest: state => {
      state.addressLoading = true;
    },
    addressFail: (state, action) => {
      state.addressLoading = false;
      state.address = [];
    },
    addressSuccess: (state, action) => {
      state.addressLoading = false;
      state.address=action.payload;
      console.log({state})

    },

  }
);
export default userReducer;

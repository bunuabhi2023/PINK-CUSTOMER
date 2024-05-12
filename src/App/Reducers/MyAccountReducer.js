import { createReducer } from '@reduxjs/toolkit';


const accountDetailsReducer = createReducer(
  {
    accountDetails: {},
    addresses: [],
    addressById: [],
    isloading: false,
  },
  {
    accountDetailsRequest: state => {
      state.isloading = true;
    },
    accountDetailsFail: (state, action) => {
      console.log({ state });
      state.isloading = false;
      state.accountDetails = {};
      state.addresses = [];
    },
    accountDetailsSuccess: (state, action) => {
      state.isloading = false;
      state.accountDetails = action.payload && action.payload.data && action.payload.data[0] ? action.payload.data[0] : [];
      state.addresses = action.payload && action.payload.address ? action.payload.address : [];
    },

    // get address by ID:-
    getAddressByIdRequest: state => {
      state.isloading = true;
    },
    getAddressByIdFail: (state, action) => {
      state.isloading = false;
      state.aleartData = action.payload.aleartData;
    },
    getAddressByIdSuccess: (state, action) => {
      state.isloading = false;
      state.addressById = action.payload && action.payload.data && action.payload.data.data ? action.payload.data.data : [];
    },
    clearData: state => {
      state.aleartData = null;
      state.isOtpSent = false;
    },
  }
);
export default accountDetailsReducer;

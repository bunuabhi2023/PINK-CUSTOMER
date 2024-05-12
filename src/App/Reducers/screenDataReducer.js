// Action creators are generated for each case reducer function
// export const {} = counterSlice.actions;

import { createReducer } from '@reduxjs/toolkit';

const screenDataReducer = createReducer(
  {
    sliders:null,
    homeChefs:null,
    slidersLoading:false,
    homeChefsLoading:false,
    homeChefLoading:false,
    wheel :null,
    homeChef :null,
    
    cart: {
      homeChef_Id : null,
      tiffin: [],
      product:[],
    }
  },
  {

    slidersRequest: state => {
      state.slidersLoading = true;
    },
    slidersFail: (state, action) => {
      state.slidersLoading = false;
    },
    slidersSuccess: (state, action) => {
      state.slidersLoading = false;
      state.sliders=action.payload;

    },
    cuisineRequest: state => {
      state.slidersLoading = true;
    },
    cuisineFail: (state, action) => {
      state.slidersLoading = false;
    },
    cuisineSuccess: (state, action) => {
      state.slidersLoading = false;
      state.cuisine=action.payload;

    },
    categoryRequest: state => {
      state.slidersLoading = true;
    },
    categoryFail: (state, action) => {
      state.slidersLoading = false;
    },
    categorySuccess: (state, action) => {
      state.slidersLoading = false;
      state.category=action.payload;

    },
    homeChefsRequest: state => {
      state.homeChefsLoading = true;
    },
    homeChefsFail: (state, action) => {
      state.homeChefsLoading = false;
    },
    homeChefsSuccess: (state, action) => {
      state.homeChefsLoading = false;
      state.homeChefs=action.payload;

    },
    homeChefRequest: state => {
      state.homeChefLoading = true;
    },
    homeChefFail: (state, action) => {
      state.homeChefLoading = false;
    },
    homeChefSuccess: (state, action) => {
      state.homeChefLoading = false;
      state.homeChef=action.payload;

    },
    weelsuccess: (state, action) => {
      state.wheel=action.payload;
    },

  }
);
export default screenDataReducer;

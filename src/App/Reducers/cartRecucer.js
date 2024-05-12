
import { createReducer } from '@reduxjs/toolkit';

const cartReducer = createReducer(
  {
    cart:{
        cart_count: 0,
        reachable: true,
        cart_details: [],
        delivery_charge: "0.00",
        home_chef_id: null,
        home_chef_name: ""
    },
  
},
{
    cartRequest: state => {
        state.cartLoading = true;
      },
      cartFail: (state, action) => {
        state.cartLoading = false;
        state.cart =  {
            cart_count : 0,
            reachable:true,
            cart_details: [],
            delivery_charge:0,
            home_chef_id:null,
            home_chef_name :""
        }
      },
      cartSuccess: (state, action) => {
        state.cartLoading = false;
        state.cart=action.payload;
        console.log({state})
        
  
      },

}
);
export default cartReducer;

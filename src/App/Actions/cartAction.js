import axios from "axios";
import { server } from "../store";
import { logout } from "./UserAction";

export const loadCart = (address, deliveryDate, deliveryTime) => async (dispatch) => {
  dispatch({ type: "cartRequest" });
// Create a new Date object representing the current date and time
const currentDate = new Date();

// Extract various components of the current date and time
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();

// Create a formatted string for the current date and time
const delivery_date =  deliveryDate|| `${year}-${month}-${day}`;
const delivery_time =  deliveryTime||`${hours}:${minutes}`;




  try {
    let latitude;
    let longitude;
    console.log({ address })
    if (!address) {
      let userLocation = JSON.parse(localStorage.getItem("userLocation"));
      latitude = userLocation.latitude;
      longitude = userLocation.longitude;

    }
    else {
      latitude = address.latitude;
      longitude = address.longitude;
    }

    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post(`${server}/my-cart`,
    {
      delivery_date,delivery_time,
      latitude, longitude
        }
    , {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response.data;
    console.log(response.data)
    const cartDetailsParsed = JSON.parse(data[0].cart_details);
    const cartDetailsArray = Array.isArray(cartDetailsParsed) ? cartDetailsParsed : Object.values(cartDetailsParsed);

    var cartCount = 0;

for (var i = 0; i < cartDetailsArray.length; i++) {
  cartCount += cartDetailsArray[i].quantity;
}

    const cartData = {
      cart_count: cartCount || 0,
      cart_details: cartDetailsArray || [],
      delivery_charge: data[0].delivery_charge || 0,
      home_chef_id: data[0].home_chef_id || null,
      home_chef_name: data[0].home_chef_name || "",
      reachable: response.data.reachable || 0,
      total_Item_price: response.data.total_Item_price || 0,
      total_amount: response.data.total_amount || 0,
    };


    console.log({ data: cartData });

    dispatch({ type: "cartSuccess", payload: cartData });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logout());
    } else {
      dispatch({ type: "cartFail" });
    }
  }
};

export const removeToCart = (data) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));


    const response = await axios.post(`${server}/remove-items`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return dispatch(loadCart());
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logout());
    }
    console.log(error);
  }
};

export const addToCart = (data, toast ,onClose) => async (dispatch) => {
  try {
    const { latitude, longitude } = JSON.parse(localStorage.getItem("userLocation"));
    const token = JSON.parse(localStorage.getItem("token"));

    const sendData = { ...data, longitude, latitude };

    const response = await axios.post(`${server}/add-to-cart`, sendData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(loadCart());

    if(onClose) onClose();
    console.log(response.data);
    
    toast({
      title: "success",
      description: "product is successfully added",
      status: "success",
      duration: 3000, // Optional: How long the toast should be visible
      isClosable: true, // Optional: Whether the toast can be closed by the user
    });


  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logout());
    }
    console.log(error);
  }
};
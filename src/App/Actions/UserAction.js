import axios from "axios";
import { server } from "../store";

export const loadUserLocation = () => async (dispatch) => {
  dispatch({ type: "loadUserLocation" });
}
export const setUserloaction = () => async (dispatch) => {
  let location = JSON.parse(localStorage.getItem('userLocation'));
  if (location)
    return dispatch({ type: "setUserloaction", payload: location });
else 
  try {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        console.log({ latitude });
        console.log({ longitude });

        const apiKey = 'AIzaSyBu-1J0jqRDpjCh8-LdTm9CvpPdhgCiVFo';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
          const results = data.results;
          if (results.length > 0) {
            const addressComponents = results[0].address_components;
            const address = results[0].formatted_address;
            let country, city, postalCode, streetAddress, state;

            for (let component of addressComponents) {
              if (component.types.includes('country')) {
                country = component.short_name;
              }
              if (component.types.includes('locality') || component.types.includes('administrative_area_level_1')) {
                city = component.long_name;
              }
              if (component.types.includes('postal_code')) {
                postalCode = component.long_name;
              }
              if (component.types.includes('route')) {
                streetAddress = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
              }
            }

            const location = {
              latitude,
              longitude,
              country,
              city,
              postalCode,
              streetAddress,
              state,
              address
            };
            dispatch({ type: "setUserloaction", payload: location });

          } else {
            console.log('No results found.');
          }
        } else {
          console.log(`Geocoding API error: ${data.status}`);
        }
      },
      (error) => {
        console.log('Error retrieving geolocation:', error);
      }

      , { enableHighAccuracy: true });

  } catch (error) {
    console.log('Error retrieving geolocation data:', error);
  }
}
export const setUserCurrentLocation = () => async (dispatch) => {

  try {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(position);
        console.log({ latitude });
        console.log({ longitude });

        const apiKey = 'AIzaSyBu-1J0jqRDpjCh8-LdTm9CvpPdhgCiVFo';
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.status === 'OK') {
          const results = data.results;
          if (results.length > 0) {
            const addressComponents = results[0].address_components;
            const address = results[0].formatted_address;
            let country, city, postalCode, streetAddress, state;

            for (let component of addressComponents) {
              if (component.types.includes('country')) {
                country = component.short_name;
              }
              if (component.types.includes('locality') || component.types.includes('administrative_area_level_1')) {
                city = component.long_name;
              }
              if (component.types.includes('postal_code')) {
                postalCode = component.long_name;
              }
              if (component.types.includes('route')) {
                streetAddress = component.long_name;
              }
              if (component.types.includes('administrative_area_level_1')) {
                state = component.long_name;
              }
            }

            const location = {
              latitude,
              longitude,
              country,
              city,
              postalCode,
              streetAddress,
              state,
              address
            };
            dispatch({ type: "setUserloaction", payload: location });
            window.location.reload();

          } else {
            console.log('No results found.');
          }
        } else {
          console.log(`Geocoding API error: ${data.status}`);
        }
      },
      (error) => {
        console.log('Error retrieving geolocation:', error);
      }

      , { enableHighAccuracy: true });

  } catch (error) {
    console.log('Error retrieving geolocation data:', error);
  }
}



export const setUserInputLocation = ({ latitude, longitude }) => async (dispatch) => {

  try {


    const apiKey = 'AIzaSyBu-1J0jqRDpjCh8-LdTm9CvpPdhgCiVFo';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status === 'OK') {
      const results = data.results;
      if (results.length > 0) {
        const addressComponents = results[0].address_components;
        const address = results[0].formatted_address;
        let country, city, postalCode, streetAddress, state;

        for (let component of addressComponents) {
          if (component.types.includes('country')) {
            country = component.short_name;
          }
          if (component.types.includes('locality') || component.types.includes('administrative_area_level_1')) {
            city = component.long_name;
          }
          if (component.types.includes('postal_code')) {
            postalCode = component.long_name;
          }
          if (component.types.includes('route')) {
            streetAddress = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          }
        }

        const location = {
          latitude,
          longitude,
          country,
          city,
          postalCode,
          streetAddress,
          state,
          address
        };
       dispatch({ type: "setUserloaction", payload: location });
       debugger
      window.location.reload();


      } else {
        console.log('No results found.');
      }
    } else {
      console.log(`Geocoding API error: ${data.status}`);
    }


  } catch (error) {
    console.log('Error retrieving geolocation data:', error);
  }
}

export const getMyProfile = () => async (dispatch) => {
  dispatch({ type: "loadUserRequest" });
  try {
    const auth = JSON.parse(localStorage.getItem('isAuth'));
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    if (auth && user && token) {
      dispatch({
        type: 'loadUserSuccess', payload: {
          user: JSON.parse(localStorage.getItem('user'))
          , token: token
        }
      });
    }
    else dispatch({ type: 'loadUserFail' });
  } catch (e) {
    if (e.response && e.response.status === 401) {
      dispatch({ type: 'logoutSuccess' });

    }
    else
      dispatch({ type: 'loadUserFail' });
  }
}

export const loginUser = (mobile_number, otp, device_token) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });
    let sendingData = {
       mobile_number, otp,  
    }
    if(device_token)
    {
      sendingData.device_token = device_token;

    }
    axios.post(`${server}/customer-login`,sendingData, {
      headers: {
        'Content-Type': "application/json",
      }
    }).then(data => {
      console.log({ data })
      let token = data.data.token.original.access_token;
      let user = data.data.token.original.customer;
      dispatch({ type: 'loginSuccess', payload: { token, user } });
      dispatch({ type: 'clearData' });
    }).catch(error => {
      console.log(error.response.data);
      const aleartData = { status: "error", message: "please enter correct otp" };
      dispatch({ type: 'loginFail', payload: { aleartData } });
    })

  }
  catch (error) {
    console.log(error.response.data);
    const aleartData = { status: "error", message: "please try again" };
    dispatch({ type: 'loginFail', payload: { aleartData } });

  }
}
export const registerUser = (email, phone, name) => async (dispatch) => {
  try {
    dispatch({ type: "registerRequest" });

    // Perform user registration logic here
    const user = { name, email, mobile_number: phone };
    // const registrationData = { name, email, mobile_number:phone };

    await axios.post(`${server}/register-customer`, user, {
      headers: {
        'Content-Type': "application/json",
      },
    }).then((res) => {
      const aleartData = { status: "success", message: "Registration successful. OTP sent successfully." };
      dispatch({ type: 'registerSuccess', payload: { aleartData, isOtpSent: true, user: null } });

    }).catch((error) => {
      console.log(error)
      const msg = error.response.data.message;

      const aleartData = { status: "error", message: msg.includes("SQL") ? "User already Exist" : msg };

      dispatch({ type: 'registerFail', payload: { aleartData, isOtpSent: false } });

    })
  } catch (error) {
    console.log(error.response.data);

    const aleartData = { status: "error", message: "Registration failed." };
    dispatch({ type: 'registerFail', payload: { aleartData, isOtpSent: false } });
  }
}
export const sendOtp = (mobile_number) => async (dispatch) => {
  try {
    axios.post(`${server}/send-otp`, { mobile_number }, {
      headers: {
        'Content-Type': "application/json",
      }
    }).then((res) => {
      const aleartData = { status: "success", message: "OTP sent successfully." };
      dispatch({ type: 'registerSuccess', payload: { aleartData, isOtpSent: true, user: null } });

    }).catch((error) => {
      console.log(error)
      const msg = error.response.data.message;
      const aleartData = { status: "error", message: msg.includes("SQL") ? "Please check your Number" : msg };

      dispatch({ type: 'registerFail', payload: { aleartData, isOtpSent: false } });

    })
  } catch (error) {
    console.log(error.response);

    const aleartData = { status: "error", message: "Registration failed." };
    dispatch({ type: 'registerFail', payload: { aleartData, isOtpSent: false } });
  }

}
export const logout = () => async (dispatch) => {
  dispatch({ type: 'logoutSuccess' });
}




export const allAddress = () => async (dispatch) => {
  dispatch({ type: "addressRequest" });

  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(`${server}/all-address`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response.data;
    console.log(response.data)

    dispatch({ type: "addressSuccess", payload: data });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logout());
    } else {
      dispatch({ type: "addressFail" });
    }
  }
};

export const AddAddress = (data) => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));


    const response = await axios.post(`${server}/create-address`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return dispatch(allAddress());

  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logout());
    }
    console.log(error);
  }
};
import axios from "axios";
import { server } from "../store";


export const loadSliders = () =>async (dispatch)=>{
    dispatch({ type: 'slidersRequest'});

       axios.get(`${server}/all-slider`, {
            headers:{
                'Content-Type' :"application/json",
            }
        }).then((res)=>{
            console.log(res.data.data)
          dispatch({ type: 'slidersSuccess', payload: res.data.data });
        }).catch ((error)=>{
          console.log(error)    
          dispatch({ type: 'slidersFail'});
    
        })
    
  }
export const loadCusines = () =>async (dispatch)=>{
    dispatch({ type: 'cuisineRequest'});

       axios.get(`${server}/all-cuisine`, {
            headers:{
                'Content-Type' :"application/json",
            }
        }).then((res)=>{
            console.log(res.data.data)
          dispatch({ type: 'cuisineSuccess', payload: res.data.data });
        }).catch ((error)=>{
          console.log(error)    
          dispatch({ type: 'cuisineFail'});
    
        })
    
  }
export const loadCategory = () =>async (dispatch)=>{
    dispatch({ type: 'categoryRequest'});

       axios.get(`${server}/all-category`, {
            headers:{
                'Content-Type' :"application/json",
            }
        }).then((res)=>{
            console.log(res.data.data)
          dispatch({ type: 'categorySuccess', payload: res.data.data });
        }).catch ((error)=>{
          console.log(error)    
          dispatch({ type: 'categoryFail'});
    
        })
    
  }
export const loadHomeChefs = (longitude,latitude,category_id,cuisine_id,page =1) =>async (dispatch)=>{
    dispatch({ type: 'homeChefsRequest'});
let data = {longitude,latitude}
if(category_id){
  data.category_id = category_id;
}
if(cuisine_id)
{
  data.cuisine_id= cuisine_id;
}
       axios.post(`${server}/get-home-chef?page=${page}`,data ,{
            headers:{
                'Content-Type' :"application/json",
            }
        }).then((res)=>{
            console.log("homechef: ",res.data.data)
          dispatch({ type: 'homeChefsSuccess', payload: res.data.data });
        }).catch ((error)=>{
          console.log(error)    
          dispatch({ type: 'homeChefsFail'});
    
        })
    
  }
export const getHomechefById = (id) =>async (dispatch)=>{
    dispatch({ type: 'homeChefRequest'});

       axios.get(`${server}/get-home-chef-details/${id}`,{
            headers:{
                'Content-Type' :"application/json",
            }
        }).then((res)=>{
            console.log("homechef: ",res.data.data)
          dispatch({ type: 'homeChefSuccess', payload: res.data.data });
        }).catch ((error)=>{
          console.log(error)    
          dispatch({ type: 'homeChefFail'});
    
        })
    
  }
export const SpinWeel = () =>async (dispatch)=>{
  let token = JSON.parse(localStorage.getItem('token'));

       axios.get(`${server}/spin-wheel`,{
            headers:{
                'Content-Type' :"application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((res)=>{
          console.log(res.data);
          dispatch({ type: 'weelsuccess', payload: {reward :"20% off"} });
        }).catch ((e)=>{
          console.log(e)  
          dispatch({ type: 'weelsuccess', payload: {reward :"20% off"} });
  
          if (e.response && e.response.status === 401) {
            dispatch({ type: 'logoutSuccess' })   
          }    
        })
    
  }

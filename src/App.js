// App.js
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

import Home from './Pages/Home/Home';
import Layout from './Pages/Layout/Layout';
import HomeChefProfile from './Pages/HomeChefProfile/HomeChefProfile';
import { useDispatch, useSelector } from 'react-redux';
import { setUserloaction } from './App/Actions/UserAction';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/Signup';
import ProtectedRoute from './Pages/PrivateRoute';
import Cart from './Pages/Cart/Cart';
import Chef from './Pages/Chef';
import CategoriesPage from './Pages/CategoriesPage';
import TiffinProduct from './Pages/TiffinProduct/TiffinProduct';
import BecomeAHomechef from './Pages/Home/BecomeAHomechef/BecomeAHomechef';
import OurStory from './Pages/Home/OurStory/OurStory';
import ScrollToTop from './ScrollTOp';
import { MyAccountAndProfile } from './Components/ProfileComponents/MyAccountAndProfile';
import { CurrentOrders } from './Components/ProfileComponents/CurrentOrders';
import { OrderHistory } from './Components/ProfileComponents/OrderHistory';
import { TiffinHistoryPage } from './Components/ProfileComponents/TiffinHistoryPage';
import { LunchItemsPage } from './Components/ProfileComponents/LunchItemsPage';
import { DinnerItemsPage } from './Components/ProfileComponents/DinnerItemsPage';
import { ThankYouPage } from './Components/PageFolder/ThankYouPage';
import { Box, Flex, Text, VStack } from '@chakra-ui/layout';
import axios from 'axios';
import { useState } from 'react';
import { Products } from './Pages/Home/Components/Tabs/Tabs';
import { server } from './App/store';
import { Spinner } from '@chakra-ui/spinner';
import { PinkApronsCredits } from './Components/ProfileComponents/PinkApronsCredits';
import { loadCart } from './App/Actions/cartAction';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(user => user.user);

  useEffect(() => {
    dispatch({ type: "loadUserLocation" })
    dispatch(setUserloaction());
    dispatch(loadCart())
  }, [dispatch]);

  let auth = localStorage.getItem('isAuth') || isAuthenticated;
  console.log({auth})

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/become-a-home-chef" element={<BecomeAHomechef />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        <Route path="/chef" element={<Layout><Chef /></Layout>} />
        <Route path="/categories" element={<Layout><CategoriesPage /></Layout>} />
        <Route path="/home-chef/:nameandid" element={<Layout><HomeChefProfile /></Layout>} />
        <Route path="/tiffin-page" element={<Layout><TiffinProduct /></Layout>} />
        <Route path='/login' element={<ProtectedRoute isAuthenticated={!auth} redirect='/'><Login /></ProtectedRoute>} />
        <Route path="/signup" element={<ProtectedRoute isAuthenticated={!auth} redirect="/"><SignUp /></ProtectedRoute>} />

        <Route path="/my-account-and-profile" element={<ProtectedRoute isAuthenticated={auth} redirect="/login"><Layout><MyAccountAndProfile /></Layout></ProtectedRoute>} />
        <Route path="/current-orders" element={<ProtectedRoute isAuthenticated={auth} redirect="/login"><Layout><CurrentOrders /></Layout></ProtectedRoute>} />
        <Route path="/order-history" element={<ProtectedRoute isAuthenticated={auth} redirect="/login"><Layout><OrderHistory /></Layout></ProtectedRoute>} />
        <Route path="/tiffins-history" element={<ProtectedRoute isAuthenticated={auth} redirect="/login"><Layout><TiffinHistoryPage /></Layout></ProtectedRoute>} />
        <Route path="/lunch-items" element={<ProtectedRoute isAuthenticated={auth} redirect="/login"><Layout><LunchItemsPage /></Layout></ProtectedRoute>} />
        <Route path="/dinner-items" element={<ProtectedRoute isAuthenticated={auth} redirect="/login"><Layout><DinnerItemsPage /></Layout></ProtectedRoute>} />
        <Route path="/thank-you/:order_no" element={<ProtectedRoute isAuthenticated={auth} redirect="/login"><Layout><ThankYouPage /></Layout></ProtectedRoute>} />
        <Route path="/pinkaprons-credits" element={<ProtectedRoute isAuthenticated={auth} redirect="/login"><Layout><PinkApronsCredits /></Layout></ProtectedRoute>} />


      </Routes>
    </Router>

  );
}

export default App;





const API_URL = `${server}/get-home-chef`; // Replace with your API URL

const InfiniteScrollComponent = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loc = useLocation();
  const queryParams = new URLSearchParams(loc.search);
  const category_id = parseInt(queryParams.get('category_id'));
  const cuisine_id = parseInt(queryParams.get('cuisine_id'));


  const location = JSON.parse(localStorage.getItem('userLocation'));
  const fetchData = async () => {
    if (currentPage > totalPages) return; // Stop fetching when all pages are loaded
    setIsLoading(true);
    try {

      const data = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      if (!Number.isNaN(category_id)) {
        data.category_id = category_id;
      }

      if (!Number.isNaN(cuisine_id)) {
        data.cuisine_id = cuisine_id;
      }

      const response = await axios.post(`${API_URL}?page=${currentPage}`, data);

      const { total_page: newTotalPages, data: newData } = response.data;
      setData(prevData => [...prevData, ...newData]);
      setTotalPages(newTotalPages);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  setCurrentPage(1);
  setData([]);
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 





  const handleScroll = () => {
      // Log the scroll positions to determine the threshold value
  

const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
const isMobile = window.innerWidth <= 448; // Adjust the breakpoint as needed

// For desktop, trigger the fetch when the user reaches the bottom of the page
// For mobile, use a threshold value (50px in this case) from the bottom to trigger the fetch
const isFetchingRequired = isMobile
  ? scrollTop + clientHeight >= scrollHeight - clientHeight - 10
  : scrollTop + clientHeight >= scrollHeight - 10;

if (isFetchingRequired && !isLoading) {
  fetchData();
}

  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  const uniqueIds = {};

  const filteredData = data.filter((homechef) => {
    if (!uniqueIds[homechef.id]) {
      uniqueIds[homechef.id] = true;
      return true;
    }
    return false;
  });
  return (
    <Box w="full" mx={'auto'}  px={[2,2]}>
{ filteredData.length > 0 ?     <Flex maxW={'1224px'}  mx={'auto'} px={[4,8]} rowGap={[4,12]} mt="4" flexWrap={'wrap'} justifyContent={'space-around'}>
        {filteredData.map((homechef, index) => (
          <Products
            key={homechef.id}
            title={homechef.home_chef_name}
            id={homechef.id}
            image={homechef.logo[0]}
            ratings={homechef.rating}
          />
        ))}
      </Flex> : <Flex w="100%" h ="60vh" justifyContent={'center'} alignItems={'center'}>
        <Text>        no data 
</Text>
        </Flex>}
      {isLoading &&  <Flex w="100%" h ="60vh" justifyContent={'center'} alignItems={'center'}>
        <Spinner>  Loading...
</Spinner>
</Flex>}
    </Box>
  );
};

export  {InfiniteScrollComponent};



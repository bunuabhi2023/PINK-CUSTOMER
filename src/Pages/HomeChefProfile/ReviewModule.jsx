import { Textarea, VStack, Button, HStack, Avatar, Text, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { server } from '../../App/store';
import { getHomechefById } from '../../App/Actions/screenDataReducerAction';

// Assume the user's profile image URL and name


function ReviewModule({homeChefId}) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${server}/home-chefs-ratings/${homeChefId}`);
      const reviewsData = response.data.data;
      console.log({reviewsData})
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [homeChefId]);

  const {user, isAuthenticated:isLoggedIn} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const postReview = async () => {
    if (!isLoggedIn) {
      setShowAlert(true);
      return;
    }

    if (newReview.trim() === '' || rating === 0) {
      return;
    }

    try {
      const reviewData = {
        home_chef_id: homeChefId, // Replace 6 with the actual home chef ID
        rating,
        comment: newReview,
      };
      // Assuming you have the user's authentication token stored in local storage
      const token = JSON.parse(localStorage.getItem('token'));
      const headers = { Authorization: `Bearer ${token}` };

      // Make the API call to post the review
      await axios.post(`${server}/store-ratings`, reviewData, { headers });

      // If the review was successfully posted, update the local state with the new review
      // setReviews([...reviews, { review: newReview, rating }]);

      await fetchReviews();
      setNewReview('');
      dispatch(getHomechefById(homeChefId));

      setRating(0);
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };


  return (
    <VStack minH="80vh" w="full" spacing={6}>
      {/* Review Input Section */}
{  user && user.id && reviews.find((rev)=> rev.customer_id === user.id ) ? <></> :<> <HStack w="full" alignItems="flex-start">
        <Avatar size="md" src={user?.file || ""} alt={user?.name || "User"} />
        <VStack w="full">
          <Textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = 'pink')}
            onBlur={(e) => (e.target.style.borderColor = '')}
            placeholder={`Write your review, ${user?.name || "User"}...`}
            variant="outline"
            borderColor="gray.400"
            _focus={{ borderColor: 'pink' }}
          />
<HStack display={['none', 'block']}>
<Rating
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={48} // Increased star size
            activeColor="#f50057"
          />
</HStack>
<HStack display={['block', 'none']}>
<Rating
            count={5}
            value={rating}
            onChange={(newRating) => setRating(newRating)}
            size={28} // Increased star size
            activeColor="#f50057"
          />
</HStack>
          {showAlert && (
            <Alert status="error" variant="solid" mb={4}>
              <AlertIcon />
              Please log in to leave a review.
            </Alert>
          )}
        </VStack>
      </HStack>
<HStack w="full" justify={'end'}>
{!isLoggedIn ? (
            <Link to="/login">
              <Button colorScheme="pink">Login to Add Review</Button>
            </Link>
          ) : (
            <Button colorScheme="pink" onClick={postReview}>
              Add Review
            </Button>
          )}
</HStack>
</> 

}
      {/* Reviews Display Section */}
      <VStack w="full" spacing={4} fontSize={['sm','md']}>
        {reviews.map((reviewItem, index) => (
          <HStack key={index} borderRadius="8px" p={4} w="full">
            <Avatar size={["sm", 'md' ]}src={reviewItem?.customer_image} alt={reviewItem?.customer_name || 'user'} />
            <VStack align="flex-start" spacing={1}>
              <Text textTransform={'capitalize'} fontWeight="bold">{reviewItem?.customer_name || 'user'}</Text>
              <Text>{reviewItem.comment}</Text>
              <Text>Rating: {reviewItem.rating} Stars</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      
    </VStack>
  );
}

export default ReviewModule;

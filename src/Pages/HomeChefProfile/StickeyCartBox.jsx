import React, { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const StickyBox = ({homeChefId}) => {

    const { cart } = useSelector(state => state.cart);
if(parseInt(homeChefId) === parseInt(cart.home_chef_id))
  return (
<Link to='/cart'>
<Box
      pos="fixed"
      bottom="20px"
      w={['100%','70%']}
      left="50%"
    
      zIndex={100}
      transform="translateX(-50%)"
      bg='#60b246'
      borderRadius="5px"
      p="10px 20px"
      boxShadow="0px 2px 4px rgba(0, 0, 0, 0.2)"
    >
      <Button
        variant="unstyled"
        color="white"
        fontSize="16px"
        _hover={{ backgroundColor: '#2980b9' }}
      >
        Cart (<span>{cart.cart_count}</span>)
      </Button>
    </Box>
    </Link>
  );
  else return (<></>)
};

export default StickyBox;

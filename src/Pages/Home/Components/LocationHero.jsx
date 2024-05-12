import * as React from 'react';
import {
  Container,
  Heading,
  Stack,
  HStack,
  Text,
  Button,
  Image,
  Skeleton,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  VStack,
  FormLabel,
  Flex,
  InputRightAddon,
  InputLeftAddon,
  IconButton,
  ListItem,
  List,
} from '@chakra-ui/react';

import { useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { css, keyframes } from "@emotion/react";
import { SearchIcon } from '@chakra-ui/icons';
import { BiLocationPlus } from 'react-icons/bi';
import { VscSearchStop } from 'react-icons/vsc';
import { setUserInputLocation } from '../../../App/Actions/UserAction';
import { useEffect } from 'react';

const ProductIntro = () => {
  return (
    <Container maxW="container.xl" py={'28'} w="full" background={'#F5F5F5'}>
      <HomePage />
    </Container>
  );
};

export default ProductIntro;




const HomePage = () => {
  return (
    <VStack gap={['4', '8']} mx={'auto'} >
      <Heading as={'h1'} fontFamily={'Sansita Swashed'} textAlign={'center'} size={['2xl', '3xl']} maxW={'container.sm'} px={['2', '12']}>
      Search Home Chefs Based On Your Location
            </Heading>
      <Box fontFamily={'Poppins'} maxW={'container.lg'} px={['2', '12']}>
        <Text fontFamily={'Poppins'} textAlign={'center'} fontSize={['xl', '2xl']} fontWeight={'bold'}>
        Healthy & Hygienic Home-Cooked Food, Garnished With Insane Love        </Text>
        <Text fontFamily={'Poppins'} textAlign={'center'} fontSize={['md', 'xl']}>
        We offer you 1000+ FSSAI Certified home chefs who are champions in multiple cuisines, preparing fresh, hygienic, and lip-smacking home-cooked food, as per your taste and preferences, as and when required!
        </Text>
      </Box>
      <Form />
      <Box display={{ base: 'none', md: "block", lg: 'block' }}>
        <Box style={{ position: "relative", maxWidth: "100%" }}>
          <Box style={{ display: "block", maxWidth: "100%" }}>
            <img
              style={{ display: "block", maxWidth: "100%" }}
              alt=""
              aria-hidden="true"
              src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%272730%27%20height=%271126%27/%3e"
            />
          </Box>
          <img
            alt="delicious salmon"
            srcSet="https://cookin.com/_next/static/media/hero-background.a301ecbf.png?imwidth=3840"
            decoding="async"
            data-nimg="intrinsic"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              boxSizing: "border-box",
              padding: 0,
              border: "none",
              margin: "auto",
              display: "block",
              width: 0,
              height: 0,
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100%",
              maxHeight: "100%",
            }}
          />
        </Box>
      </Box>
      <Box display={{ base: 'block', md: "none", lg: 'none' }}>
        <Box style={{ position: "relative", maxWidth: "100%" }}>
          <Box style={{ display: "block", maxWidth: "100%" }}>
            <img
              style={{ display: "block", maxWidth: "100%" }}
              alt=""
              aria-hidden="true"
              src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%271024%27%20height=%271626%27/%3e"
            />
          </Box>
          <img
            alt="delicious salmon"
            src="https://cookin.com/_next/static/media/hero-background-mobile.76848044.png?imwidth=2048"
            decoding="async"
            data-nimg="intrinsic"
            style={{
              position: "absolute",
              inset: 0,
              boxSizing: "border-box",
              padding: 0,
              border: "none",
              margin: "auto",
              display: "block",
              width: 0,
              height: 0,
              minWidth: "100%",
              maxWidth: "100%",
              minHeight: "100%",
              maxHeight: "100%",
            }}
            srcSet="https://cookin.com/_next/static/media/hero-background-mobile.76848044.png?imwidth=1080 1x, https://cookin.com/_next/static/media/hero-background-mobile.76848044.png?imwidth=2048 2x"
          />
        </Box>
      </Box>
    </VStack>
  );
};


const floatLabelAnimation = keyframes`
  from {
    top: 40px;
    font-size: 14px;
  }
  to {
    top: -10px;
    font-size: 12px;
  }
`;




export function LocationSearchInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (query && window.google && window.google.maps) {
      const newTypingTimeout = setTimeout(() => {
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        const request = {
          input: query,
        };
        autocompleteService.getPlacePredictions(request, (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          }
        });
      }, 500); // Adjust the debounce delay (in milliseconds) as needed

      setTypingTimeout(newTypingTimeout);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const dispatch = useDispatch();

  const handleLocationClick = (placeId) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId: placeId }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const { lat, lng } = results[0].geometry.location;
        const longitude = lng();
        const latitude = lat();

        if (longitude && latitude) {
          const defaultLocation = { latitude, longitude };
          dispatch(setUserInputLocation(defaultLocation)); // Dispatch your Redux action here
          setSuggestions([]);
          setQuery('');
        }
      }
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      zIndex={30}
      w="full"
    >
      <InputGroup>
        <Input
          value={query}
          onChange={handleInputChange}
          type="text"
          py={2}
          background={'transparent'}
          px={3}
          focusBorderColor="transparent"
          _focus={{
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
            borderBottom: '1px black solid'
          }}
          rounded={'none'}
          outline={'none'}
          border={'none'}
          boxShadow={'none'}
          borderBottom={'1px black solid'}
          css={css`
            animation: ${floatLabelAnimation} 0.3s forwards;
            &:focus ~ label {
              top: -30px;
            }
            &:not(:placeholder-shown) ~ label {
              animation: none;
            }
          `}
        />
        <FormLabel
          pos="absolute"
          top={0}
          left={0}
          fontSize="14px"
          px={1}
          color="gray.600"
          transition="0.9s"
          pointerEvents="none"
        >
          Enter your location
        </FormLabel>
        <InputRightAddon border="none" bgColor="transparent" as="button" type="submit">
          <SearchIcon />
        </InputRightAddon>
      </InputGroup>
      <List mt={2} pos="absolute" top={10} background="#F5F5F5" w="full" px={2}>
        {suggestions.map((prediction) => (
          <ListItem
            key={prediction.place_id}
            width={{ base: "100%" }}
            mb={3}
            onClick={() => handleLocationClick(prediction.place_id)}
            cursor="pointer"
          >
            {prediction.description}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}




const Form = () => {
  return (
    <HStack pos="relative" my={4} w="full" maxW={['300px', '500px']} pt={5} gap={0} position={'relative'}>
      <IconButton variant={'ghost'} p={0} m={0}>
        <BiLocationPlus />
      </IconButton>
      <LocationSearchInput />

    </HStack>
  );
};
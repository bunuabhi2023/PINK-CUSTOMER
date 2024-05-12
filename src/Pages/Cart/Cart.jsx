import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import logoimg from '../../Assets/logoWithWhite.jpg';
import React, { useState, useCallback } from 'react';
import { VscSearchStop } from "react-icons/vsc";
import { BiFoodMenu, BiHome, BiLocationPlus, BiMenu, BiMoney } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  loadCart,
  removeToCart,
} from '../../App/Actions/cartAction';
import { useEffect } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { Link, Navigate, Link as RouterLink, useNavigate } from 'react-router-dom';
import { IoMdLogIn } from 'react-icons/io';
import { AddAddress, allAddress } from '../../App/Actions/UserAction';
import useRazorpay from 'react-razorpay';
import axios from 'axios';
import { server } from '../../App/store';
import MapPicker from 'react-google-map-picker';

export default function Cart() {
  const { cart } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);
  const [sideButton, setSideButton] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const setAddress = address => {
    setSelectedAddress(address);
    setSideButton(null);
    setTf(!tf);
    dispatch(loadCart(selectedAddress));
  };
  const [tf, setTf] = useState(false);
  const currentDate = new Date();

  const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
const day = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();

// Create a formatted string for the current date and time
const [delivery_date, setDelivery_date] =  useState(`${year}-${month > 9 ?month  : `0${month}`}-${day }`);
const [delivery_time, setDelivery_time] =  useState(`${hours}:${minutes}`);

  useEffect(() => {
    setSideButton(null);
    dispatch(loadCart(null , delivery_date, delivery_time));
  }, [tf, dispatch,delivery_date,delivery_time]);




  if (isAuthenticated && cart.cart_count > 0)
    return (
      <Flex
        fontFamily={'Poppins'}
        alignItems={'start'}
        pt={['16', '28']}
        w={'full'}
        px={8}
        wrap={'wrap-reverse'}
        justifyContent={'space-between'}
        h={'full'}
        minH={'70vh'}
      >
        <VStack
          pl={[0, 12]}
          minH={'70vh'}
          w="full"
          h={'inherit'}
          maxW={{ base: '100%', md: '60%', lg: '60%', xl: '60%' }}
        >
          <HStack
            w={'full'}
            borderColor={'pink.sideNav'}
            borderWidth={'1px'}
            borderRadius={'lg'}
            p={[0, 1]}
            position={'relative'}
            transition={'ease-in'}
            transitionDuration={'300ms'}
            onClick={() => setSideButton('Address')}
            h={['full', sideButton === 'Address' ? 'full' : 'full']}
            cursor={['full', sideButton === 'Address' ? 'default' : 'pointer']}
            minH={28}
          >
            <Button
              size={'sm'}
              position={'absolute'}
              display={['none', 'block']}
              ml={'-3%'}
              bgColor={sideButton === 'Address' ? 'pink.sideNav' : 'white'}
              variant={sideButton === 'Address' ? 'solid' : 'outline'}
              colorScheme="pink"
            >
              <BiLocationPlus />
            </Button>

            {sideButton !== 'Address' && (
              <VStack w="full">
                {!selectedAddress && <Heading w="full" textAlign={'center'} size={'sm'}>Delivery address</Heading>}


                {selectedAddress && <Text>Selected Address</Text>}
                {selectedAddress && (
                  <Box
                    p={4}
                    bg={'white'}
                    rounded={'lg'}
                    _hover={{ shadow: '2xl' }}
                    w="full"
                  
                  >
                    <VStack
                      w={'full'}
                      alignItems={'start'}
                      px={2}
                      justifyContent={'space-between'}
                      h={'full'}
                      gap={2}
                    >
                      <VStack alignItems={'start'}>
                        <HStack>
                          <Text fontWeight={'bold'}>
                            {selectedAddress.name}
                          </Text>
                          <Text fontSize={'sm'} color={'gray.600'}>
                            {selectedAddress.mobile_number}
                          </Text>
                        </HStack>
                        <Text
                          fontSize={'xs'}
                          color={'gray.600'}
                          noOfLines={'2'}
                        >
                          {selectedAddress.address_line1}
                           {selectedAddress.address_line2}

                        </Text>
                      </VStack>
                    </VStack>
                  </Box>
                )}
              </VStack>
            )}
            {
              <AddressComponent
                setAddress={setAddress}
                sideButton={sideButton}
                setSideButton={setSideButton}
              />
            }
          </HStack>
          <HStack
            w={'full'}
            borderColor={'pink.sideNav'}
            borderWidth={'1px'}
            borderRadius={'lg'}
            p={[0, 1]}
            transition={'ease-in'}
            transitionDuration={'300ms'}
            onClick={() => {
              if (selectedAddress) setSideButton('Payment');
            }}
            cursor={['full', sideButton === 'Payment' ? 'default' : 'pointer']}

            h={['2xs', sideButton === 'Payment' ? '2xs' : '28']}
          >
            <Button
              size={'sm'}
              display={['none', 'block']}
              ml={'-3%'}
              bgColor={sideButton === 'Payment' ? 'pink.sideNav' : 'white'}
              variant={sideButton === 'Payment' ? 'solid' : 'outline'}
              colorScheme="pink"
              transition={'ease-in'}
              transitionDuration={'300ms'}
            >
              <BiMoney />
            </Button>
            {sideButton === 'Payment' && (
              <PaymentComponents selectedAddress={selectedAddress}  delivery_date={delivery_date} delivery_time={delivery_time}/>)
            }
            {sideButton !== 'Payment' && (
              <Heading w="full" textAlign={'center'} size={'sm'}>Payments</Heading>
            )
            }
          </HStack>
        </VStack>
        <VStack
          w="full"
          maxW={{ base: '100%', md: '38%', lg: '38%', xl: '38%' }}
          shadow={'sm'}
          h={'full'}
          minH={['auto', '70vh']}
          justifyContent={'space-between'}
        >
          <VStack w="full">
            <HStack
              w="full"
              bgColor={'rgba(246, 246, 246, 1)'}
              justifyContent={'center'}
              gap={1}
              px={1}
            >
              <Text fontFamily={'Poppins'}>
                {' '}
                Homemade Food Delivered for Foodies!
              </Text>
              <Text>
                <BiFoodMenu />
              </Text>
            </HStack>
            {cart.cart_details.map(product => (
              <ProductCard product={product} homeChefId={cart.home_chef_id} />
            ))}
          </VStack>
          <VStack>
            <Text>Scheduled</Text>
            <Input 
            type='date' 
             onChange={(e) => setDelivery_date(e.target.value)}
             format="YYYY-MM-DD"
             value={delivery_date} 
             />
            <Input type='time' value={delivery_time} onChange={(e) => setDelivery_time(e.target.value)} timeFormate={'12 hr'}/>
          </VStack>
          {cart.reachable ? (
            <VStack w="full" alignSelf={'end'} justifySelf={'end'} px="1">
              {' '}
              <Heading
                fontFamily={'Poppins'}
                fontWeight={'600'}
                size={['sm', 'md']}
                textTransform={'capitalize'}
                textAlign={'start'}
                w={'full'}
              >
                PRICE DETAILS ({cart.cart_count} ITEMS)
              </Heading>
              <HStack justifyContent={'space-between'} w="full">
                <Box>
                  <Text>total items Price</Text>
                </Box>
                <Box>
                  <Text>{cart.total_Item_price}</Text>
                </Box>
              </HStack>
              <HStack justifyContent={'space-between'} w="full">
                <Box>
                  <Text>delivery Charge</Text>
                </Box>
                <Box>
                  <Text>{cart.delivery_charge}</Text>
                </Box>
              </HStack>
              <HStack justifyContent={'space-between'} w="full">
                <Box>
                  <Text>Total Amount</Text>
                </Box>
                <Box>
                  <Text>{cart.total_amount}</Text>
                </Box>
              </HStack>
            </VStack>

          ) : <Text> Not reachable at your place</Text>}
        </VStack>
      </Flex>
    );
  else if (isAuthenticated && cart.cart_count <= 0) {
    return (
      <Flex
        w="full"
        h={'80vh'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
      >
        <Heading size={'md'} fontFamily={'Poppins'}>
          cart is empty
        </Heading>
        <Link to="/">
          <Button colorScheme="pink" variant={'outline'}>
            <HStack gap={'2px'}>
              <BiHome />
              <Text>go to home </Text>
            </HStack>
          </Button>
        </Link>
      </Flex>
    );
  }
  else
    return (
      <Flex
        w="full"
        h={'80vh'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
      >
        <Heading size={'md'} fontFamily={'Poppins'}>
          Please login to access the Cart
        </Heading>
        <Link to="/login">
          <Button colorScheme="pink" variant={'outline'}>
            <HStack gap={'2px'}>
              <IoMdLogIn />
              <Text>Login</Text>
            </HStack>
          </Button>
        </Link>
      </Flex>
    );
}

const ProductCard = ({ product, homeChefId }) => {
  const { isAuthenticated } = useSelector(state => state.user);

  const dispatch = useDispatch();
  
  const toast = useToast();
  const hanleAddProduct = () => {
    dispatch(
      addToCart({
        home_chef_id: homeChefId,
        cart_details: [
          {
            product_id: product.product_id,
            quantity: 1,
            quantity_id: product.quantity_id
          },
        ],
      },toast)
    );
  };
  const hanleRemoveProduct = () => {
    dispatch(
      removeToCart({ home_chef_id: homeChefId, product_id: product.product_id , quantity_id: product.quantity_id})
    );
  };
  const color =
    product.tag === 'veg'
      ? 'rgba(58, 183, 87, 1)'
      : product.tag === 'egg'
        ? 'rgba(250, 136, 60, 1)'
        : 'rgba(255, 99, 71,1)';
  return (
    <HStack
      w={'full'}
      borderColor={'gray.400'}
      borderWidth={'1px'}
      borderRadius={'lg'}
      p={[0, 1]}
    >
      <Flex
        alignSelf={'start'}
        justifyContent={'center'}
        borderRadius={'sm'}
        alignItems="center"
        w={'13px'}
        border={`1px solid ${color}`}
        color={color}
        fontSize={'xx-small'}
        h={'13px'}
      >
        <BsCircleFill />
      </Flex>

      <HStack w={'full'} p={[0, 4]} justifyContent={'space-evenly'}>
        <Image
          w={['70px', '95px']}
          h={['70px', '95px']}
          src={product.image && product.image}
          fallbackSrc="https://webient.in/upload/images/pinkaprons-16805330700.jpg"
        />
        <VStack w="full" maxW={'70%'} alignItems={'start'} p={2}>
          <HStack alignItems={'start'}>
            <Heading size={'sm'}>{product.product_name} ({product.quantity_name})</Heading>
            <Heading size={'sm'} color={'pink.500'}>
              {product.price}
            </Heading>
          </HStack>
        </VStack>
        <VStack justifyContent={'center'} alignItems={'center'}>
          {isAuthenticated ? (
            <HStack borderColor={'pink.500'} borderWidth={'1px'}>
              <Button
                variant="solid"
                rounded={'none'}
                colorScheme="pink"
                size={'sm'}
                onClick={hanleRemoveProduct}
              >
                -
              </Button>
              <Text>{product.quantity}</Text>
              <Button
                variant="solid"
                rounded={'none'}
                colorScheme="pink"
                size={'sm'}
                onClick={hanleAddProduct}
              >
                +
              </Button>
            </HStack>
          ) : isAuthenticated ? (
            <Button
              fontSize={'sm'}
              rounded={'full'}
              colorScheme="pink"
              backgroundColor={'rgba(228, 13, 134, 1)'}
              boxShadow={'0px 4px 24px 0px rgba(228, 13, 134, 0.56)'}
              onClick={hanleAddProduct}
            >
              Add
            </Button>
          ) : (
            <RouterLink to={'/login'}>
              <Button
                fontSize={'sm'}
                rounded={'full'}
                colorScheme="pink"
                backgroundColor={'rgba(228, 13, 134, 1)'}
                boxShadow="0px 4px 24px 0px rgba(228, 13, 134, 0.56)"
              >
                Add
              </Button>
            </RouterLink>
          )}
        </VStack>
      </HStack>
    </HStack>
  );
};

export function AddressComponent({ setAddress, sideButton, setSideButton }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allAddress());

  }, [dispatch]);


  const { address } = useSelector(state => state.user);
  return (
    <VStack
      w={'full'}
      p={2}
      display={sideButton !== 'Address' ? 'none' : 'block'}
    >
      <Heading w={'full'} size={'lg'}>
        Choose the location
      </Heading>
      <Flex
        w="full"
        p={2}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        rowGap={[4, 8]}
      >
        {address.map(ad => (
          <Box
            p={4}
            bg={'white'}
            rounded={'lg'}
            _hover={{ shadow: '2xl' }}
            w={'300px'}
            h={'200px'}
            borderColor={'gray.400'}
            borderWidth={'1px'}
          >
            <VStack
              w={'full'}
              alignItems={'start'}
              px={2}
              justifyContent={'space-between'}
              h={'full'}
              gap={2}
            >
              <VStack alignItems={'start'}>
                <HStack>
                  <Text fontWeight={'bold'}>{ad.name}</Text>
                  <Text fontSize={'sm'} color={'gray.600'}>
                    {ad.mobile_number}
                  </Text>
                </HStack>
                <Text fontSize={'sm'} color={'gray.600'} noOfLines={'3'}>
                  {ad.address_line1}, {ad.address_line2}
                </Text>
              </VStack>
              <Button
                onClick={() => {
                  setAddress(ad);
                  dispatch(loadCart(ad))
                  setSideButton(null);
                }}
              >
                Select Address
              </Button>
            </VStack>
          </Box>
        ))}

        <AddAddressComponent setAddress={setAddress} />
      </Flex>
    </VStack>
  );
}


function AddAddressComponent({ setAddress }) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { userLocation } = useSelector(state => state.user);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [homeNumber, setHomeNumber] = useState('');


  const DefaultLocation = { lat: userLocation.latitude || 200, lng: userLocation.longitude || 200 };
  const DefaultZoom = 15;

  const [location, setLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  let place = useAddressFromCoordinates(location.lat, location.lng);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }




  const dispatch = useDispatch();
  const handleConfirmAddress = () => {
    let cityValue = '';
    let stateValue = '';
    let countryValue = '';
    let postalCodeValue = '';

    if (place.address_components) {
      const components = place.address_components;
      components.forEach((component) => {
        if (component.types.includes('locality')) {
          cityValue = component.long_name;
        } else if (component.types.includes('administrative_area_level_1')) {
          stateValue = component.long_name;
        } else if (component.types.includes('country')) {
          countryValue = component.long_name;
        } else if (component.types.includes('postal_code')) {
          postalCodeValue = component.long_name;
        }
      });

    }
    const addressData = {
      name: name,
      mobile_number: mobileNumber,
      address_line1: homeNumber,
      address_line2: place.formatted_address,
      city: cityValue,
      state: stateValue,
      country: countryValue,
      postal_code: postalCodeValue,
      latitude: location.lat,
      longitude: location.lng
    };

    dispatch(AddAddress(addressData));
    setName('');
    setMobileNumber('');
    setHomeNumber('')
    onClose();
  };
  return (
    <>
      {' '}
      <Box
        cursor={'pointer'}
        onClick={onOpen}
        p={4}
        bg={'white'}
        rounded={'lg'}
        _hover={{ shadow: '2xl' }}
        w={'300px'}
        h={'200px'}
        borderColor={'gray.400'}
        borderWidth={'1px'}
      >
        <Flex
          w="full"
          h={'full'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <BiLocationPlus />
        </Flex>
      </Box>
      <Drawer isOpen={isOpen} onClose={onClose} size={'sm'} >
        <DrawerContent>
          <DrawerCloseButton zIndex={10} />
          <DrawerBody DrawerBody >
            <LocationSearchInput setLocation={setLocation} />
            <Box w="100%" aspectRatio={1} maxH={'300px'}>

              <MapPicker defaultLocation={location}
                zoom={zoom}
                style={{ height: '100%' }}
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey="AIzaSyAfD8PHSx-N3UqHOd0Nz2wL6kLyk9EzVUM"
              />
            </Box>

            <Text>Location : {place.formatted_address}</Text>
            <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Mobile Number:</FormLabel>
              <Input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Hno.:</FormLabel>
              <Input type="text" value={homeNumber} onChange={(e) => setHomeNumber(e.target.value)} />
            </FormControl>
            <Button my="2" onClick={handleConfirmAddress} colorScheme='pink'>Confirm Address</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}


function PaymentComponents({ selectedAddress , delivery_date, delivery_time}) {
  const { user } = useSelector(state => state.user);
  const { cart } = useSelector(state => state.cart);
  const Razorpay = useRazorpay();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const createOrder = async (payment_type) => {
    setLoading(true)
    // debugger;
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(`${server}/create-order`, {
        home_chef_id: cart.home_chef_id,
        payment_type: payment_type,
        total_amount: cart.total_amount,
        customer_address_id: selectedAddress.id,
        order_locked: 0,
        delivery_date,
        delivery_time
      },
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      console.log({ response })
      // debugger;
      if (payment_type === 'cod') {
        dispatch(loadCart())
        setLoading(false)
        return navigate(`/thank-you/${response.data.data}`);
      }
      else if (payment_type === 'rzp') {
        handlePayment(response.data)
      }
      setLoading(false)

      return response.data;

    } catch (error) {
      console.log(error)
      return error;
    }



  }

const [orderType, setOrderType] = useState("rzp")

  const handlePayment = async (order) => {
    console.log(order);
    const options = {
      key: "rzp_live_RFDCf6fNpIDBTl", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "PinkAprons",
      description: "pinkAprons is a  food delivery site ",
      image: { logoimg },
      order_id: order.rzp_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (rs) {
        const token = JSON.parse(localStorage.getItem("token"));

        axios.post(`${server}/success-order`, {
          "order_id": rs.razorpay_order_id,
          "razorpay_payment_id": rs.razorpay_payment_id,
          "generated_signature": rs.razorpay_signature
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res => {
          dispatch(loadCart());
          navigate('/orders');
          console.log(res.data);
        }).catch(e => alert(e));
        console.log(rs)
      },
      prefill: {
        name: order.customer_name,
        email: order.email,
        contact: order.mobile_number,
      },
      notes: {
        address: "order by pinkapprons",
      },
      theme: {
        color: "rgba(247, 35, 150, 1)",
      },
    };
    console.log(options);
    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      dispatch(loadCart());
      navigate('/orders');

    });

    rzp1.open();
  };

  const handleChange = (e)=>{
console.log(e);
setOrderType(e)
  }
  if (cart.cart_count && cart.reachable)
    return (    <VStack w="full" alignItems={'start'} p={4} h={'full'} gap={[8,12]} justifyContent={'center'}>
  <RadioGroup value={orderType} onChange={handleChange} isDisabled={loading} colorScheme='pink' >
  <VStack alignItems={'start'}>
    <Radio value="cod">Cod</Radio>
    <Radio value="rzp">Online Payment</Radio>
  </VStack>
</RadioGroup>

    <Button onClick={() => createOrder(orderType)} isLoading={loading}  colorScheme='pink'>
  {
    orderType === 'cod' ? 'Order': "Make payment"
  }
    </Button>
  </VStack>)
  else if (!cart.reachable) {
    return <Text> not unreachable</Text>
  }
}

export function LocationSearchInput({ setLocation }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [placeholder, setPlaceholder] = useState("Search for a location");
  const [typingTimeout, setTypingTimeout] = useState(null); // New state for debounce timeout

  const typingWaitTime = 300; // Adjust the typing wait time (in milliseconds) as needed

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (query && window.google && window.google.maps) {
      setTypingTimeout(setTimeout(() => {
        const autocompleteService = new window.google.maps.places.AutocompleteService();
        const request = {
          input: query,
        };
        autocompleteService.getPlacePredictions(request, (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          }
        });
      }, typingWaitTime));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleLocationClick = (placeId) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId: placeId }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const { lat, lng } = results[0].geometry.location;
        const longitude = lng();
        const latitude = lat();

        if (longitude && latitude) {
          let DefaultLocation = { lat: latitude, lng: longitude };

          setLocation(DefaultLocation);
          setSuggestions([]);
          setQuery("");
          setPlaceholder(results[0].formatted_address);
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
      bg="white"
      color="black"
    >
      <InputGroup>
        <Input
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        <InputRightAddon
          display={`${query === "" ? "none" : "flex"}`}
          alignItems={"center"}
          justifyContent={"center"}
          children={<VscSearchStop />}
          onClick={() => setQuery("")}
        />
      </InputGroup>
      <List mt={2}>
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



export function useAddressFromCoordinates(latitude, longitude) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = new window.google.maps.LatLng(latitude, longitude);

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            setAddress(results[0]);
          } else {
            setAddress("No address found");
          }
        } else {
          setAddress("Geocoder failed due to: " + status);
        }
      });
    }
  }, [latitude, longitude]);

  return address;
}
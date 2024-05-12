import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  keyframes,
} from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { allAddress, loadUserLocation, logout, setUserCurrentLocation, setUserInputLocation } from '../../App/Actions/UserAction';
import { FaCartPlus, FaLocationArrow, FaUser } from 'react-icons/fa';
import { IoMdLogIn } from 'react-icons/io';
import Logo from '../../Assets/Logo.png';
import ScrollToTop from '../../ScrollTOp';
import { getAccountDetails } from '../../App/Actions/MyAccountAction';
// import { LocationSearchInput } from '../Cart/Cart';
import { BiCurrentLocation, BiLocationPlus } from 'react-icons/bi';
import { css } from '@emotion/react';
import { SingleAddressItem } from '../../Components/PageFolder/SingleAddressItem';
import MapPicker from 'react-google-map-picker';
import { Fragment } from 'react';

export function WithSubnavigation() {
  const { isAuthenticated, user, userLocation } = useSelector(
    state => state.user
  );
  const { isOpen, onToggle } = useDisclosure();
  const signUpDisclosure = useDisclosure();
  const signupRef = useRef();
  const loginRef = useRef();
  const dispatch = useDispatch();

  const { accountDetails } = useSelector(state => state.myAccountDetails);
  const [imageError, setImageError] = useState(false);
  const [image, setImage] = useState('');

  const handleImageError = () => {
    setImageError(true);
  };

  const btnClickHandler = () => {
    console.log('yes');
  };

  useEffect(() => {
    if (accountDetails && accountDetails.file) {
      setImage(accountDetails.file ? accountDetails.file : '');
    }
  }, [accountDetails]);

  useEffect(() => {
    dispatch(getAccountDetails());
  }, [dispatch]);

  return (
    <Box w="full" mx={'auto'} shadow={'xl'} px={['0', '8']}>
      <Flex
        color={'white'}
        minH={'60px'}
        w="full"
        maxW={'container.xl'}
        mx={'auto'}
        py={{ base: 2, md: 1 }}
        px={{ base: 2 }}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <Flex fontSize={['xs', 'sm']} ml={['2', '2']} alignItems={'center'}>
           <Link to={'/'}>
           <Image
              display={{ base: 'none', md: 'block' }}
              h={'auto'}
              w={'60px'}
              src={Logo}
              alt="PinkAprons"
            /></Link>
            {
              userLocation && <UpdateAddressComponent />
              // (
              //   <Button
              //     variant={'ghost'}
              //     colorScheme="blackAlpha"
              //     textColor={'black'}
              //     fontSize={'sm'}
              //     onClick={() => btnClickHandler()}
              //   >
              //     <HStack>
              //       <Text
              //         borderBottom={'2px'}
              //         color="pink.500"
              //         borderBottomColor={'pink.500'}
              //       >
              //         {userLocation.title || userLocation.area || 'Home'}
              //       </Text>
              //       <Text display={['none', 'block']}>
              //         {' '}
              //         {userLocation.address && userLocation.address.length > 30
              //           ? userLocation.address.slice(0, 27) + '...'
              //           : userLocation.address}
              //       </Text>
              //       <Text display={['block', 'none']}>
              //         {' '}
              //         {userLocation.address && userLocation.address.length > 10
              //           ? userLocation.address.slice(0, 7) + '...'
              //           : userLocation.address}
              //       </Text>
              //     </HStack>
              //   </Button>
              // )
            }
          </Flex>
        </Box>

        <HStack gap={2} my={'auto'} w="min-content">
          <DesktopNavigation />

          <Box>
            <Link to="/login">
              <Button
                fontSize={'sm'}
                display={`${isAuthenticated ? 'none' : 'block'}`}
                rounded={'full'}
                colorScheme="pink"
                backgroundColor={'rgba(228, 13, 134, 1)'}
                boxShadow="0px 4px 24px 0px rgba(228, 13, 134, 0.56)"
              >
                <HStack gap={'2px'}>
                  <IoMdLogIn />
                  <Text display={['none', 'block']}>Login</Text>
                </HStack>
              </Button>
            </Link>

            {isAuthenticated && user && (
              <Menu>
                <MenuButton
                  fontSize={'sm'}
                  colorScheme="pink"
                  p={0}
                  rounded={'full'}
                  border={'2px solid rgba(228, 13, 134, 1)'}
                  boxShadow="0px 4px 24px 0px rgba(228, 13, 134, 0.56)"
                >
                  <Avatar
                    src={image && !imageError ? image : ''}
                    onError={handleImageError}
                    size={['xs', 'sm']}
                  />
                </MenuButton>
                <MenuList textColor={'black'} w="max-content" minW={'40'}>
                  <Link to="/my-account-and-profile">
                    <MenuItem
                      variant={'ghost'}
                      colorScheme="blackAlpha"
                      color={'black'}
                    >
                      My Account
                    </MenuItem>
                  </Link>
                  <MenuItem
                    variant={'ghost'}
                    colorScheme="blackAlpha"
                    color={'black'}
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Box>
        </HStack>

        {/* </Stack> */}
      </Flex>

      <MobileNav
        isOpen={isOpen}
        onToggle={onToggle}
        signupRef={signupRef}
        signUpDisclosure={signUpDisclosure}
      />
    </Box>
  );
}

const DesktopNavigation = () => {
  const params = useLocation();
  const { cart_count } = useSelector(state => state.cart.cart);
  return (
    <Stack direction={'row'} spacing={4}>
      <HStack display={['none', 'flex']}>
        {NAV_ITEMS.map(navItem => (
          <Link to={navItem.href}>
            <Button
              size={'sm'}
              variant={'ghost'}
              colorScheme="blackAlpha"
              color={'black'}
              position={'relative'}
            >
              <Box position="relative" display="inline-block">
                <Text>{navItem.title}</Text>
                <Box
                  position="absolute"
                  bottom={-1}
                  left={0}
                  display={['none', 'block']}
                  height="3px"
                  borderRadius={'full'}
                  transitionDuration={'300ms'}
                  backgroundColor="rgba(228, 13, 134, 1)"
                  width={params.pathname === navItem.href ? '25px' : '0px'}
                ></Box>
              </Box>
            </Button>
          </Link>
        ))}
      </HStack>

      <Link to={'/cart'}>
        <Button
          size={'sm'}
          variant={'ghost'}
          colorScheme="blackAlpha"
          color={cart_count > 0 ? 'pink.500' : 'black'}
          s
        >
          <HStack
            mx={'auto'}
            justifyContent={'center'}
            gap={'0'}
            w={'min'}
            position="relative"
          >
            <Box
              position="absolute"
              bottom={-1}
              left={0}
              display={['none', 'block']}
              height="3px"
              borderRadius={'full'}
              backgroundColor="rgba(228, 13, 134, 1)"
              transition={'linear'}
              transitionDuration={'300ms'}
              width={params.pathname === '/cart' ? '25px' : '0px'}
            ></Box>

            <FaCartPlus />
            {cart_count > 0 && (
              <Text color={'pink.500'}>
                {'('}
                {cart_count}
                {')'}
              </Text>
            )}
            <Text display={['none', 'block']}>Cart</Text>
          </HStack>
        </Button>
      </Link>
    </Stack>
  );
};

const MobileNav = ({ isOpen, onToggle, signUpDisclosure }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onToggle}
      bg={useColorModeValue('white', 'gray.800')}
      display={{ md: 'none' }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>PinkAprons</DrawerHeader>
        <DrawerBody>
          {NAV_ITEMS.map(navItem => (
            <MobileNavItem key={navItem.label} {...navItem} />
          ))}

          <Divider />
          <Link to="/signup">
            <Button variant={'solid'} colorScheme="pink">
              Sign Up
            </Button>
          </Link>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: "Chef's",
    href: '/chef',
    others: ['/home-chef'],
  },
  {
    title: 'Categories',
    href: '/categories',
  },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      as="nav"
      id="navbar"
      position="fixed"
      top="0"
      left="0"
      zIndex={1000}
      transition="background-color 0.3s ease-in-out"
      backgroundColor={['white', isScrolled ? 'white' : 'transparent']}
      color={'white'}
      w="100%"
    >
      <ScrollToTop />

      <WithSubnavigation />
    </Box>
  );
}

export default Navbar;

// Work from Lokesh side:-

export function LocationSearchInput({ onClose }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    if (query && window.google && window.google.maps) {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

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
      }, 500); // Adjust the delay time (in milliseconds) as needed

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
          // Do something with the latitude and longitude values
          let DefaultLocation = { latitude: latitude, longitude: longitude };
          dispatch(setUserInputLocation(DefaultLocation));
          setSuggestions([]);
          setQuery('');
          onClose();
        }
      }
    });
  };

  return (
    <Box display="flex" flexDirection="column" position="relative" zIndex={30} w="full">
      <InputGroup>
        <Input
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your location"
          type="text"
        />
      </InputGroup>
      {suggestions.length === 0 && (
        <List mt={2} w="full" px={2} borderWidth={'1px'} borderColor={'gray.400'}>
          <ListItem
            p={[2, 6]}
            width={{ base: '100%' }}
            mb={3}
            onClick={() => {
              dispatch(setUserCurrentLocation());
              onClose();
            }}
            cursor="pointer"
          >
            <HStack>
              <BiCurrentLocation />
              <Text>Get your current location</Text>
            </HStack>
          </ListItem>
        </List>
      )}

      {suggestions.length > 0 && (
        <List
          mt={2}
          w="full"
          px={2}
          borderColor={'gray.400'}
          borderWidth={'1px'}
          overflow={'hidden'}
        >
          {suggestions.map((prediction, i) => (
            <Fragment key={prediction.place_id}>
              <ListItem
                p={[2, 6]}
                width={{ base: '100%' }}
                mb={3}
                onClick={() => handleLocationClick(prediction.place_id)}
                cursor="pointer"
              >
                <HStack>
                  <Text w="12">
                    <BiLocationPlus />
                  </Text>
                  <Text>{prediction.description}</Text>
                </HStack>
              </ListItem>
              {i !== suggestions.length - 1 && <Divider ml={'12'} />}
            </Fragment>
          ))}
        </List>
      )}
    </Box>
  );
}

function UpdateAddressComponent() {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { userLocation,address } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLocationClick = ({longitude ,latitude}) => {

        if (longitude && latitude) {
          // Do something with the latitude and longitude values
          let DefaultLocation = { latitude: latitude, longitude: longitude };
          dispatch(setUserInputLocation(DefaultLocation));
          onClose();

        }

   
  };
  useEffect(() => {
    dispatch(allAddress());

  }, [dispatch]);
  const ad = userLocation.address;
let formattedAddress = ad;

if (ad) {
  // Split the address by comma (assuming the elements are separated by commas)
  const addressParts = ad.split(',');
  formattedAddress = addressParts.slice(1).join(',').trim();

}

  return (
    <>
      {' '}
      <Button
        variant={'ghost'}
        colorScheme="blackAlpha"
        textColor={'black'}
        fontSize={'sm'}
        onClick={onOpen}
      >
        <HStack>
          <Text
            borderBottom={'2px'}
            color="pink.500"
            borderBottomColor={'pink.500'}
          >
            {userLocation.title || userLocation.area || 'Home'}
          </Text>
          <Text display={['none', 'block']}>
            {' '}
            {formattedAddress && formattedAddress.length > 70
              ? formattedAddress.slice(0, 67) + '...'
              : formattedAddress}
          </Text>
          <Text display={['block', 'none']}>
            {' '}
            {formattedAddress && formattedAddress.length > 10
              ? formattedAddress.slice(0, 7) + '...'
              : formattedAddress}
          </Text>
        </HStack>
      </Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose} size={'sm'}>
        <DrawerContent>
          <DrawerBody>
          <DrawerCloseButton pos={'relative'} mb={[4,2]} ml={'auto'} zIndex={10} />

            <LocationSearchInput       onClose = {onClose} />
            {address.length > 0 && <List
        mt={2}
        w="full"
        px={2}
        borderColor={'gray.400'}
borderWidth={'1px'}
        overflow={'hidden'}

      >
        <ListItem           px={[2,6]} py={1}
 >Saved Addresses</ListItem>
        {address.length > 0  && address.map((prediction,i) => (
         <>
     <ListItem
          p={[2,6]}
            key={prediction.place_id}
            width={{ base: '100%' }}
            mb={3}
            onClick={() => handleLocationClick(prediction)}
            cursor="pointer"
          >
              <HStack>
                <Text w="12">        <BiLocationPlus />
</Text>
<VStack alignItems={'start'}>
                <HStack>
                  <Text fontWeight={'bold'}>{prediction.name}</Text>
                  <Text fontSize={'sm'} color={'gray.600'}>
                    {prediction.mobile_number}
                  </Text>
                </HStack>
                <Text fontSize={'sm'} color={'gray.600'} noOfLines={'3'}>
                  {prediction.address_line1}, {prediction.address_line2}
                </Text>
              </VStack>
      </HStack>

           
          </ListItem>
          {
            i !== address.length &&           <Divider ml={'12'}  />
          }
          </> 
        ))}
      </List>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function useAddressFromCoordinatesFunc(latitude, longitude) {
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = new window.google.maps.LatLng(latitude, longitude);

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            setAddress(results[0]);
          } else {
            setAddress('No address found');
          }
        } else {
          setAddress('Geocoder failed due to: ' + status);
        }
      });
    }
  }, [latitude, longitude]);

  return address;
}

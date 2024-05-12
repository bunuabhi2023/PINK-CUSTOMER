import { Box, Button, Checkbox, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, Flex, FormControl, FormLabel, Input, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountDetails, updateCustomerDetails } from "../../App/Actions/MyAccountAction";
import { ProfileSideBar } from "./ProfileSideBar";
import "../../Styles/CommonForProfile.css";
import { TopBoxProfileDetails } from "./TopBoxProfileDetails";
import { EditCustomersProfile } from "../../Modal/EditCustomersProfile";
import { VerifyWithMobileNo } from "../../Modal/VerifyWithMobileNo";
import { VerifyWithMail } from "../../Modal/VerifyWithMail";
import { AddressItemBox } from "./AddressItemBox";
import { LocationSearchInput } from "../../Pages/Cart/Cart";
import { BiLocationPlus } from "react-icons/bi";
import MapPicker from "react-google-map-picker";
import { AddAddress } from "../../App/Actions/UserAction";

const MyAccountAndProfile = () => {

    const { accountDetails, addresses } = useSelector(state => state.myAccountDetails);
    const dispatch = useDispatch();
    const [shouldDispatch, setShouldDispatch] = useState(false);

    useEffect(() => {
        dispatch(getAccountDetails());
    }, [dispatch]);

    useEffect(() => {
        const newDetails = {};

        if (accountDetails && accountDetails.mobile_number) {
            newDetails.mobile_number = accountDetails.mobile_number;
        }
        if (accountDetails && accountDetails.dob) {
            newDetails.dob = accountDetails.dob;
        }
        if (accountDetails && accountDetails.email) {
            newDetails.email = accountDetails.email;
        }
        if (accountDetails && accountDetails.name) {
            newDetails.name = accountDetails.name;
        }
        if (newDetails.file && shouldDispatch) {
            dispatch(updateCustomerDetails(newDetails));
            setShouldDispatch(false);
            return;
        }
    }, [dispatch, accountDetails, shouldDispatch]);


    return (
        <Box
            display="flex"
            flexDir='column'
            width="100%"
            m={'auto'}
            boxSizing="border-box"
             mt={[12,20]}
        >
            <TopBoxProfileDetails />
            <Box
                display="flex"
                width="95%"
                m='auto'
            >
                <Box className="sidebar-box">
                    <ProfileSideBar />
                </Box>
                <Box className="main-box">
                    <Box>
                        <Text
                            fontSize={{ base: "100%", sm: "110%", lg: "120%" }}
                            fontWeight={'bold'}
                            fontFamily='sans-serif'
                            textDecoration={'underline'}
                            p={1}
                        >Profile Details</Text>
                    </Box>
                    <Box width={{ base: '95%', sm: '100%', md: '80%', xl: '60%' }} display="flex" mt={3} flexDir="column">
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <Text mr={1} color="pink.800" fontWeight={500} fontSize={{ base: "90%", sm: '100%', md: '120%' }}>Name</Text>
                            <Text fontWeight={500} fontSize={{ base: "90%", sm: '100%', md: '120%' }}>{accountDetails && accountDetails.name ? accountDetails.name : ""}</Text>
                        </Box>
                        <Box display="flex" flexDir={{ base: 'column', md: 'row' }} mt={3} justifyContent="space-between" width="100%">
                            <Text mr={1} color="pink.800" fontWeight={500} fontSize={{ base: "90%", sm: '100%', md: '120%' }}>Email</Text>
                            <Text fontWeight={500} fontSize={{ base: "90%", sm: '100%', md: '120%' }}>{accountDetails && accountDetails.email ? accountDetails.email : ""}</Text>
                        </Box>
                        {
                            accountDetails &&
                            accountDetails.dob &&
                            <Box display="flex" justifyContent="space-between" mt={3}>
                                <Text mr={1} color="pink.800" fontWeight={500} fontSize={{ base: "90%", sm: '100%', md: '120%' }}>Dob</Text>
                                <Text fontWeight={500} fontSize={{ base: "90%", sm: '100%', md: '120%' }}>{accountDetails && accountDetails.dob ? accountDetails.dob : ""}</Text>
                            </Box>
                        }
                        <Box display="flex" mt={4} justifyContent="space-between" width="100%">
                            <Text mr={1} color="pink.800" fontWeight={500} fontSize={{ base: "90%", sm: '100%', md: '120%' }}>Mobile Number</Text>
                            <Text fontWeight={500} fontSize={{ base: "90%", sm: '100%', md: '120%' }}>{accountDetails && accountDetails.mobile_number ? accountDetails.mobile_number : ""}</Text>
                        </Box>
                        {
                            accountDetails &&
                                !accountDetails.email_verified_at ?
                                (
                                    <Box display="flex" mt={4} justifyContent="space-between" width="100%">
                                        <VerifyWithMail email={accountDetails && accountDetails.email ? accountDetails.email : ""} />
                                    </Box>
                                ) : (
                                    <Box display="flex" mt={4}>
                                        <Checkbox size={'sm'} fontSize={'50%'} color="green" fontWeight="500" colorScheme='green' isChecked={true}>Email Verified</Checkbox>
                                    </Box>
                                )
                        }
                        {
                            accountDetails &&
                                !accountDetails.mobile_otp_verified_at ?
                                (
                                    <Box display="flex" mt={2} justifyContent="space-between" width="100%">
                                        <VerifyWithMobileNo mobNum={accountDetails && accountDetails.mobile_number ? accountDetails.mobile_number : ""} />
                                    </Box>
                                ) : (
                                    <Box display="flex" mt={2}>
                                        <Checkbox size={'sm'} fontSize={'50%'} color="green" fontWeight="500" colorScheme='green' isChecked={true}>Mobile No. Verified</Checkbox>
                                    </Box>
                                )
                        }
                        <Box display="flex" justifyContent="right" mt={2}>
                            <EditCustomersProfile />
                        </Box>
                    </Box>
                    <Box display="flex" flexDir="column" width="100%" mt={4}>
                        <Box>
                            <Text
                                fontSize={{ base: "100%", sm: "110%", lg: "120%" }}
                                fontWeight={'bold'}
                                fontFamily='sans-serif'
                                textDecoration={'underline'}
                                p={1}
                            >Saved Address</Text>
                        </Box>
                        <Box
                            display="grid"
                            gap={2}
                            gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(3,1fr)" }}
                        >
                            {
                                addresses &&
                                addresses.length > 0 &&
                                addresses.map((el) => {
                                    return <AddressItemBox key={el.id} {...el} />
                                })
                            }
                            <Box
                                width="100%"
                                height="auto"
                                minH="150px"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="10px"
                                fontSize="150%"
                                boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"
                                fontWeight="bold"
                                cursor="pointer"
                            >
                                <AddAddressComponent />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export { MyAccountAndProfile };




function AddAddressComponent() {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { userLocation } = useSelector(state => state.user);
    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [homeNumber, setHomeNumber] = useState('');

    const DefaultLocation = { lat: userLocation && userLocation.latitude || 200, lng: userLocation && userLocation.longitude || 200 };
    const DefaultZoom = 15;

    const [location, setLocation] = useState(DefaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    let place = useAddressFromCoordinatesFunc(location.lat, location.lng);

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

        dispatch(AddAddress(addressData))
            .then(() => dispatch(getAccountDetails()));
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
                width="100%"
                height="100%"
                rounded={'lg'}
                borderColor={'gray.400'}
                borderWidth={'1px'}
                _hover={{ bg: "pink" }}
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
                        <Box
                            w="100%"
                            aspectRatio={1}
                            maxH={'300px'}
                        >
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


function useAddressFromCoordinatesFunc(latitude, longitude) {
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
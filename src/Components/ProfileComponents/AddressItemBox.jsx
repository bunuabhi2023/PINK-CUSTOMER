import MapPicker from 'react-google-map-picker';
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, FormControl, FormLabel, Input, Text, useDisclosure } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { deleteAddressFunc, getAccountDetails, getAddressByIdFunc, updateAddressFunc } from "../../App/Actions/MyAccountAction";
import { useEffect, useState } from "react";
import { LocationSearchInput } from "../../Pages/Cart/Cart";
import { useLayoutEffect } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";



const AddressItemBox = ({
    address_line1,
    address_line2,
    city,
    country,
    created_at,
    customer_id,
    deleted_at,
    id,
    latitude,
    longitude,
    mobile_number,
    name,
    postal_code,
    state,
    updated_at,
}) => {

    const dispatch = useDispatch();

    const deleteAddressHandler = (id) => {
        console.log({ id });
        console.log("deleteAddressFunc");
        dispatch(deleteAddressFunc(id));
    }
    return (
        <Box
            width="100%"
            height="auto"
            display="flex"
            justifyContent="space-between"
            borderRadius="10px"
            fontSize="150%"
            boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"
            fontWeight="bold"
            cursor="pointer"
            flexDir="column"
            textAlign="left"
            p={3}
        >
            <Box
                display="flex"
                flexDir='column'
                justifyContent="left"
                alignItems="center"
            >
                <Box fontSize="50%" display="flex" justifyContent="left" width="100%" >
                    <Text mr={1} color='blue.600'>Name</Text><Text>{name}</Text>
                </Box>
                <Box fontSize="50%" display="flex" justifyContent="left" width="100%" >
                    <Text mr={1} color='blue.600'>Mobile No</Text><Text>{mobile_number}</Text>
                </Box>
                <Box fontSize="50%" display="flex" justifyContent="left" width="100%" >
                    <Text mr={1} color='blue.600'>Address1</Text><Text>{address_line1}</Text>
                </Box>
                <Box fontSize="50%" display="flex" justifyContent="left" width="100%" >
                    <Text>{address_line2}</Text>
                </Box>
                <Box fontSize="50%" display="flex" justifyContent="left" width="100%" >
                    <Text mr={1} color='blue.600'>Post Code</Text><Text>{postal_code}</Text>
                </Box>
                <Box fontSize="50%" display="flex" justifyContent="left" width="100%" >
                    <Text mr={1} color='blue.600'>City</Text><Text>{city}</Text>
                </Box>
                <Box fontSize="50%" display="flex" justifyContent="left" width="100%" >
                    <Text mr={1} color='blue.600'>Country</Text><Text>{country}</Text>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                <Button size={'xs'} width="fit-content" colorScheme="red" borderRadius="5px" fontSize={'70%'} onClick={() => deleteAddressHandler(id)}><RiDeleteBin2Line/></Button>
                <UpdateAddressComponent id={id} />
            </Box>
        </Box>
    );
};

export { AddressItemBox };




function UpdateAddressComponent({ id }) {

    const { onOpen, onClose, isOpen } = useDisclosure();
    const { userLocation } = useSelector(state => state.user);
    const [isMapVisible, setIsMapVisible] = useState(false);

    const [name, setName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [homeNumber, setHomeNumber] = useState('');
    const [address2, setAddress2] = useState('');

    const { addressById } = useSelector(state => state.myAccountDetails);
    const dispatch = useDispatch();

    const DefaultLocation = { lat: userLocation && userLocation.latitude || 200, lng: userLocation && userLocation.longitude || 200 };
    const DefaultZoom = 15;

    const [location, setLocation] = useState(DefaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    let place = useAddressFromCoordinatesFunc(location.lat, location.lng);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
        setAddress2('');
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }


    const handleConfirmAddress = () => {
        let cityValue = addressById && addressById[0] && addressById[0].city ? addressById[0].city : '';
        let stateValue = addressById && addressById[0] && addressById[0].state ? addressById[0].state : '';
        let countryValue = addressById && addressById[0] && addressById[0].country ? addressById[0].country : '';
        let postalCodeValue = addressById && addressById[0] && addressById[0].postal_code ? addressById[0].postal_code : '';

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

        const updatedAddress = {
            id: addressById[0].id,
            name: name,
            mobile_number: mobileNumber,
            address_line1: homeNumber,
            address_line2: address2 ? address2 : place.formatted_address,
            city: cityValue,
            state: stateValue,
            country: countryValue,
            postal_code: postalCodeValue,
            latitude: location.lat,
            longitude: location.lng
        };

        console.log({ updatedAddress });
        dispatch(updateAddressFunc(updatedAddress))
            .then(() => dispatch(getAccountDetails()));
        setName('');
        setMobileNumber('');
        setHomeNumber('')
        onClose();
    };

    const handleOpen = () => {
        onOpen();
        dispatch(getAddressByIdFunc(id));
    }

    useEffect(() => {
        setIsMapVisible(true);
    }, []);


    useEffect(() => {
        if (addressById && addressById[0]) {
            setName(addressById[0].name ? addressById[0].name : '');
            setMobileNumber(addressById[0].mobile_number ? addressById[0].mobile_number : '');
            setHomeNumber(addressById[0].address_line1 ? addressById[0].address_line1 : '');
            setAddress2(addressById[0].address_line2 ? addressById[0].address_line2 : '');
        }
    }, [addressById]);

    return (
        <>
            {' '}
            <Button size={'xs'} width="fit-content" colorScheme="green" borderRadius="5px" fontSize={'40%'} onClick={() => handleOpen()}>
                Edit
            </Button>
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
                            {isMapVisible && (
                                <MapPickerComponent
                                    defaultLocation={location}
                                    zoom={zoom}
                                    onChangeLocation={handleChangeLocation}
                                    onChangeZoom={handleChangeZoom}
                                />
                            )}
                        </Box>

                        <Box mt={3}><Text color={'pink.600'}>Location : </Text>{address2 ? address2 : place.formatted_address}</Box>
                        <FormControl mt={3}>
                            <FormLabel>Name:</FormLabel>
                            <Input size={'sm'} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Mobile Number:</FormLabel>
                            <Input size={'sm'} type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel>Hno.:</FormLabel>
                            <Input size={'sm'} type="text" value={homeNumber} onChange={(e) => setHomeNumber(e.target.value)} />
                        </FormControl>
                        <Button my="2" onClick={handleConfirmAddress} colorScheme='pink' size={'sm'}>Update Address</Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}


function MapPickerComponent({ defaultLocation, zoom, onChangeLocation, onChangeZoom }) {
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAfD8PHSx-N3UqHOd0Nz2wL6kLyk9EzVUM&callback=initMap`;
        script.async = true;
        script.defer = true;
        window.initMap = () => setMapReady(true);
        document.body.appendChild(script);

        return () => {
            // Clean up script after unmounting
            document.body.removeChild(script);
            delete window.initMap;
        };
    }, []);

    useEffect(() => {
        if (mapReady) {
            // Initialize the map when mapReady is true
            const map = new window.google.maps.Map(document.getElementById("mapDiv"), {
                center: defaultLocation,
                zoom: zoom,
            });

            const marker = new window.google.maps.Marker({
                position: defaultLocation,
                map: map,
                draggable: true,
            });

            // Update the location and zoom when map changes
            marker.addListener("dragend", () => {
                const newPosition = marker.getPosition();
                onChangeLocation(newPosition.lat(), newPosition.lng());
            });

            map.addListener("zoom_changed", () => {
                const newZoom = map.getZoom();
                onChangeZoom(newZoom);
            });
        }
    }, [mapReady, defaultLocation, zoom, onChangeLocation, onChangeZoom]);

    return <div id="mapDiv" style={{ height: "100%" }}></div>;
}


function useAddressFromCoordinatesFunc(latitude, longitude) {
    const [address, setAddress] = useState("");

    useLayoutEffect(() => {
        if (!window.google) {
            const script = document.createElement("script");
            script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAfD8PHSx-N3UqHOd0Nz2wL6kLyk9EzVUM";
            script.onload = () => {
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
            };
            document.body.appendChild(script);
        }
    }, [latitude, longitude]);


    return address;
}
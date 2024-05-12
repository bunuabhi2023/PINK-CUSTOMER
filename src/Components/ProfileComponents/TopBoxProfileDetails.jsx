import { Box, Button, Image, Text } from "@chakra-ui/react";
import backgroundImg from "../../Assets/background_img_for_profile.avif";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountDetails, updateCustomerDetails } from "../../App/Actions/MyAccountAction";
import { EditCustomersProfile } from "../../Modal/EditCustomersProfile";
import { FiEdit } from "react-icons/fi";
import { getMyOrders } from "../../App/Actions/MyOrdersAction";
import { SidebarDrawerForProfileMenu } from "./SidebarDrawerForProfileMenu";
import { FiCamera } from "react-icons/fi";


const TopBoxProfileDetails = () => {

    const { accountDetails } = useSelector(state => state.myAccountDetails);
    const { productOrder } = useSelector(state => state.myOrdersDetails);
    const dispatch = useDispatch();
    const [shouldDispatch, setShouldDispatch] = useState(false);

    const [imageError, setImageError] = useState(false);
    const [file, setFile] = useState('');
    const [image, setImage] = useState("");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFile(file);

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        setShouldDispatch(true);
    };


    const handleImageError = () => {
        setImageError(true);
    };

    useEffect(() => {
        dispatch(getAccountDetails());
    }, [dispatch]);


    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);


    useEffect(() => {
        if (accountDetails && accountDetails.file) {
            setImage(accountDetails.file ? accountDetails.file : "");
        }
    }, [accountDetails]);

    useEffect(() => {
        const newDetails = {}
        if (file) {
            newDetails.file = file
        }
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
    }, [dispatch, file, accountDetails, shouldDispatch]);


    return (
        <>
            <Box
                display="flex"
                width="95%"
                m={'auto'}
                boxSizing="border-box"
            >
                <Box
                    width={{ base: "100%" }}
                    backgroundImage={backgroundImg}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    backgroundPosition={'center'}
                    backgroundSize={'cover'}
                >
                    <Box width={{ base: '100%', sm: "fit-content" }} display="flex" alignItems={{ base: "flex-end", md: 'center' }} flexDir={{ base: 'column', md: 'row' }}>
                        <Box
                            width={{ base: '100%', sm: "fit-content" }}
                            display="flex"
                            justifyContent="center"
                            pt={4}
                            pb={{ base: 0, md: 4 }}
                            pl={{ base: 'auto', sm: '10%' }}
                            pr={1}
                        >
                            <Box
                                m={'auto'}
                                width={{ base: "170px", md: "185px" }}
                                height={{ base: "170px", md: "185px" }}
                                borderRadius="50%"
                                backgroundImage={image ? image : "https://cdn-icons-png.flaticon.com/512/21/21104.png"}
                                backgroundPosition={'center'}
                                backgroundRepeat="no-repeat"
                                backgroundSize="cover"
                                display="flex"
                                justifyContent="center"
                                alignItems="flex-end"
                            >
                                <Image display={'none'} width="0%" height="0%" borderRadius="50%" src={image && !imageError ? image : "https://cdn-icons-png.flaticon.com/512/21/21104.png"} onError={handleImageError} alt="" />
                                <input
                                    id="upload-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                                <Box
                                    p={5}
                                    width="60%"
                                    display="flex"
                                    justifyContent="center"
                                    borderBottomRadius="100%"
                                >
                                       <Box bg="rgba(0, 3, 5, 0.478)" pl={2} pr={2} borderRadius={5} boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" >
                                         <FiCamera 
                                            color="white" 
                                            fontSize="150%" 
                                            onClick={() => document.getElementById('upload-input').click()} 
                                        />
                                        </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            width={{ base: '100%', sm: '200px' }}
                            height="fit-content"
                            display="flex"
                            justifyContent={{ base: 'center', md: 'left' }}
                            pb={{ base: 3, md: 'auto' }}
                            flexDir='column'
                        >
                            <Box width='fit-content' display="flex" fontSize={{ base: "80%", sm: '100%', md: "120%" }} color="white" fontWeight="bold" m={{ base: 'auto', md: 0 }}>
                                {accountDetails && accountDetails.name ? accountDetails.name : ""}
                            </Box>
                            <Box width='fit-content' display="flex" fontSize={{ base: "60%", sm: '80%', md: "100%" }} color="white" fontWeight="bold" m={{ base: 'auto', md: 0 }}>
                                {accountDetails && accountDetails.mobile_number ? accountDetails.mobile_number : ""}
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        p={5}
                        pr={{ base: "10%" }}
                        display={{ base: 'none', sm: 'flex' }}
                        flexDir="column"
                        width="fit-content"
                        alignItems="center"
                        height="fit-content"
                    >
                        <Box>
                            <EditCustomersProfile />
                        </Box>
                        <Box display="flex" justifyContent="center" alignItems="center" flexDir="column">
                            <Box display="flex" justifyContent="center" alignItems="center" color="white" fontWeight="500" fontSize="100%">
                                Orders
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center" color="white" fontWeight="bold" fontSize="100%">{productOrder ? productOrder.length : 0}</Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box
                width="95%"
                pt={1}
                pb={1}
                className="show-drawer"
                justifyContent='right'
                m={'auto'}>
                <SidebarDrawerForProfileMenu />
            </Box>
        </>
    );
};

export { TopBoxProfileDetails };
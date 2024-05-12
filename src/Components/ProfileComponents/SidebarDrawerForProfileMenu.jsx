import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { MyProfileData, MyOrdersData, MySubscriptionsData } from "../Data/SidebarDataForProfile";
import {GrMenu} from "react-icons/gr";


const SidebarDrawerForProfileMenu = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const currentUrl = new URL(window.location.href);
    const pathname = currentUrl.pathname;
    var dashboardName = pathname.substring(1);
    const text = dashboardName.split("/");

    return (
        <>
            <Button 
                size={'sm'} 
                borderRadius="3px" 
                ref={btnRef} 
                bg={'white'}
                color={'blue'}
                border="1px solid red"
                onClick={onOpen}
            >
                <GrMenu/>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Box w="100%">
                            <Box width="100%" display="flex" flexDir="column">
                                <Box
                                    width="100%"
                                    p={1}
                                    fontSize='100%'
                                    fontWeight="bold"
                                >My Profile</Box>
                                {
                                    MyProfileData.length > 0 && MyProfileData.map((el) => {
                                        return (
                                            <Link
                                                key={el.id}
                                                to={el.path}
                                            >
                                                <Box
                                                    mb={2}
                                                    width="100%"
                                                    borderLeft={el.path == `/${text[0]}` ? "2px solid red" : "none"}
                                                    fontSize='90%'
                                                    fontWeight="500"
                                                    p={0.5}
                                                    pl={4}
                                                    bg={el.path == `/${text[0]}` ? "#f7f0f0" : "white"}
                                                >
                                                    {el.heading}
                                                </Box>
                                            </Link>
                                        );
                                    })
                                }
                            </Box>

                            <Box width="100%" display="flex" flexDir="column">
                                <Box
                                    width="100%"
                                    p={1}
                                    fontSize='100%'
                                    fontWeight="bold"
                                >My Orders</Box>
                                {
                                    MyOrdersData.length > 0 && MyOrdersData.map((el) => {
                                        return (
                                            <Link
                                                key={el.id}
                                                to={el.path}
                                            >
                                                <Box
                                                    width="100%"
                                                    mb={2}
                                                    borderLeft={el.path == `/${text[0]}` ? "2px solid red" : "none"}
                                                    fontSize='90%'
                                                    fontWeight="500"
                                                    p={0.5}
                                                    pl={4}
                                                    bg={el.path == `/${text[0]}` ? "#f7f0f0" : "white"}
                                                >
                                                    {el.heading}
                                                </Box>
                                            </Link>
                                        );
                                    })
                                }
                            </Box>

                            <Box width="100%" display="flex" flexDir="column">
                                <Box
                                    width="100%"
                                    p={1}
                                    fontSize='100%'
                                    fontWeight="bold"
                                >My Subscriptions</Box>
                                {
                                    MySubscriptionsData.length > 0 && MySubscriptionsData.map((el) => {
                                        return (
                                            <Link
                                                key={el.id}
                                                to={el.path}
                                            >
                                                <Box
                                                    width="100%"
                                                    mb={2}
                                                    borderLeft={el.path == `/${text[0]}` ? "2px solid red" : "none"}
                                                    fontSize='90%'
                                                    fontWeight="500"
                                                    p={0.5}
                                                    pl={4}
                                                    bg={el.path == `/${text[0]}` ? "#f7f0f0" : "white"}
                                                >
                                                    {el.heading}
                                                </Box>
                                            </Link>
                                        );
                                    })
                                }
                            </Box>
                        </Box>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button size={'sm'} variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export { SidebarDrawerForProfileMenu };
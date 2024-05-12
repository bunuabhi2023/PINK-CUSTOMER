import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MyProfileData, MyOrdersData, MySubscriptionsData,Wallet } from "../Data/SidebarDataForProfile";

const ProfileSideBar = () => {

    const currentUrl = new URL(window.location.href);
    const pathname = currentUrl.pathname;
    var dashboardName = pathname.substring(1);
    const text = dashboardName.split("/");

    return (
        <Box
            pr={1}
            display="flex"
            justifyContent="left"
            w="100%"
        >
            <Box w="100%">
                <Box width="100%" display="flex" flexDir="column">
                    <Box
                        width="100%"
                        p={1}
                        fontSize={{ base: "80%", sm: "80%", md: "100%", lg: "100%" }}
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
                                        fontSize={{ base: "60%", sm: "70%", md: "90%", lg: "100%" }}
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
                        fontSize={{ base: "80%", sm: "80%", md: "100%", lg: "100%" }}
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
                                        fontSize={{ base: "60%", sm: "70%", md: "90%", lg: "100%" }}
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
                        fontSize={{ base: "80%", sm: "80%", md: "100%", lg: "100%" }}
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
                                        fontSize={{ base: "60%", sm: "70%", md: "90%", lg: "100%" }}
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
                        fontSize={{ base: "80%", sm: "80%", md: "100%", lg: "100%" }}
                        fontWeight="bold"
                    >My Wallet</Box>
                    {
                        Wallet.length > 0 && Wallet.map((el) => {
                            return (
                                <Link
                                    key={el.id}
                                    to={el.path}
                                >
                                    <Box
                                        width="100%"
                                        mb={2}
                                        borderLeft={el.path == `/${text[0]}` ? "2px solid red" : "none"}
                                        fontSize={{ base: "60%", sm: "70%", md: "90%", lg: "100%" }}
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
        </Box>
    )
};

export { ProfileSideBar };
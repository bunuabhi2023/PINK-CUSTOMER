import { Box, Text } from "@chakra-ui/react";
import { ProfileSideBar } from "./ProfileSideBar";
import "../../Styles/CommonForProfile.css";
import { TopBoxProfileDetails } from "./TopBoxProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../App/Actions/MyOrdersAction";
import { useEffect } from "react";
import { SingleTiffinSubscriptionCard } from "./SingleTiffinSubscriptionCard";


const DinnerItemsPage = () => {

    const { tiffineSubscription } = useSelector(state => state.myOrdersDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);


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
                        >Dinner Items</Text>
                    </Box>
                    <Box
                        display={'grid'}
                        gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(2,1fr)", xl: "repeat(3,1fr)" }}
                    >
                        {
                            tiffineSubscription &&
                            tiffineSubscription.length > 0 &&
                            tiffineSubscription.filter((el) => el.lunch_or_dinner === "dinner").length > 0 &&
                            tiffineSubscription.filter((el) => el.lunch_or_dinner === "dinner").map((el) => {
                                return <SingleTiffinSubscriptionCard key={el.id} {...el} />
                            })
                        }
                    </Box>
                    {
                        tiffineSubscription &&
                        tiffineSubscription.length > 0 &&
                        tiffineSubscription.filter((el) => el.lunch_or_dinner === "dinner").length === 0 &&
                        <Box display="flex" justifyContent="center" color="red" fontWeight={500}>No Subscriptions Found</Box>
                    }
                    {
                        tiffineSubscription &&
                        tiffineSubscription.length === 0 &&
                        <Box display="flex" justifyContent="center" color="red" fontWeight={500}>No Subscriptions Found</Box>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export { DinnerItemsPage };
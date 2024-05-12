import { Box, Text } from "@chakra-ui/react";
import { ProfileSideBar } from "./ProfileSideBar";
import "../../Styles/CommonForProfile.css";
import { TopBoxProfileDetails } from "./TopBoxProfileDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyOrders } from "../../App/Actions/MyOrdersAction";
import { SingleOrderitemCard } from "./SingleOrderitemCard";


const OrderHistory = () => {

    const { productOrder } = useSelector(state => state.myOrdersDetails);
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
                        >Order History</Text>
                    </Box>
                    <Box
                        display={'grid'}
                        gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)", lg: "repeat(2,1fr)", xl: "repeat(3,1fr)" }}
                    >
                        {
                            productOrder &&
                            productOrder.length > 0 &&
                            productOrder.filter((el) =>
                                el.order_status === 'canceled' ||
                                el.order_status === 'delivered' ||
                                el.order_status === 'payment_failed'
                            ).length > 0 &&
                            productOrder.filter((el) =>
                                el.order_status === 'canceled' ||
                                el.order_status === 'delivered' ||
                                el.order_status === 'payment_failed'
                            ).map((el) => {
                                return <SingleOrderitemCard key={el.id} {...el} />
                            })
                        }
                    </Box>
                    {
                        productOrder &&
                        productOrder.length > 0 &&
                        productOrder.filter((el) =>
                            el.order_status === 'canceled' ||
                            el.order_status === 'delivered' ||
                            el.order_status === 'payment_failed'
                        ).length === 0 &&
                        <Box display="flex" justifyContent="center" color="red" fontWeight={500}>No Orders Found</Box>
                    }
                    {
                        productOrder &&
                        productOrder.length === 0 &&
                        <Box display="flex" justifyContent="center" color="red" fontWeight={500}>No Orders Found</Box>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export { OrderHistory };
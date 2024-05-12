import { Box, Text } from "@chakra-ui/react";
import { ModalPopUpForOrderItem } from "../../Modal/ModalPopUpForOrderItem";

const SingleOrderitemCard = ({
    applied_promo_code,
    created_at,
    customer_id,
    deleted_at,
    delivery_charge,
    delivery_date,
    delivery_time,
    discount_amount,
    discount_percentage,
    home_chef_id,
    home_chef_name,
    id,
    order_details,
    product_names,
    order_locked,
    order_no,
    order_status,
    order_status_id,
    payment_type,
    price,
    updated_at,
}) => {

    return (
        <Box
            display="flex"
            justifyContent="left"
            flexDir="column"
            p={{ base: 5, md: 3, lg: 5 }}
            m={3}
            borderRadius="5px"
            boxShadow="rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset"
        >
            <Box display="flex" justifyContent="space-between" mb={3}>
                <ModalPopUpForOrderItem
                    applied_promo_code={applied_promo_code}
                    created_at={created_at}
                    customer_id={customer_id}
                    deleted_at={deleted_at}
                    delivery_charge={delivery_charge}
                    delivery_date={delivery_date}
                    delivery_time={delivery_time}
                    discount_amount={discount_amount}
                    discount_percentage={discount_percentage}
                    home_chef_id={home_chef_id}
                    home_chef_name={home_chef_name}
                    id={id}
                    order_details={order_details}
                    product_names={product_names}
                    order_locked={order_locked}
                    order_no={order_no}
                    order_status={order_status}
                    order_status_id={order_status_id}
                    payment_type={payment_type}
                    price={price}
                />
                {
                    order_status && <Box display="flex" flexDir='column' mt={2} mr={2}>
                        <Text display='flex' fontSize={{ base: "80%" }} justifyContent="center" alignItems="center" fontWeight={500} bg={'orange.100'} pl={2} pr={2} color="black" borderRadius="3px" textTransform={'capitalize'}>
                            {order_status ? order_status : ''}
                        </Text>
                    </Box>
                }
            </Box>

            {
                home_chef_name && <Box display="flex" flexDir='column' mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Homechef Name</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} textTransform={'capitalize'}>{home_chef_name ? home_chef_name : '---'}</Text>
                </Box>
            }
            {
                order_no && <Box display="flex" flexDir='column' mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Order No.</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }}>{order_no ? order_no : 'Not Available'}</Text>
                </Box>
            }
            {
                applied_promo_code && <Box display="flex" flexDir='column' mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Promo Code</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }}>{applied_promo_code ? applied_promo_code : 'No Promocode'}</Text>
                </Box>
            }
            {
                delivery_date && <Box display="flex" flexDir='column' mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Delivery Date</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }}>{delivery_date ? formatDateOnly(delivery_date) : '---'}</Text>
                </Box>
            }
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" flexDir='column' mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Discount</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }}>{dispatchEvent ? `${discount_percentage}%` : '---'}</Text>
                </Box>
                <Box display="flex" flexDir='column' mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Price</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }}>{price ? `${price} ₹` : '0.00 ₹'}</Text>
                </Box>
            </Box>
        </Box>
    );
};

export { SingleOrderitemCard };


function formatDateOnly(inputDate) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const dateObj = new Date(inputDate);

    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();

    const formattedDateOnly = `${month} ${day} ${year}`;

    return formattedDateOnly;
}
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getLogsForOrders } from "../App/Actions/MyOrdersAction";
import { useEffect, useState } from "react";
import "../Styles/Components/ModalPopUpForOrderitem.css";


const ModalPopUpForOrderItem = ({
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
}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { orderLogsByOrderNo } = useSelector(state => state.myOrdersDetails);
    const dispatch = useDispatch();
    var [data, setData] = useState([]);


    const onModalOpen = () => {
        onOpen();
        // 'OD2B22K7rbs9FF'
        if (order_no) {
            dispatch(getLogsForOrders(order_no));
        }
    }

    useEffect(() => {
        if (orderLogsByOrderNo) {
            setData([...orderLogsByOrderNo.map(element => element)]);
        }
    }, [orderLogsByOrderNo]);

    console.log({ orderLogsByOrderNo });


    return (
        <>
            <Button onClick={() => onModalOpen()} size={'xs'} border="1px solid #f705db" color={'pink.600'} borderRadius='4px' bg='white'>View Details</Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={{ base: "120%", md: '160%' }} fontWeight={500}>Order details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex" flexDir='column'>
                            <Text fontSize='120%' mr={2}>Order Number</Text>
                            <Text fontSize='100%'>{order_no ? order_no : 'No order no.'}</Text>
                        </Box>
                        <Box display="flex" flexDir='column' mt={4}>
                            <Text fontSize='120%' mr={2}>Homechef Name</Text>
                            <Text fontSize='100%' textTransform={'capitalize'}>{home_chef_name ? home_chef_name : 'No Homechef'}</Text>
                        </Box>
                        <Box display="flex" flexDir='column' mt={4}>
                            <Text fontSize='120%' mr={2}>Applied Promocode</Text>
                            <Text fontSize='100%'>{applied_promo_code ? applied_promo_code : 'No promocode'}</Text>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={4} width="100%">
                            <Text fontSize='120%' mr={2}>Order Status</Text>
                            <Text fontSize='100%' color={'orange.700'} fontWeight={'bold'} textTransform={"capitalize"}>{order_status ? order_status : ''}</Text>
                        </Box>
                        <Box display="flex" flexDir='column' mt={4}>
                            <Text fontSize='120%' mt={2} mb={2}>Your Orders</Text>
                            <Box>
                                {
                                    product_names &&
                                    product_names.map((el) => {
                                        return (
                                            <Box
                                                key={el.product_id}
                                                display="flex"
                                                justifyContent="space-between"
                                            >
                                                <Box p={1} fontWeight={500}>{el.product_name}</Box>
                                                <Box>Qty = {el.quantity}</Box>
                                                <Box>Price = {`${el.price} ₹`}</Box>
                                            </Box>
                                        );
                                    })
                                }
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Box display="flex" flexDir='column' justifyContent='left' mt={2}>
                                <Text fontSize='110%' mr={2}>Discount Percent</Text>
                                <Text fontSize='100%'>{discount_percentage ? ` ${discount_percentage} %` : 'No discount'}</Text>
                            </Box>
                            <Box display="flex" flexDir='column' justifyContent='left' mt={2}>
                                <Text fontSize='110%' mr={2}>Discount Percent</Text>
                                <Text fontSize='100%'>{discount_amount ? ` ${discount_amount} ₹` : 'No discount'}</Text>
                            </Box>
                        </Box>
                        <Box display="flex" flexDir='column' mt={4}>
                            <Text fontSize='120%' mr={2}>Delivery Charge</Text>
                            <Text fontSize='100%'>{delivery_charge ? ` ${delivery_charge} ₹` : '0.00 ₹'}</Text>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Box display="flex" flexDir='column'>
                                <Text fontSize='120%' mr={2}>Date</Text>
                                <Text fontSize='100%'>{delivery_date ? formatDateOnly(delivery_date) : ''}</Text>
                            </Box>
                            <Box display="flex" flexDir='column'>
                                <Text fontSize='120%' mr={2}>Time</Text>
                                <Text fontSize='100%'>{delivery_time ? formatTimeOnly(delivery_time) : ''}</Text>
                            </Box>
                        </Box>
                        <Box display="flex" flexDir='column' mt={4}>
                            <Text fontSize='120%' mr={2}>Total</Text>
                            <Text fontSize='100%'>{price ? ` ${price} ₹` : '0.00 ₹'}</Text>
                        </Box>
                        <Box display="flex" justifyContent="left" borderTop='0.5px solid #d4d4d4' mt={4}>
                            <Text mt={3} fontSize="140%" fontWeight={500}>Logs Details:- </Text>
                        </Box>
                        <Box display="flex" mt={4} borderBottom="1px solid gray" width="fit-content">
                            <Text fontSize='100%' mr={2}>Order No. - </Text>
                            <Text fontSize='100%'>{order_no ? order_no : 'Not Found'}</Text>
                        </Box>

                        {
                            orderLogsByOrderNo &&
                                orderLogsByOrderNo.length > 0 ?
                                (
                                    <>
                                        {
                                            data &&
                                                data.length > 1 ? (
                                                <ul className="bar">
                                                    {
                                                        data &&
                                                        data.length > 0 &&
                                                        data
                                                            .sort((a, b) => a.order_status_id - b.order_status_id)
                                                            .map((el) => {
                                                                return (
                                                                    <li key={el.id}>
                                                                        <Box mt={-7} pl="7%">
                                                                            <Box textTransform={'capitalize'} fontWeight={500}>{el.order_status}</Box>
                                                                            <Box fontSize={'90%'}>{formatDate(el.created_at)}</Box>
                                                                        </Box>
                                                                    </li>
                                                                );
                                                            })
                                                    }

                                                </ul>
                                            ) : (
                                                <ul className="bar">
                                                    {
                                                        data &&
                                                        data.length > 0 &&
                                                        data
                                                            .sort((a, b) => a.order_status_id - b.order_status_id)
                                                            .map((el) => {
                                                                return (
                                                                    <li key={el.id}>
                                                                        <Box mt={-7} pl="7%">
                                                                            <Box textTransform={'capitalize'} fontWeight={500}>{el.order_status}</Box>
                                                                            <Box fontSize={'90%'}>{formatDate(el.created_at)}</Box>
                                                                        </Box>
                                                                    </li>
                                                                );
                                                            })

                                                    }
                                                    <li>
                                                        <Box mt={-7} pl="7%">
                                                            <Box textTransform={'capitalize'} fontWeight={500}>{'Delivered'}</Box>
                                                            <Box fontSize={'90%'}>{'...progressing'}</Box>
                                                        </Box>
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    </>
                                ) : (
                                    <>
                                        {
                                            data.length === 0 && <Box mt={2} fontSize={'90%'} color={'orange.600'}>{'No Logs Available'}</Box>
                                        }
                                    </>
                                )
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button size={'sm'} mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export { ModalPopUpForOrderItem };


function formatDate(inputDate) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const dateObj = new Date(inputDate);

    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";

    hours %= 12;
    hours = hours || 12;

    const formattedDate = `${month} ${day} ${year} ${hours}:${String(minutes).padStart(2, '0')} ${amOrPm}`;

    return formattedDate;
}


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



function formatTimeOnly(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    let amOrPm = "AM";

    let hours12 = hours % 12;
    hours12 = hours12 || 12;

    // Determine whether it's AM or PM
    if (hours >= 12) {
        amOrPm = "PM";
    }
    const formattedTime = `${hours12}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amOrPm}`;
    return formattedTime;
}
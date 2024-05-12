
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResponseOnOrderSuccessfull } from '../../App/Actions/MyOrdersAction';
import { Link, useParams } from 'react-router-dom';

const ThankYouPage = () => {

    const { onSuccessfullOrderPlaced } = useSelector(state => state.myOrdersDetails);
    console.log({ onSuccessfullOrderPlaced });
    const dispatch = useDispatch();
    const { order_no } = useParams();

    const [dateCreatedAt, setDateCreatedAt] = useState('');
    const [timeCreatedAt, setTimeCreatedAt] = useState('');


    useEffect(() => {
        if (onSuccessfullOrderPlaced && onSuccessfullOrderPlaced[0] && onSuccessfullOrderPlaced[0].created_at) {
            const [date_part, time_part] = breakTimestamp(onSuccessfullOrderPlaced[0].created_at);
            setDateCreatedAt(date_part);
            setTimeCreatedAt(time_part);
        }
    }, [onSuccessfullOrderPlaced]);


    useEffect(() => {
        dispatch(getResponseOnOrderSuccessfull(order_no));
    }, [dispatch]);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
        >
            <Stack
                width="fit-content"
                p={4}
                boxShadow={'lg'}
            >
                <Stack align={'center'}>
                    <Heading fontSize={'3xl'}>Thank You!</Heading>
                    <Text fontSize={'2xl'} color={'gray.600'}>
                        Your Order Has Been Placed.
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    width={{ base: "100%" }}
                    bg={useColorModeValue('white', 'gray.700')}
                    p={2}
                    mt={8}
                >
                    <Stack spacing={3}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Text display="flex" justifyContent='left' width="fit-content">Order No</Text>
                            <Text display="flex" justifyContent='right' width="fit-content">{onSuccessfullOrderPlaced && onSuccessfullOrderPlaced[0] && onSuccessfullOrderPlaced[0].order_no ? onSuccessfullOrderPlaced[0].order_no : '---'}</Text>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Text display="flex" justifyContent='left' width="fit-content">Homechef Name</Text>
                            <Text display="flex" justifyContent='right' width="fit-content">{onSuccessfullOrderPlaced && onSuccessfullOrderPlaced[0] && onSuccessfullOrderPlaced[0].home_chef_name ? onSuccessfullOrderPlaced[0].home_chef_name : '---'}</Text>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Text display="flex" justifyContent='left' width="fit-content">Order Amount</Text>
                            <Text display="flex" justifyContent='right' width="fit-content">{onSuccessfullOrderPlaced && onSuccessfullOrderPlaced[0] && onSuccessfullOrderPlaced[0].price ? `${onSuccessfullOrderPlaced[0].price} ₹` : '---'}</Text>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Text display="flex" justifyContent='left' width="fit-content">Order Date</Text>
                            <Text display="flex" justifyContent='right' width="fit-content">{dateCreatedAt ? formatDateOnly(dateCreatedAt) : '---'}</Text>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Text display="flex" justifyContent='left' width="fit-content">Order Time</Text>
                            <Text display="flex" justifyContent='right' width="fit-content">{timeCreatedAt ? formatTimeOnly(timeCreatedAt) : '---'}</Text>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Text display="flex" justifyContent='left' width="fit-content">Delivery Date</Text>
                            <Text display="flex" justifyContent='right' width="fit-content">{onSuccessfullOrderPlaced && onSuccessfullOrderPlaced[0] && onSuccessfullOrderPlaced[0].delivery_date ? formatDateOnly(onSuccessfullOrderPlaced[0].delivery_date) : '---'}</Text>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <Text display="flex" justifyContent='left' width="fit-content">Delivery Time</Text>
                            <Text display="flex" justifyContent='right' width="fit-content">{onSuccessfullOrderPlaced && onSuccessfullOrderPlaced[0] && onSuccessfullOrderPlaced[0].delivery_time ? formatTimeOnly(onSuccessfullOrderPlaced[0].delivery_time) : '---'}</Text>
                        </Box>
                        <Box display="flex" justifyContent='space-between' mt={4}>
                            <Link to="/"><Button size={'sm'}>Home</Button></Link>
                            <Link to="/current-orders"><Button size={'sm'}>View Orders</Button></Link>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export { ThankYouPage };


// Formate Time Only:-
function formatTimeOnly(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    let amOrPm = "AM";

    let hours12 = hours % 12;
    hours12 = hours12 || 12;

    if (hours >= 12) {
        amOrPm = "PM";
    }
    const formattedTime = `${hours12}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${amOrPm}`;
    return formattedTime;
}


// Break Date & Time:-
function breakTimestamp(timestampString) {
    if (timestampString.includes('T')) {
        const parts = timestampString.split('T');
        if (parts.length !== 2) {
            return ["Invalid timestamp"];
        }

        const date_part = parts[0];
        const time_part = parts[1].replace("Z", "");
        return [date_part, time_part];
    }
    else {
        const parts = timestampString.split(' ');
        if (parts.length !== 2) {
            return ["Invalid timestamp"];
        }

        const date_part = parts[0];
        const time_part = parts[1].replace("Z", "");
        return [date_part, time_part];
    }
}

// Formate Date Only:-
function formatDateOnly(inputDate) {
    const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    const dateObj = new Date(inputDate);

    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();

    const formattedDateOnly = `${day} ${month} ${year}`;
    return formattedDateOnly;
}
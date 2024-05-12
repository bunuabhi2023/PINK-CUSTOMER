import { Box, Text } from "@chakra-ui/react"
import { setUserInputLocation } from "../../App/Actions/UserAction";
import { getAccountDetails } from "../../App/Actions/MyAccountAction";
import { useDispatch } from "react-redux";

const SingleAddressItem = ({
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
    onclick
}) => {

    const dispatch = useDispatch();

    const HandleNewAddress = (latitude, longitude) => {
        console.log({ latitude, longitude })
        dispatch(setUserInputLocation({ latitude, longitude }))
            .then(() => dispatch(getAccountDetails()));
        onclick();
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
            m={2}
            onClick={() => HandleNewAddress(latitude, longitude)}
        >
            <Box
                display="flex"
                flexDir='column'
                justifyContent="left"
                alignItems="center"
            >
                <Box fontSize="50%" display="flex" justifyContent="left" width="100%" >
                    <Text mr={1} color='blue.600'>Address</Text><Text>{address_line1}</Text>
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
        </Box>
    );
};

export { SingleAddressItem };
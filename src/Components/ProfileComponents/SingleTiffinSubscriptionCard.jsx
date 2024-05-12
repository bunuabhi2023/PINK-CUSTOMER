import { Box, Text } from "@chakra-ui/react";
import { ModalPopUpForTiffinSubscriptionItems } from "../../Modal/ModalPopUpForTiffinSubscriptionItems";

const SingleTiffinSubscriptionCard = ({
    id,
    home_chef_name,
    home_chef_id,
    tiffin_id,
    sunday_items,
    monday_items,
    tuesday_items,
    wednesday_items,
    thursday_items,
    friday_items,
    saturday_items,
    thali_type,
    lunch_or_dinner,
    included_weekend,
    is_sweet,
    non_veg_days,
    total_days,
    start_date,
    end_date,
    is_paid,
    total_amount
}) => {

    var trimmedString = included_weekend.slice(1, -1);
    var weekends = trimmedString.split(',').map(function (item) {
        return item.trim();
    });

    // non-veg days:- 
    var non_veg_day_trimming = non_veg_days.slice(1, -1);
    var nonVegDays = non_veg_day_trimming.split(',').map(function (item) {
        return item.trim();
    });

    const monObj = JSON.parse(monday_items);
    const tueObj = JSON.parse(tuesday_items);
    const wedObj = JSON.parse(wednesday_items);
    const thursObj = JSON.parse(thursday_items);
    const friObj = JSON.parse(friday_items);
    const satObj = JSON.parse(saturday_items);
    const sunObj = JSON.parse(sunday_items);

    const currentDate = new Date();
    const endDate = new Date(end_date);

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
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" flexDir='column'>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Homechef Name</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} >{home_chef_name ? home_chef_name : ''}</Text>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" flexDir='column' mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Thali Type</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} textTransform={'capitalize'}>{thali_type ? thali_type : 'Not Found'}</Text>
                </Box>
                <Box display="flex" mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Type</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} textTransform={'capitalize'}>{lunch_or_dinner ? lunch_or_dinner : 'Not Found'}</Text>
                </Box>
            </Box>

            <Box display="flex" mt={2}>
                <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Total Days</Text>
                <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }}>{total_days ? total_days : '---'}</Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" flexDir='column' mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>Start Date</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }}>{start_date ? formatDateOnly(start_date) : '---'}</Text>
                </Box>
                <Box display="flex" flexDir='column' mt={2}>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }} fontWeight={500} mr={2}>End Date</Text>
                    <Text fontSize={{ base: "80%", md: '60%', lg: "90%", xl: "100%" }}>{end_date ? formatDateOnly(end_date) : '---'}</Text>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={3}>
                < ModalPopUpForTiffinSubscriptionItems
                    id={id}
                    home_chef_name={home_chef_name}
                    home_chef_id={home_chef_id}
                    tiffin_id={tiffin_id}
                    sunObj={sunObj}
                    monObj={monObj}
                    tueObj={tueObj}
                    wedObj={wedObj}
                    thursObj={thursObj}
                    friObj={friObj}
                    satObj={satObj}
                    thali_type={thali_type}
                    lunch_or_dinner={lunch_or_dinner}
                    weekends={weekends}
                    is_sweet={is_sweet}
                    nonVegDays={nonVegDays}
                    total_days={total_days}
                    start_date={start_date}
                    end_date={end_date}
                    is_paid={is_paid}
                    total_amount={total_amount}
                />
            </Box>
        </Box>
    );
};

export { SingleTiffinSubscriptionCard };



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
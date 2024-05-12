import { Box, Button, Checkbox, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";

const ModalPopUpForTiffinSubscriptionItems = ({
    id,
    home_chef_name,
    home_chef_id,
    tiffin_id,
    sunObj,
    monObj,
    tueObj,
    wedObj,
    thursObj,
    friObj,
    satObj,
    thali_type,
    lunch_or_dinner,
    is_sweet,
    weekends,
    nonVegDays,
    total_days,
    start_date,
    end_date,
    is_paid,
    total_amount
}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} size={'xs'} border="1px solid blue" color={'blue.600'} borderRadius='4px' bg='white'>
                View Details
            </Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={{ base: "120%", md: '160%' }} fontWeight={500}>Tiffin Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex" flexDir='column'>
                            <Text fontSize='120%' mr={2} textTransform={'capitalize'}>Homechef Name</Text>
                            <Text fontSize='100%'>{home_chef_name ? home_chef_name : 'No Homechef'}</Text>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Box display="flex" mt={4} alignItems="center">
                                <Text fontSize='120%' mr={2}>Paid </Text>
                                <Text fontSize='100%' color={is_paid === 0 ? "green" : 'red'}>{is_paid === 0 ? "No" : 'Yes'}</Text>
                            </Box>
                            <Box display="flex" mt={4} alignItems="center">
                                <Checkbox isChecked={is_sweet === 1 ? true : false} fontSize='120%' mr={2}>Sweets</Checkbox>
                            </Box>
                        </Box>
                        <Box display="flex" mt={4}>
                            <Menu>
                                <MenuButton as={Button} size={'xs'} border="1px solid #f705db" color={'pink.600'} borderRadius='4px' bg='white'>
                                    Show Menu
                                </MenuButton>
                                <MenuList
                                    bg="white"
                                    color='black'
                                    p={0.5}
                                    borderRadius={0}
                                    boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px">
                                    <MenuItem>
                                        <TableContainer>
                                            <Table style={{ borderCollapse: "separate", borderSpacing: "3px 3px", padding: "0px", backgroundColor: "white" }}>
                                                <Thead>
                                                    <Tr>
                                                        <Th bg={'red.100'} color={'green.700'} fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">Day</Th>
                                                        <Th bg={'red.100'} color={'green.700'} fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">Sabji/Gravy</Th>
                                                        <Th bg={'red.100'} color={'green.700'} fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">Roti/Chapati</Th>
                                                        <Th bg={'red.100'} color={'green.700'} fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">Rice</Th>
                                                        <Th bg={'red.100'} color={'green.700'} fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">Others</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    <Tr>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold" bg={'blue.100'}>Monday</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{monObj && monObj['sbji/gravy'] ? monObj['sbji/gravy'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{monObj && monObj['chapati'] ? monObj['chapati'] : '---'}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{monObj && monObj['Rice'] ? monObj['Rice'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{monObj && monObj['others'] ? monObj['others'] : "---"}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold" bg={'blue.100'}>Tuesday</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{tueObj && tueObj['sbji/gravy'] ? tueObj['sbji/gravy'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{tueObj && tueObj['chapati'] ? tueObj['chapati'] : '---'}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{tueObj && tueObj['Rice'] ? tueObj['Rice'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{tueObj && tueObj['others'] ? tueObj['others'] : "---"}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold" bg={'blue.100'}>Wednesday</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{wedObj && wedObj['sbji/gravy'] ? wedObj['sbji/gravy'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{wedObj && wedObj['chapati'] ? wedObj['chapati'] : '---'}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{wedObj && wedObj['Rice'] ? wedObj['Rice'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{wedObj && wedObj['others'] ? wedObj['others'] : "---"}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold" bg={'blue.100'}>Thursday</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{thursObj && thursObj['sbji/gravy'] ? thursObj['sbji/gravy'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{thursObj && thursObj['chapati'] ? thursObj['chapati'] : '---'}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{thursObj && thursObj['Rice'] ? thursObj['Rice'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{thursObj && thursObj['others'] ? thursObj['others'] : "---"}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold" bg={'blue.100'}>Friday</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{friObj && friObj['sbji/gravy'] ? friObj['sbji/gravy'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{friObj && friObj['chapati'] ? friObj['chapati'] : '---'}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{friObj && friObj['Rice'] ? friObj['Rice'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{friObj && friObj['others'] ? friObj['others'] : "---"}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold" bg={'blue.100'}>Saturday</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{satObj && satObj['sbji/gravy'] ? satObj['sbji/gravy'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{satObj && satObj['chapati'] ? satObj['chapati'] : '---'}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{satObj && satObj['Rice'] ? satObj['Rice'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{satObj && satObj['others'] ? satObj['others'] : "---"}</Td>
                                                    </Tr>
                                                    <Tr>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold" bg={'blue.100'}>Sunday</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{sunObj && sunObj['sbji/gravy'] ? sunObj['sbji/gravy'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{sunObj && sunObj['chapati'] ? sunObj['chapati'] : '---'}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{sunObj && sunObj['Rice'] ? sunObj['Rice'] : "---"}</Td>
                                                        <Td fontSize={{ base: "70%" }} p={1} pl={2} pr={2} fontWeight="bold">{sunObj && sunObj['others'] ? sunObj['others'] : "---"}</Td>
                                                    </Tr>
                                                </Tbody>
                                            </Table>
                                        </TableContainer>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Box display="flex" flexDir='column' mt={4}>
                                <Text fontSize='120%' mt={2} mb={2}>Non-Veg Days</Text>
                                <Box>
                                    {
                                        nonVegDays &&
                                            nonVegDays[0] !== '' ?
                                            nonVegDays.map((el, i) => {
                                                return (
                                                    <Box
                                                        key={i}
                                                        display="flex"
                                                        p={1}
                                                        fontWeight={500}
                                                        textTransform={'capitalize'}
                                                    >
                                                        {el}
                                                    </Box>
                                                );
                                            }) : <Box display="flex">Not Available</Box>
                                    }
                                </Box>
                            </Box>
                            <Box display="flex" flexDir='column' mt={4}>
                                <Text fontSize='120%' mt={2} mb={2}>Weekends</Text>
                                <Box>
                                    {
                                        weekends &&
                                            weekends[0] !== '' ?
                                            weekends.map((el, i) => {
                                                return (
                                                    <Box
                                                        key={i}
                                                        display="flex"
                                                        p={1}
                                                        fontWeight={500}
                                                        textTransform={'capitalize'}
                                                    >
                                                        {el}
                                                    </Box>
                                                );
                                            }) : <Box display="flex">Not Available</Box>
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Box display="flex" flexDir='column' justifyContent='left' mt={2}>
                                <Text fontSize='110%' mr={2}>Thali Type</Text>
                                <Text fontSize='100%' textTransform={'capitalize'}>{thali_type ? thali_type : 'No Thali Type'}</Text>
                            </Box>
                            <Box display="flex" flexDir='column' justifyContent='left' mt={2}>
                                <Text fontSize='110%' mr={2}>Type</Text>
                                <Text fontSize='100%' textTransform={'capitalize'}>{lunch_or_dinner ? lunch_or_dinner : 'No Type Available'}</Text>
                            </Box>
                        </Box>
                        <Box display="flex" justifyContent="left" borderTop='0.5px solid #d4d4d4' mt={4}>
                            <Text mt={3} fontSize="120%">Tiffin Details:- </Text>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
                            <Text fontSize='100%' mr={2}>Tiffin Id</Text>
                            <Text fontSize='100%'>{tiffin_id ? tiffin_id : 'Not Available'}</Text>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
                            <Text fontSize='100%' mr={2}>Total Days</Text>
                            <Text fontSize='100%'>{total_days ? total_days : 'Not Found'}</Text>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
                            <Text fontSize='100%' mr={2}>Start Date</Text>
                            <Text fontSize='100%'>{start_date ? formatDateOnly(start_date) : 'Not Found'}</Text>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
                            <Text fontSize='100%' mr={2}>End Date</Text>
                            <Text fontSize='100%'>{end_date ? formatDateOnly(end_date) : 'Not Found'}</Text>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mt={4}>
                            <Text fontSize='100%' mr={2}>Total Amount</Text>
                            <Text fontSize='100%'>{total_amount ? `${total_amount} ₹` : 'Not Found'}</Text>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button size={'sm'} mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    );
};

export { ModalPopUpForTiffinSubscriptionItems };



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
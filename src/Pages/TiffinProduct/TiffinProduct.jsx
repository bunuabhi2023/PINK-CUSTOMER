import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useRazorpay from 'react-razorpay';
import logoimg from '../../Assets/logoWithWhite.jpg';

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  HStack,
  Select,
  Grid,
  GridItem,
  Checkbox,
  Input,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';

import { server } from '../../App/store';
import { useDispatch, useSelector } from 'react-redux';
import { allAddress } from '../../App/Actions/UserAction';
import { EditIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Calendar from 'react-calendar';

export default function TiffinProduct() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  const tomorrowDate = currentDate.toISOString().split('T')[0];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const thali_type = queryParams.get('thali_type');
  const type = queryParams.get('type');
  const id = queryParams.get('id');
  const { user, isAuthenticated } = useSelector(state => state.user);
  // State to store the tiffin data
  const [tiffinData, setTiffinData] = useState(null);
  const [subscriptionData, setSubriptionData] = useState({
    home_chef_id: 8,
    tiffin_id: 159,
    thali_type,
    start_date: tomorrowDate,
    total_days: 28,
    customer_address_id: null,
    lunch_or_dinner: type,
    included_weekend: [],
    is_sweet: 0,
    non_veg_days: [],
  });

  console.log({ start_date: subscriptionData.start_date });
  useEffect(() => {
    // Make the API call to fetch tiffin data based on the query parameters
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${server}/home-chef-tiffin?thali_type=${thali_type}&type=${type}&id=${id}`
        );
        const data = await response.json();
        setTiffinData(data);
      } catch (error) {
        console.error('Error fetching tiffin data:', error);
      }
    };

    fetchData();
  }, [thali_type, type, id]);

  useEffect(() => {
    if (user && user.id)
      setSubriptionData(prev => ({ ...prev, customer_address_id: user.id }));
  }, [user]);
  const daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  let basePrice = 0;
  let nonVegPrice = 0;
  let includedWeekendPrice = 0;
  let sweetsPrice = 0;
  let totalPrice = 0;
  let gstAmount = 0;
  let amountToBePaid = 0;
 const monthSelect = subscriptionData.total_days; 
  if (tiffinData && tiffinData.tiffins && tiffinData.tiffins[0]) {
    const perDayPriceForSweets =
      tiffinData.tiffins[0].data.per_day_price_for_sweets;

    basePrice =
      tiffinData.tiffins[0].data.per_day_price_for_veg *
      ((monthSelect / 7) * 5);
    nonVegPrice =
      (tiffinData.tiffins[0].data.per_day_price_for_non_veg -
        tiffinData.tiffins[0].data.per_day_price_for_veg) *
      (monthSelect / 7) *
      subscriptionData.non_veg_days.length;
    includedWeekendPrice =
      tiffinData.tiffins[0].data.per_day_price_for_veg *
      (monthSelect / 7) *
      subscriptionData.included_weekend.length;

    sweetsPrice =
      subscriptionData.is_sweet === 1
        ? (monthSelect / 7) *
          ((subscriptionData.included_weekend &&
            subscriptionData.included_weekend.length) +
            5) *
          perDayPriceForSweets
        : 0;

    totalPrice = basePrice + nonVegPrice + includedWeekendPrice + sweetsPrice;
    gstAmount = (totalPrice * 0.18).toFixed(2); // Applying 18% GST rate
    amountToBePaid = totalPrice + Number(gstAmount);
  }

  return (
    <Container maxW={'7xl'}>
      {tiffinData && tiffinData.tiffins && tiffinData.tiffins[0] && (
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={'md'}
              alt={'Product Image'}
              fallbackSrc={
                'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
              }
              src={tiffinData.tiffins[0].data.file}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: 'xl', sm: '3xl', lg: '4xl' }}
                textTransform={'capitalize'}
              >
                {thali_type} Thali (Only Weekdays)
              </Heading>
              <Text color={'gray.600'} fontWeight={300} fontSize={'2xl'}>
                ₹{' '}
                {tiffinData.tiffins[0].data.per_day_price_for_veg *
                  ((monthSelect / 7) * 5)}
              </Text>
            </Box>
            <HStack>
              <Select
                value={monthSelect}
                textTransform={'capitalize'}
                onChange={e => setSubriptionData(prev => ({...prev , total_days:e.target.value}))}
              >
                <option value="7">5 days</option>
                <option value="14">10 days</option>
                <option value="28">20 days</option>
              </Select>
            </HStack>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={<StackDivider borderColor={'gray.200'} />}
            >
              <Box>
                <Text
                  fontSize={'lg'}
                  color={'pink.500'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Daily Menu
                </Text>

                <Grid templateColumns="repeat(4, 1fr)" gap="1rem">
                  <GridItem colSpan={1}>
                    <List
                      spacing={2}
                      fontWeight="bold"
                      textTransform={'capitalize'}
                    >
                      {daysOfWeek.map(day => (
                        <ListItem>{day}</ListItem>
                      ))}
                    </List>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <List spacing={2}>
                      {daysOfWeek.map(day => (
                        <ListItemComponent>
                          {tiffinData.tiffins[0].data[`${day}_items`]}
                        </ListItemComponent>
                      ))}
                    </List>
                  </GridItem>
                </Grid>
              </Box>
              <Box>
                <Text
                  fontSize={'lg'}
                  color={'pink.500'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Tiffin Options
                </Text>
                <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
                  <GridItem>
                    <NonVegDaysAvailable
                      tiffinData={tiffinData}
                      monthSelect={monthSelect}
                      subscriptionData={subscriptionData}
                      setSubriptionData={setSubriptionData}
                    />
                  </GridItem>
                  <GridItem>
                    <WeekendInclued
                      tiffinData={tiffinData}
                      monthSelect={monthSelect}
                      subscriptionData={subscriptionData}
                      setSubriptionData={setSubriptionData}
                    />
                  </GridItem>
                </Grid>
              </Box>
              <Box>
                <Text
                  fontSize={'lg'}
                  color={'pink.500'}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}
                >
                  Starting Date
                </Text>
                <Input
                  type="date"
                  min={tomorrowDate}
                  value={subscriptionData.start_date}
                  onChange={e =>
                    setSubriptionData(prev => ({
                      ...prev,
                      start_date: e.target.value,
                    }))
                  }
                />
              </Box>
            </Stack>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={<StackDivider borderColor={'gray.200'} />}
            >
              <Box>
                <Stack
                  spacing={{ base: 1, sm: 2 }}
                  direction={'column'}
                  divider={<StackDivider borderColor={'gray.200'} />}
                >
                  <TableContainer>
                    <Table>
                      <Tbody>
                        <Tr>
                          <Th>Base Price</Th>
                          <Td isNumeric>₹ {basePrice}</Td>
                        </Tr>
                        <Tr>
                          <Th>NON VEG Price</Th>
                          <Td isNumeric>₹ {nonVegPrice}</Td>
                        </Tr>
                        <Tr>
                          <Th>Included Weekend Price</Th>
                          <Td isNumeric>₹ {includedWeekendPrice}</Td>
                        </Tr>
                        <Tr>
                          <Th>Sweets Price</Th>
                          <Td isNumeric>₹ {sweetsPrice}</Td>
                        </Tr>
                        <Tr>
                          <Th>Total Price</Th>
                          <Td isNumeric>₹ {totalPrice}</Td>
                        </Tr>
                        <Tr>
                          <Th>GST (18%)</Th>
                          <Td isNumeric>₹ {gstAmount}</Td>
                        </Tr>
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th>Amount to be Paid</Th>
                          <Td isNumeric>₹ {amountToBePaid.toFixed(2)}</Td>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </Stack>
              </Box>
            </Stack>

            {isAuthenticated ? (<SubscribeModal subscriptionData = {subscriptionData} setSubriptionData={setSubriptionData}/>) : (
             <Link to={'/login'}>
             <Button
                rounded={'md'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg="gray.50"
                color={'gray.900'}
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
              >
                Subscribe Tiffin
              </Button>
              </Link> 
            )}
          </Stack>
        </SimpleGrid>
      )}
    </Container>
  );
}

function ListItemComponent({ children: data }) {
  // Parse the JSON string
  const parsedData = JSON.parse(data);

  // Extract values from the parsed data
  const sabjis = parsedData['sbji/gravy'];
  const chapati = parsedData['chapati'];
  const rice = parsedData['Rice'];
  const others = parsedData['others'];

  // Create the list item string
  let listItem = '';
  if (sabjis) {
    listItem += `${sabjis}, `;
  }
  if (chapati && chapati > 0) {
    listItem += `${chapati} chapati, `;
  }
  if (rice && rice.toLowerCase() === 'yes') {
    listItem += 'rice, ';
  }
  if (others) {
    listItem += `${others}`;
  }

  // Remove trailing comma and whitespace
  listItem = listItem.replace(/,\s*$/, '');

  return <ListItem>{listItem}</ListItem>;
}

function NonVegDaysAvailable({
  tiffinData,
  monthSelect,
  setSubriptionData,
  subscriptionData,
}) {
  const nonVegAvailableDays = tiffinData.tiffins[0].data.non_veg_available_days;
  const perDayPriceForVeg = tiffinData.tiffins[0].data.per_day_price_for_veg;
  const perDayPriceForNonVeg =
    tiffinData.tiffins[0].data.per_day_price_for_non_veg;
  const nonVegDaysArray = nonVegAvailableDays.split(' , ');
  const handleCheckboxChange = e => {
    if (subscriptionData.non_veg_days.includes(e.target.value)) {
      setSubriptionData(prev => ({
        ...prev,
        non_veg_days: prev.non_veg_days.filter(day => day !== e.target.value),
      }));
    } else
      setSubriptionData(prev => ({
        ...prev,
        non_veg_days: [...prev.non_veg_days, e.target.value],
      }));
  };
  return (
    <List spacing={2}>
      <Text fontSize={'md'} fontWeight={'bold'}>
        Non Veg on Days
      </Text>
      {nonVegDaysArray.map(day => (
        <ListItem key={day}>
          {' '}
          <Checkbox
            value={day}
            colorScheme="pink"
            textTransform={'capitalize'}
            isChecked={subscriptionData.non_veg_days.includes(day)}
            onChange={handleCheckboxChange}
            isDisabled={
              (day === 'sunday' || day === 'saturday') &&
              !subscriptionData.included_weekend.includes(day)
            }
          >
            every {day} ( +{' '}
            {(perDayPriceForNonVeg - perDayPriceForVeg) * (monthSelect / 7)})
          </Checkbox>
        </ListItem>
      ))}
    </List>
  );
}

function WeekendInclued({
  tiffinData,
  monthSelect,
  subscriptionData,
  setSubriptionData,
}) {
  const nonVegDaysArray = ['sunday', 'saturday'];
  const perDayPriceForVeg = tiffinData.tiffins[0].data.per_day_price_for_veg;
  const perDayPriceForSweets =
    tiffinData.tiffins[0].data.per_day_price_for_sweets;
  const handleCheckboxChange = e => {
    if (subscriptionData.included_weekend.includes(e.target.value)) {
      setSubriptionData(prev => ({
        ...prev,
        included_weekend: prev.included_weekend.filter(
          day => day !== e.target.value
        ),
        non_veg_days: prev.non_veg_days.filter(day => day !== e.target.value),
      }));
    } else
      setSubriptionData(prev => ({
        ...prev,
        included_weekend: [...prev.included_weekend, e.target.value],
      }));
  };
  return (
    <VStack spacing={2} alignItems={'start'}>
      <List spacing={2}>
        <Text fontSize={'md'} fontWeight={'bold'}>
          Include Weekends
        </Text>
        {nonVegDaysArray.map(day => (
          <ListItem key={day}>
            {' '}
            <Checkbox
              value={day}
              colorScheme="pink"
              textTransform={'capitalize'}
              isChecked={subscriptionData.included_weekend.includes(day)}
              onChange={handleCheckboxChange}
            >
              every {day} ( + {perDayPriceForVeg * (monthSelect / 7)})
            </Checkbox>
          </ListItem>
        ))}
      </List>

      <List spacing={2}>
        <Text fontSize={'md'} fontWeight={'bold'}>
          Sweets EveryDay
        </Text>
        <ListItem>
          {' '}
          <Checkbox
            colorScheme="pink"
            textTransform={'capitalize'}
            isChecked={subscriptionData.is_sweet === 1}
            onChange={() =>
              setSubriptionData(prev => ({
                ...prev,
                is_sweet: subscriptionData.is_sweet === 1 ? 0 : 1,
              }))
            }
          >
            Sweets EveryDay ( +{' '}
            {(monthSelect / 7) *
              ((subscriptionData &&
                subscriptionData.included_weekend &&
                subscriptionData.included_weekend.length) +
                5) *
              perDayPriceForSweets}
            ){' '}
          </Checkbox>
        </ListItem>
      </List>
    </VStack>
  );
}

function SubscribeModal({ setSubriptionData, subscriptionData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState(null);

  return (
    <>
      <Button
        onClick={onOpen}
        rounded={'md'}
        w={'full'}
        mt={8}
        size={'lg'}
        py={'7'}
        bg="gray.50"
        color={'gray.900'}
        _hover={{
          transform: 'translateY(2px)',
          boxShadow: 'lg',
        }}
      >
        Subscribe Tiffin
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'lg'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!subscriptionData.customer_address_id ? (
              <AddressComponent
                setSubriptionData={setSubriptionData}
                setAddress={setAddress}
              />
            ) : (
              <>
                <VStack
                  p={4}
                  bg={'white'}
                  rounded={'lg'}
                  _hover={{ shadow: '2xl' }}
                  borderColor={'gray.400'}
                  borderWidth={'1px'}
                  alignItems={'end'}
                >
                  <Button
                    ml={'auto'}
                    onClick={() => {
                      setAddress(null);
                      setSubriptionData((prev) => ({
                        ...prev,
                        customer_address_id: null,
                      }));
                    }}
                  >
                    <HStack>
                      <Text>Change Address</Text>
                      <EditIcon />
                    </HStack>
                  </Button>

                  {address && (
                    <VStack
                      w={'full'}
                      alignItems={'start'}
                      px={2}
                      justifyContent={'space-between'}
                      h={'full'}
                      gap={2}
                    >
                      <VStack alignItems={'start'}>
                        <HStack>
                          <Text fontWeight={'bold'}>{address.name}</Text>
                          <Text fontSize={'sm'} color={'gray.600'}>
                            {address.mobile_number}
                          </Text>
                        </HStack>
                        <Text fontSize={'sm'} color={'gray.600'} noOfLines={'3'}>
                          {address.address_line1}, {address.address_line2}
                        </Text>
                      </VStack>
                    </VStack>
                  )}
                </VStack>
               
              </>
            )}
          </ModalBody>
          <ModalFooter>
          {address && subscriptionData.customer_address_id && (
<Payment subscriptionData= {subscriptionData} />
                )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}


function AddressComponent({ setSubriptionData,setAddress }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allAddress());
  }, [dispatch]);
  const selectAdd = ad => {
    setSubriptionData(prev => ({ ...prev, customer_address_id: ad.id }));
    setAddress(ad);
  };

  const { address } = useSelector(state => state.user);
  return (
    <VStack w={'full'} p={2}>
      <Heading w={'full'} size={'lg'}>
        Choose the location
      </Heading>
      <Flex
        w="full"
        p={2}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        rowGap={[2, 4]}
      >
        {address.map(ad => (
          <Box
            p={4}
            bg={'white'}
            rounded={'lg'}
            _hover={{ shadow: '2xl' }}
            w={'200px'}
            h={'auto'}
            borderColor={'gray.400'}
            borderWidth={'1px'}
          >
            <VStack
              w={'full'}
              alignItems={'start'}
              px={2}
              justifyContent={'space-between'}
              h={'full'}
              gap={2}
            >
              <VStack alignItems={'start'}>
                <HStack>
                  <Text fontWeight={'bold'}>{ad.name}</Text>
                  <Text fontSize={'sm'} color={'gray.600'}>
                    {ad.mobile_number}
                  </Text>
                </HStack>
                <Text fontSize={'sm'} color={'gray.600'} noOfLines={'3'}>
                  {ad.address_line1}, {ad.address_line2}
                </Text>
              </VStack>
              <Button
                onClick={() => {
                  selectAdd(ad);
                }}
              >
                Select Address
              </Button>
            </VStack>
          </Box>
        ))}
      </Flex>
    </VStack>
  );
}


function Payment({subscriptionData}) {
const [loading, setLoading] = useState(false)
const navigate = useNavigate();
  const createOrder = async()=>{
    setLoading(true)
    // debugger;
    try {
      const token = JSON.parse(localStorage.getItem("token"));
  const response  = await  axios.post(`${server}/subscribe-tiffin`, {...subscriptionData,included_weekend: JSON.stringify(subscriptionData.included_weekend) , non_veg_days:JSON.stringify(subscriptionData.non_veg_days) },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log({data : response.data})
  // debugger;

    paymentRequest(response.data.tiffin_subscription_data);
    setLoading(false);  

    // return navigate( '/my-subscriptions');
    } catch (error) {
      console.log(error)
      setLoading(false);  
      return error;

    }
  
  
    
   }
  
  
   const Razorpay = useRazorpay();

   const paymentRequest = async(tiffin_subscription_data)=>{
    try {
      const token = JSON.parse(localStorage.getItem("token"));
  const response  = await  axios.post(`${server}/pay-subscription`, {order_no: tiffin_subscription_data.order_no , home_chef_id : tiffin_subscription_data.home_chef_id},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log({data : response.data})
  // debugger;

    handlePayment(response.data);
    // setLoading(false);  

    } catch (error) {
      console.log(error)
      setLoading(false);  

      return error;
    }
   }


    const handlePayment = async (order) => {
    console.log(order);
      const options = {
        key: "rzp_live_RFDCf6fNpIDBTl", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "PinkAprons",
        description: "pinkAprons",
        image: {logoimg},
        order_id: order.rzp_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (rs) {
          const token = JSON.parse(localStorage.getItem("token"));
  
         axios.post(`${server}/success-payment` ,{
            "order_id": rs.razorpay_order_id,
            "razorpay_payment_id":  rs.razorpay_payment_id,
            "generated_signature": rs.razorpay_signature
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res => {
          console.log(res.data);
          navigate('/my-subscriptions');
        }).catch(e=> alert(e));
  console.log(rs);
        },
        prefill: {
          name: order.customer_name,
          email: order.email ,
          contact: order.mobile_number,
        },
        notes: {
          address: "order by pinkapprons",
        },
        theme: {
          color: "rgba(247, 35, 150, 1)",
        },
      };
      console.log(options);
      const rzp1 = new Razorpay(options);
  
      rzp1.on("payment.failed", function (response) {
        navigate('/my-subscriptions');
  
      });
    
      rzp1.open();
    };
    
  return (
    <Button variant="solid" colorScheme="pink" isLoading={loading} onClick={createOrder}>
    Make Payment 
  </Button>
  )
  
}
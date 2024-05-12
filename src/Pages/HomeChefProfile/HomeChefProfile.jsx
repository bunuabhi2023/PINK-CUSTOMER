import {
  Box,
  Button,
  Divider,
  GridItem,
  HStack,
  Heading,
  Icon,
  Image,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  Grid,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";



import {
  getHomechefById,
  loadHomeChefs,
} from '../../App/Actions/screenDataReducerAction';
import { MdLocalOffer } from 'react-icons/md';
import { FaCircle, FaEgg } from 'react-icons/fa';
import { BsFillTriangleFill } from 'react-icons/bs';
import ProductData from './ProductData';
import Menu from './Tiffinmenu';
import { server } from '../../App/store';
import { StarIcon } from '@chakra-ui/icons';
import ReviewModule from './ReviewModule';
import GalleryModule from './GalleryModule';
import StickyBox from './StickeyCartBox';
function HomeChefProfile() {
  const { nameandid } = useParams();
  const name = nameandid.split('-');
  let id = name[name.length - 1];
  console.log(id);

  const [tiffinData, setTiffinData] = useState(null);
const [galleryData, setGalleryData] = useState(null) ;
 useEffect(() => {
    // Make the API call to fetch tiffin data based on the query parameters
    const fetchData = async () => {
      try {
        const response = await fetch(`${server}/home-chef-tiffin?&id=${id}`);

        const data = await response.json();
        setTiffinData(data);

        const response2 = await fetch(`${server}/about-home-chef-by-id/${id}`);

        const data2 = await response2.json();
        setGalleryData(data2.data);




      } catch (error) {
        console.error('Error fetching tiffin data:', error);
      }
    };

    fetchData();
  }, [id]);

  console.log({galleryData})

  const { homeChefs, homeChef } = useSelector(state => state.screenData);

  const homechefPersonalDetails = homeChefs
    ? homeChefs.find(hc => hc.id === parseInt(id) || hc.id === id)
    : '';
  console.log({ tiffinData });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomechefById(id));
  }, [dispatch, id]);
  console.log({ homeChef });

  if (homeChef)
    return (
      <Box py={'16'} minH="90vh" my={0} w={'100%'} px={['0', '8']}>
        <Grid
          w="full"
          templateColumns="repeat(4, 1fr)"
          templateRows="repeat(2, 1fr)"
          h={['200px', '367px']}
          gap={2}
        >
          <GridItem rowSpan={2} colSpan={2} overflow="hidden">
            <Image
              w="full"
              h="full"
              objectFit="cover"
              transition={'all'}
              transitionDuration={'500ms'}
              cursor={'pointer'}
              _hover={{ transform: 'scale(1.1)  rotate(2deg)' }}
              src={galleryData?.images[0]?.file || "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1} overflow="hidden">
            <Image
              w="full"
              h="full"
              objectFit="cover"
              transition={'all'}
              transitionDuration={'500ms'}
              cursor={'pointer'}
              _hover={{ transform: 'scale(1.1)  rotate(2deg)' }}
              src=  {galleryData?.images[1]?.file || "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            />
          </GridItem>
          <GridItem
            rowSpan={2}
            colSpan={1}
            overflow="hidden"
            position={'relative'}
          >
            <Image
              w="full"
              h="full"
              objectFit="cover"
              transition={'all'}
              transitionDuration={'500ms'}
              _hover={{ transform: 'scale(1.1)  rotate(2deg)' }}
             src= {galleryData?.images[2]?.file || "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            />
          </GridItem>
          <GridItem bg={'purple'} rowSpan={1} colSpan={1} overflow="hidden">
            <Image
              w="full"
              h="full"
              objectFit="cover"
              transition={'all'}
              transitionDuration={'500ms'}
              cursor={'pointer'}
              _hover={{ transform: 'scale(1.1)  rotate(2deg)' }}
              src={galleryData?.images[3]?.file || "https://images.pexels.com/photos/9609865/pexels-photo-9609865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
            />
          </GridItem>
        </Grid>

        <Box my={0} w={'100%'} px={2}>
          <VStack
            gap={4}
            minH="80vh"
            w="full"
            overflow={'hidden'}
            mx={'auto'}
            alignItems={'start'}
            py={'4'}
          >
            <HStack w="full">
              <VStack
                w="full"
                minH={'24'}
                alignItems={'start'}
                gap={0}
                justifyContent={'center'}
              >
                <Text
                  textTransform={'capitalize'}
                  fontSize={['lg', 'xl']}
                  p="0"
                  m={0}
                  fontWeight={'bold'}
                >
                  {homeChef[0].home_chef_name}
                </Text>
                homeChef &&{' '}
                <Heading as={'h1'} fontSize={['xs', 'sm']} color={'gray.500'}>
                 {homeChef[0].city}
                </Heading>
              </VStack>
              <VStack w="full" minH={'24'} alignItems={'end'}>
                <Box
                  border={'solid 2px'}
                  display="flex"
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderColor={
                    homeChef['rating']['average_rating']
                      ? 'green.500'
                      : 'gray.400'
                  }
                  color={
                    homeChef['rating']['average_rating']
                      ? 'green.500'
                      : 'gray.400'
                  }
                  gap={1}
                  h="20"
                  aspectRatio={`1`}
                >
                  {
                    <Text
                      fontSize={'4xl'}
                      fontWeight={'bold'}
                      color={
                        homeChef['rating']['average_rating']
                          ? 'green.500'
                          : 'gray.400'
                      }

                      // display={ homeChef['rating']['average_rating']  ? "block": "none"}
                    >
                      {homeChef['rating']['average_rating']
                        ? Number(
                            parseFloat(
                              homeChef['rating']['average_rating']
                            ).toFixed(1)
                          )
                        : '-'}
                    </Text>
                  }
                  <StarIcon
                    color={
                      homeChef['rating']['average_rating']
                        ? 'green.500'
                        : 'gray.400'
                    }
                  />
                </Box>
              </VStack>
            </HStack>

            <Box
              w="full"
              overflow={'scroll'}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '1px',
                  h: '0px',
                },
                '&::-webkit-scrollbar-thumb': {
                  bg: 'gray.300',
                  borderRadius: 'full',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  bg: 'gray.500',
                },
                '&::-webkit-scrollbar-track': {
                  bg: 'transparent',
                },
              }}
            >
              <Box
                spacing={4}
                w="max"
                flexWrap={'none'}
                display={'flex'}
                gap="3"
              >
                {homeChef.offers.map(offer => (
                  <VStack
                    alignItems={'start'}
                    border={'0.1px solid '}
                    borderColor={'gray.200'}
                    background={'white'}
                    rounded={'lg'}
                    p="2"
                    display={'inline-flex'}
                    size={['lg']}
                    key={offer.id}
                  >
                    <Text fontWeight={'bold'}>
                      {' '}
                      <Icon>
                        <MdLocalOffer />
                      </Icon>{' '}
                      {offer.title}
                    </Text>
                    <Text fontSize={'x-small'} color={'gray.500'}>
                      Rupees {offer.discount_amount} Off on minimum order{' '}
                      {offer.minimum_order_value}
                    </Text>
                  </VStack>
                ))}
              </Box>
            </Box>

            <ProductTabs
              homeChef={homeChef}
              homeChefId={id}
              tiffinData={tiffinData}
              galleryData = {galleryData}
            />
                        <StickyBox homeChefId = {id}/>

          </VStack>
        </Box>
      </Box>
    );
  else
    return (
      <Box py={'14'} minH="90vh" my={0} w={'100vw'}>
        <Box my={0} w={'100%'} bgColor={'rgb(252,253,253)'}>
          <VStack
            gap={4}
            minH="80vh"
            maxW={'800px'}
            w="full"
            overflow={'hidden'}
            mx={'auto'}
            alignItems={'start'}
            py={'4'}
          >
            <HStack w="full">
              <VStack
                w="full"
                minH={'24'}
                alignItems={'start'}
                gap={0}
                justifyContent={'center'}
              >
                <SkeletonText
                  w={'full'}
                  textTransform={'capitalize'}
                  fontSize={['lg', 'xl']}
                  p="0"
                  m={0}
                  fontWeight={'bold'}
                ></SkeletonText>
                <SkeletonText
                  as={'h1'}
                  w={'full'}
                  fontSize={['xs', 'sm']}
                  color={'gray.500'}
                ></SkeletonText>
              </VStack>
              <VStack w="full" minH={'24'}>
                <Box
                  border={'solid 2px'}
                  display="flex"
                  alignItems={'center'}
                  justifyContent={'center'}
                  borderColor={'green.500'}
                  h="20"
                  aspectRatio={`1`}
                >
                  {
                    <SkeletonText
                      fontSize={'4xl'}
                      fontWeight={'bold'}
                      color={'green.500'}
                    >
                      43
                    </SkeletonText>
                  }
                </Box>
              </VStack>
            </HStack>
            <Divider borderWidth={'2px'} />

            <Box
              w="full"
              overflow={'scroll'}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '1px',
                  h: '0px',
                },
                '&::-webkit-scrollbar-thumb': {
                  bg: 'gray.300',
                  borderRadius: 'full',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  bg: 'gray.500',
                },
                '&::-webkit-scrollbar-track': {
                  bg: 'transparent',
                },
              }}
            >
              <Box
                spacing={4}
                w="full"
                flexWrap={'none'}
                display={'flex'}
                gap="3"
              >
                {
                  <VStack
                    alignItems={'start'}
                    border={'0.1px solid '}
                    w="full"
                    borderColor={'gray.200'}
                    background={'white'}
                    rounded={'lg'}
                    p="2"
                    display={'inline-flex'}
                    size={['lg']}
                  >
                    <SkeletonText fontWeight={'bold'} w={'full'}>
                      {' '}
                    </SkeletonText>
                    <SkeletonText
                      fontSize={'x-small'}
                      w={'full'}
                      color={'gray.500'}
                    ></SkeletonText>
                  </VStack>
                }
              </Box>
            </Box>
          </VStack>
        </Box>
      </Box>
    );
}

export default HomeChefProfile;

const ProductTabs = ({ homeChef, homeChefId, tiffinData,galleryData }) => {
  const products = homeChef.products;
  return (
    <Tabs colorScheme="pink" w="full" fontFamily={''} fontSize={'12px'}>
      <TabList>
        <Tab fontWeight={500} fontSize={['12px','14px']}>
         <HStack gap={1}>
          <Text>Order</Text>
          <Text display={['none','inline-block']}>{"Online"}</Text>
         </HStack>
        </Tab>
        <Tab fontWeight={500} fontSize={['12px','14px']}>
        <HStack gap={1}>
        <Text>
        Tiffin</Text> <Text display={['none','inline-block']}>{"Services" }</Text>

          </HStack>        </Tab>
        <Tab fontWeight={500} fontSize={['12px','14px']}>
          Reviews
        </Tab>
        <Tab fontWeight={500} fontSize={['12px','14px']}>
          View Gallery
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProductData products={products} homeChefId={homeChefId} />
        </TabPanel>
        <TabPanel>
          {tiffinData && <Menu tiffins={tiffinData.tiffins} />}{' '}
        </TabPanel>
        <TabPanel>
          <ReviewModule homeChefId={homeChefId} />
        </TabPanel>
        <TabPanel>
          <GalleryModule  galleryData={galleryData} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};











// function CarouselForMObile() {
//   const [open, setOpen] = React.useState(false);
//   const [index, setIndex] = React.useState(0);

//   const toggleOpen = (state) => () => setOpen(state);

//   const updateIndex = ({ index: current }) => setIndex(current);

//   return (
//     <>
//       <Text>
//         Here is an example of an image carousel with a lightbox. You can click
//         any photo to open it in a lightbox.
//       </Text>

//       <Lightbox
//         index={index}
//         slides={slides}
//         plugins={[Inline]}
//         on={{
//           view: updateIndex,
//           click: toggleOpen(true),
//         }}
//         carousel={{
//           padding: 0,
//           spacing: 0,
//           imageFit: "cover",
//         }}
//         inline={{
//           style: {
//             width: "100%",
//             maxWidth: "900px",
//             aspectRatio: "3 / 2",
//             margin: "0 auto",
//           },
//         }}
//       />

//       <Lightbox
//         open={open}
//         close={toggleOpen(false)}
//         index={index}
//         slides={slides}
//         on={{ view: updateIndex }}
//         animation={{ fade: 0 }}
//         controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
//       />
//     </>
//   );
// }

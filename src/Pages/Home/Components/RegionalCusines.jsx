
// function RegionalCusines() {


//   const navigatingToChef =(id)=>{
//     navigate({
//           pathname: '/chef',
//           search: `?${createSearchParams({cuisine_id: id})}`,
//         });
//   }
//   return (
//     <Box w="full" bgColor={'white'} py={[4,8]} px={2}>
//       <VStack
//             w={'full'}
//             maxW={'container.xl'}
//             px={[2, 6, 8, 12]}
//  gap={[2,4]}
//  borderRadius= '8px'

//  alignItems={'start'}
//       >
//       <Heading fontFamily={'Montserrat'} size={'md'}>Authentic Indian Cuisines: Connecting With Indian Roots</Heading>
//       <Box w="full" overflowX={'auto'} overflowY={'hidden'}       css={{
//         "&::-webkit-scrollbar": {
//           display: "none",
//         },
//         scrollbarWidth: "none",
//         msOverflowStyle: "none",
//       }}
//   >

// {cuisine ?     <Flex w="max"  gap={[2,4]}       css={{
//         "&::-webkit-scrollbar": {
//           display: "none",
//         },
//         scrollbarWidth: "none",
//         msOverflowStyle: "none",
//       }}
// >


//    <>

//    </>
//    </Flex>
//  :<VStack w="max" minW={'100%'} backgroundColor={'white'} p={[2,4]}  borderRadius= '8px'  cursor={'pointer'}      _hover={{ boxShadow: "2xl" }}

// >
//   <Flex alignItems={'center'}  justifyContent ="center" width = "100%" h = "200px">
//     <Spinner/>
//   </Flex>
//   <Text size={'md'} fontFamily={'Montserrat'} opacity={'0'} fontWeight={'bold'}>{"fasdf"}</Text>

// </VStack>
// }
// </Box>


//       </VStack>
//     </Box>
//   )
// }






















import React, { useCallback, useRef } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { loadCusines } from '../../../App/Actions/screenDataReducerAction'
import { Box, Button, Card, Flex, HStack, Heading, IconButton, Image, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import {GrFormNextLink, GrFormPreviousLink} from 'react-icons/gr'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

export const LandingPageCousines = () => {
  const swiperRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCusines());
  }, [dispatch]);
  const {cuisine} = useSelector(state=>state.screenData)

  return (
<Box p={[2,8]} py={'20'} w="full" position={'relative'}>
  <HStack w="full" gap={1} justifyContent={'start'} ps="2">
  <IconButton  rounded={"full"}  colorScheme="blackAlpha" onClick={() => swiperRef.current?.slidePrev()}><GrFormPreviousLink/></IconButton>
        <IconButton rounded={"full"}  colorScheme="blackAlpha" onClick={() => swiperRef.current?.slideNext()}><GrFormNextLink/></IconButton>
  
  </HStack>
<Box w="full">
{cuisine && <Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}

      breakpoints={{
        576: {
   
          slidesPerView: 2,
        },
        768: {
        
          slidesPerView: 3,
        },
        1024: {
       
          slidesPerView: 4,
        },
      }}
      spaceBetween={50}
    >
  {cuisine.map(c=>(
  <SwiperSlide className="bg-color1">
      <HorizontalCard product ={c}/>
      </SwiperSlide>
      ))}
     </Swiper>}
</Box>
</Box>
  );
};








function RegionalCusines() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCusines());
  }, [dispatch]);
  const {cuisine} = useSelector(state=>state.screenData)
  const navigate = useNavigate();

  const navigatingToChef =(id)=>{
    navigate({
          pathname: '/chef',
          search: `?${createSearchParams({cuisine_id: id})}`,
        });
  }
  return (
    <Box w="full" backgroundColor={'rgba(248, 248, 248, 1)'} py={[4,8]} px={2}>
      <VStack
            w={'full'}
            maxW={'container.xl'}
            px={[2, 6, 8, 12]}
 gap={[2,4]}
 borderRadius= '8px'

 alignItems={'start'}
      >
      <Heading fontFamily={'Montserrat'}>Regional Cusines</Heading>
      <Box w="full" overflowX={'auto'} overflowY={'hidden'}       css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
  >

{cuisine ?     <Flex w="max"  gap={[2,4]}       css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
>


   <>{cuisine.map(c=>(
    <VStack backgroundColor={'white'} p={[2,4]}  borderRadius= '8px'  cursor={'pointer'}      _hover={{ boxShadow: "2xl" }}
onClick={()=>navigatingToChef(c.id)}
    >
      <Image mx={'auto'} width = "230px" h = "200px" flexShrink={0}  borderRadius= '8px'
      fallbackSrc='https://images.unsplash.com/photo-1539136788836-5699e78bfc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhdGUlMjBvZiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80'

 src ={c.image} alt={c.name}/>
 <Text size={'md'} fontFamily={'Montserrat'} fontWeight={'bold'}>{c.name}</Text>
    </VStack>
  ))}

   </>
   </Flex>
 :<VStack w="max" minW={'100%'} backgroundColor={'white'} p={[2,4]}  borderRadius= '8px'  cursor={'pointer'}      _hover={{ boxShadow: "2xl" }}

>
  <Flex alignItems={'center'}  justifyContent ="center" width = "100%" h = "200px">
    <Spinner/>
  </Flex>
  <Text size={'md'} fontFamily={'Montserrat'} opacity={'0'} fontWeight={'bold'}>{"fasdf"}</Text>

</VStack>
}
</Box>


      </VStack>
    </Box>
  )
}

export default RegionalCusines






function HorizontalCard({product}) {
  return (
    <VStack backgroundColor={'white'} p={[2,4]}  borderRadius= '8px'  cursor={'pointer'}      _hover={{ boxShadow: "2xl" }}   >
      <Image mx={'auto'} width = "230px" h = "200px" flexShrink={0}  borderRadius= '8px'
      fallbackSrc='https://images.unsplash.com/photo-1539136788836-5699e78bfc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhdGUlMjBvZiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80'

 src ={product.image} alt={product.name}/>
 <Text size={'md'} fontFamily={'Montserrat'} fontWeight={'bold'}>{product.name}</Text>
    </VStack>
  )
}


import React, { useCallback, useRef } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import "./mainslider.css";
import { Box, Button, Card, HStack, Heading, IconButton, Image, Stack, Text, VStack } from '@chakra-ui/react'
import {GrFormNextLink, GrFormPreviousLink} from 'react-icons/gr'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const PropertiesCardSlider = () => {
  const swiperRef = useRef();


  return (
<Box p={[2,8]} py={'20'} w="full" position={'relative'}>
<HStack w="full" gap={1} justifyContent={'start'} ps="2">
  <IconButton  rounded={"full"}  colorScheme="blackAlpha" onClick={() => swiperRef.current?.slidePrev()}><GrFormPreviousLink/></IconButton>
        <IconButton rounded={"full"}  colorScheme="blackAlpha" onClick={() => swiperRef.current?.slideNext()}><GrFormNextLink/></IconButton>
  
  </HStack>
<Box w="full">
<Swiper
        modules={[Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}

      breakpoints={{
        576: {
          width: 576,
          slidesPerView: 1,
        },
        768: {
          width: 768,
          slidesPerView: 1,
        },
        1024: {
          width: 768,
          slidesPerView: 1,
        },
      }}
      spaceBetween={2}
      slidesPerView={1}
    >
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title1"/>
      </SwiperSlide>
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title2"/>
      </SwiperSlide>
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title3"/>
      </SwiperSlide>
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title4"/>
      </SwiperSlide>
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title5"/>
      </SwiperSlide>
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title7"/>
      </SwiperSlide>
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title7" />
      </SwiperSlide>
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title8"/>
      </SwiperSlide>
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title9"/>
      </SwiperSlide>
      <SwiperSlide className="bg-color1">
      <HorizontalCard title = "title10"/>
      </SwiperSlide>
     </Swiper>
</Box>
</Box>
  );
};

export default PropertiesCardSlider;











function HorizontalCard({title}) {
  return (
    <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  position={'relative'}
  p={'2'}
  w={'full'}
  mx={1}
>

  <Image
    objectFit='cover'
    src={'https://cookin.com/_next/static/media/chef-2.eb5257c4.png?imwidth=1080'}
    borderRadius={'3xl'}
    alt='property'
    h={'250px'}
    w="auto"
  />

  <Stack  p={'2'}>
    <Box p={'2'} h={"full"}>
        <VStack h={"full"} gap={'2'} alignItems={'start'} justifyContent={'center'}>
            <Box >
      <Heading size='lg' >Barnstar Kitchen</Heading>
      <Heading size='md'>ALISSA</Heading>
            </Box>
            <Text
                as={'span'}
                position={'relative'}
                zIndex={'10'}
                >
I’ve never been with a company that is so enthusiastic and supportive. Their emphasis lies on the cook’s success without compromising the cook’s personal style and food philosophy.


</Text>
        </VStack>
    </Box>
  </Stack>
</Card>
  )
}


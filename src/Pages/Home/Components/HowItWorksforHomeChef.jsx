import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

const HowItWorksForHomeChef = () => {
  return (
    <Box  py={8} w="full" px={[2,8]} background={'white'}>
      <Heading as="h2"  mb={6}       fontFamily={'Sansita Swashed'} w="full" textAlign={'center'} size={['xl','2xl']}>
      How it works
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" gap={[4,8]}  flexWrap={'wrap'}>
        <Box               rounded={'lg'}
        p={4}   w={{ base: "100%", md: "200px"  , lg: "340px" }} >
          <Box  position="relative" mb={4} >
            <Image
              src="https://cdn.pixabay.com/photo/2023/05/16/18/16/baker-7998336_1280.jpg"
              alt="Chef in chef's jacket preparing food"
              decoding="async"
              data-nimg="responsive"
              rounded={'50px'}
              w='100%'
                            aspectRatio={1}
              objectFit="cover"
            />
          </Box>
          <Box  mb={4}>
          </Box>
          <Heading as="h3"  mb={6}      fontFamily={'Sansita Swashed'} w="full" size={['lg','xl']}>

          Build your business
          </Heading>
          <Text  mb={0}>
          With PinkAprons, you’ll have access to a marketplace of hungry customers, packaging, marketing support and a dedicated cook success team.
</Text>
        </Box>

        <Box               rounded={'lg'}
      p={4}      w={{ base: "100%", md: "200px", lg: "340px" }}>
          <Box position="relative" mb={4}>
            <Image
              src="https://cdn.pixabay.com/photo/2016/03/27/21/34/restaurant-1284351_1280.jpg"
              alt="Chef tossing vegetables in bowl"
              decoding="async"
              data-nimg="responsive"
              rounded={'50px'}
              w='100%'
              aspectRatio={1}
              objectFit="cover"
            />
          </Box>
          <Box  mb={4}>

          </Box>
          <Heading as="h3"  mb={6}      fontFamily={'Sansita Swashed'} w="full" size={['lg','xl']}>

          Become your own boss
          </Heading>
          <Text  mb={0}>
          Make your own menu and choose only the days and hours that work for you. You’ve got total control over how, when and where you do your thing.

</Text>
        </Box>

        <Box               rounded={'lg'} p={4} w={{ base: "100%", md: "200px", lg: "340px" }}>
          <Box  position="relative" mb={4}>
            <Image
              src="https://cdn.pixabay.com/photo/2020/03/03/12/37/healthy-food-4898650_1280.jpg"
              alt="Pasta on plate"
              decoding="async"
              data-nimg="responsive"
              rounded={'50px'}
              w='100%'
              aspectRatio={1}
              objectFit="cover"
            />
          </Box>
          <Box  mb={4}>

          </Box>
          <Heading as="h3"  mb={6}      fontFamily={'Sansita Swashed'} w="full" size={['lg','xl']}>
          We’ll take care of the logistics.

          </Heading>
          <Text  mb={0}>
          We manage the delivery, payments, and customer support, so you can enjoy getting paid to cook for hungry customers without the stress.

</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default HowItWorksForHomeChef;

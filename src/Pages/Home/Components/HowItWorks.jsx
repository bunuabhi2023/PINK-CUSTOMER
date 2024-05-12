import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";

const HowItWorks = () => {
  return (
    <Box  py={8} w="full" px={[2,8]} background={'white'}>
      <Heading as="h2"  mb={6}       fontFamily={'Sansita Swashed'} w="full" textAlign={'center'} size={['xl','2xl']}>
        How it Works
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#17C77A">
              <circle cx="12" cy="12" r="12" />
              <path
                d="M11.8118 9.58981V17.4545H13.6361V6.54541H12.0162C11.7389 7.50051 11.0092 8.09746 9.27246 8.09746V9.58981H11.8118Z"
                fill="#191919"
              />
            </svg>
          </Box>
          <Heading as="h3"  mb={6}      fontFamily={'Sansita Swashed'} w="full" size={['lg','xl']}>

            Discover
          </Heading>
          <Text  mb={0}>
          Search talented home chefs, based on cuisines, ratings & location
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#17C77A">
              <circle cx="12" cy="12" r="12" />
              <path
                d="M15.6768 17.585V15.8688H11.3864C14.0359 14.0022 15.5714 12.3613 15.5714 10.1183C15.5714 7.89035 14.066 6.40002 11.7327 6.40002C9.36923 6.40002 7.83375 7.99572 8.01439 10.3742H9.85095C9.71547 8.8839 10.4983 8.11615 11.7026 8.11615C12.8768 8.11615 13.6897 8.80863 13.6897 10.1334C13.6897 11.7893 12.395 13.2645 8.08966 16.0495V17.6L15.6768 17.585Z"
                fill="#191919"
              />
            </svg>
          </Box>
          <Heading as="h3"  mb={6}      fontFamily={'Sansita Swashed'} w="full" size={['lg','xl']}>

            Order
          </Heading>
          <Text  mb={0}>
          Place instant orders of freshly made home-cooked food or schedule orders
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#17C77A">
              <circle cx="12" cy="12" r="12" />
              <path
                d="M11.6374 12.372C11.9869 12.372 12.1686 12.372 12.4063 12.386C13.6643 12.4698 14.2374 13.2107 14.2374 14.1752C14.2374 15.2935 13.4686 16.0064 12.3783 16.0064C11.274 16.0064 10.5611 15.3354 10.5611 14.1612H8.7998C8.7998 16.3139 10.3235 17.6 12.3503 17.6C14.3912 17.6 15.9987 16.286 15.9987 14.2032C15.9987 12.4419 14.8665 11.2956 13.4127 10.9462L15.7611 8.70963V7.19995H9.27507V8.77952H13.4267L10.8966 11.1978V12.372H11.6374Z"
                fill="#191919"
              />
            </svg>
          </Box>
          <Heading as="h3"  mb={6}      fontFamily={'Sansita Swashed'} w="full" size={['lg','xl']}>
          Get Delivered
          </Heading>
          <Text  mb={0}>
          Yummy home-cooked food will be delivered to your doorstep, as per your instructions
                    </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default HowItWorks;

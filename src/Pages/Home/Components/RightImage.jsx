import { Box, Container, Flex, Heading, Icon, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

var imageLinks = {
    ios: 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg',
    android: 'https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'
  };

  export default RightImage
  
function RightImage({title , subTitle , appLinks , imageSrc , imageAlt , para,colorTheme, ...rest}) {
    return (
      <Box w="full"  px={[2,12]} {...rest} > 
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 8, md: 10 }}
          px={"4"}
          rounded={'50px'}
          background={colorTheme === 'dark'? 'black' : 'white'} color={colorTheme === 'dark'? 'white' : 'black'}
          direction={{ base: 'column', md: 'row' }}>
            <Stack flex={1} spacing={{ base: 2, md: 4}} w={['full','100%']} >
    {   title &&     <Heading
    fontFamily={'Sansita Swashed'}

              lineHeight={1.1}
              fontSize={subTitle ? { base: 'xl', sm: '3xl', lg: '5xl' } :{ base: '2xl', sm: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                zIndex={'10'}
                >
{title}
              </Text>
            </Heading>}

        {  subTitle &&   <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: 'xl', sm: '2xl', lg: 'xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                zIndex={'10'}
                color={colorTheme === 'dark'? 'pink.500' : 'pink.sideNav'}
                fontFamily={'Montserrat'}
                >
{subTitle}
              </Text>
            </Heading>}
  {    para&&      <Text color={colorTheme === 'dark'? 'gray.300' : 'gray.500'}                 fontFamily={'Poppins'}
>


{para}            </Text>}
         { appLinks&&   <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }} alignItems={'center'}>
                      <Link to ="/">
           <Image w="180px" src={imageLinks.android}/>
           </Link>    

            </Stack>}
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={['full','400px']}>
            <Box
              position={'relative'}
              rounded={'50px'}
              boxShadow={'2xl'}
              w={['full','400px']}
              zIndex={'2'}
              overflow={'hidden'}>
              <Image
                alt={imageAlt || "pinkAprons"}
                fit={'cover'}
                align={'center'}
                w={['full','400px']}
                aspectRatio={1}
            fallbackSrc={
'https://cdn.pixabay.com/photo/2014/12/22/12/20/food-577222_1280.jpg'           
    }
src={imageSrc}
              />
            </Box>
          </Flex>
        </Stack>
      </Box>
    );
  }
    

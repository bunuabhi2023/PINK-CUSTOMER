import { Box, Container, SimpleGrid, Stack, useColorModeValue , Image, Text, Button, VisuallyHidden, Link} from '@chakra-ui/react';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';


var imageLinks = {
    ios: 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg',
    android: 'https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'
  };

  

  
export const SocialButton = ({
    children,
    label,
    href,
  }) => {
    return (
      <Button
        rounded={'full'}
        size={'lg'}
        h={'unset'}
        aspectRatio={1}
          cursor={'pointer'}
        as={'a'}
        href={href}
        color={'white'}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        target='_blank'
        variant={'ghost'}
        colorScheme='whiteAlpha'
        transition={'background 0.3s ease'}
        >
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </Button>
    );
  };

  
const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };
  
const Footer =()=> {
    return (
  <Box w="full" px={[1,4]} pb={[1,4]} fontSize={['xs','sm']}>
        <Box
        w="full"
        bgColor={'black'}
        rounded={['8px','50px']}
        color='white'>
        <Container as={Stack} maxW={'5xl'} py={[1,10]}>
          <SimpleGrid columns={{ base: 2, sm: 4, md: 4 }} spacing={[2,8]}>
            <Stack align={'flex-start'}>
              <ListHeader fontSize={['xs','sm']}>Company</ListHeader>
              <RouterLink to="/our-story">
              <Button variant={'link'} color={'white'} fontWeight={'normal'}>Our Story</Button>
              </RouterLink>

              <Link target='_blank' href={'http://blog.pinkaprons.in/'}>Blog</Link>
             <RouterLink to="/become-a-home-chef">
               <Button variant={'link'}  color={'white'} fontWeight={'normal'}>Cook with us</Button>
               </RouterLink>
            </Stack>
  
            <Stack align={'flex-start'}>
              <ListHeader fontSize={['xs','sm']}>Support</ListHeader>
              <Link href={'#'}>Help Center</Link>
              <Link href={'#'}>Safety Center</Link>
              <Link href={'#'}>Community Guidelines</Link>
            </Stack>
  
            <Stack align={'flex-start'}>
              <ListHeader fontSize={['xs','sm']}>Legal</ListHeader>
              <Link href={'#'}>Cookies Policy</Link>
              <Link href={'#'}>Privacy Policy</Link>
              <Link href={'#'}>Terms of Service</Link>
              <Link href={'#'}>Law Enforcement</Link>
            </Stack>
  
            <Stack align={'flex-start'}>
              <ListHeader fontSize={['xs','sm']}>Install App</ListHeader>
              
             <Link>
             <Image w={['100px',"180px"]} src={imageLinks.android}/>
             </Link>    
             <Link>
             <Box p={'2'}>
             <Image w={['100px',"160px"]} src={imageLinks.ios}/>
             </Box>
             </Link>    
          
            </Stack>
          </SimpleGrid>
        </Container>
  
        <Box
        >
          <Container
            as={Stack}
            maxW={'6xl'}
            direction={{ base: 'column', md: 'row' }}
            spacing={[1,4]}
            justify={{ md: 'space-between' }}
            align={{ md: 'center' }}>
            <Text>© 2022 PinkAprons</Text>
            <Stack direction={'row'} spacing={[2,6]} pr={[2,8]}>
              <SocialButton label={'facebook'} href={'https://www.facebook.com/PinkApronsIndia'}  target="_blank">
                <FaFacebook/>
              </SocialButton>
              <SocialButton label={'YouTube'} href={'https://www.facebook.com/PinkApronsIndia'} target="_blank">
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'https://www.instagram.com/pinkapronsindia/'} target="_blank">
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
  </Box>
    );
  }

  export default Footer;
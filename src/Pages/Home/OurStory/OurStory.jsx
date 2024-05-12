import React from 'react'
import LandingNav from '../Components/LandingNav'
import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react'
import Footer from '../../Layout/Footer'
import LeftImage from '../Components/LeftImage'
import RightImage from '../Components/RightImage'

function OurStory() {
  return (
    <VStack gap={[4,12]} w="full" overflowX={'hidden'} my={0} py={0} >
<Box background={'#F5F5F5'}w="full" mt={0}> 
<LandingNav />

<VStack w="full" gap={'4'}  maxW={'container.md'} mx={'auto'}>
<Heading pt={16}  as="h2"  mb={6}       fontFamily={'Sansita Swashed'} w="full" textAlign={'center'} size={'4xl'}>

Our Story

</Heading>
<Text   fontSize={['xl','2xl']}   fontFamily={'Poppins'}>
PinkAprons is Pune’s biggest home chef aggregator, with more than 1000 home chefs and 30,000 users. On PinkAprons, foodies can order freshly made, lip-smacking home-cooked food, made by talented, FSSAI certified home chefs having expertise in diverse cuisines such as North Indian, Gujarati, Maharashtrian, Tamil, Andhra, Bengali, and more. 
</Text>
<Text   fontSize={['xl','2xl']}   fontFamily={'Poppins'}>
Home chefs can get on-boarded in 2 minutes, and start selling their food, with everything from delivery, order management, customer support, tech, and marketing handled by us. 
</Text>
<Text   fontSize={['xl','2xl']}   fontFamily={'Poppins'}>
Customers can place instant orders for freshly made home-cooked food, as well as schedule their orders. 
</Text>
<Text   fontSize={['xl','2xl']}   fontFamily={'Poppins'}>
Launched by Adetee Agarwaal in 2020, PinkAprons is a bootstrapped startup, with financial backing from friends, family, and working partners. We aim to empower 1 million home chefs and connect with 1 million home cooked food lovers in the next 3 years. 
</Text>
<Text   fontSize={['xl','2xl']}   fontFamily={'Poppins'}>
Come, join our home cooked food revolution!
</Text>
</VStack>
<Box w="full" p={[8,20]}>
<Image w="full" h={'auto'} rounded={'10%'} src='https://images.pexels.com/photos/5638330/pexels-photo-5638330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'  
/>
</Box>
</Box>
<RightImage
        title={'Feeding the community'}
        para={
'For every meal sold on PinkAprons in Toronto, we will be making a donation to The Stop. At PinkAprons, we recognize that members of our community are challenged by food insecurity, and we are making it our responsibility to also nourish those in need.'        }
        imageSrc={
          'https://www.zomato.com/blog/wp-content/uploads/2019/07/Screen-Shot-2019-07-08-at-10.55.32-am.png'
        }
        backgroundColor= {'white'}

      />
            <LeftImage
        title={'Feeding the community'}
        para={
'For every meal sold on PinkAprons in Toronto, we will be making a donation to The Stop. At PinkAprons, we recognize that members of our community are challenged by food insecurity, and we are making it our responsibility to also nourish those in need.'        }
        imageSrc={
          'https://www.zomato.com/blog/wp-content/uploads/2019/07/Screen-Shot-2019-07-08-at-10.55.32-am.png'
        }
        backgroundColor= {'white'}

      />
    <Footer />
  </VStack>
  )
}

export default OurStory
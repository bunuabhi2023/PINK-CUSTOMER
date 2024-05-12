import React from 'react'
import Footer from '../../Layout/Footer'
import JoinUS from '../Components/joinUs'
import LandingNav from '../Components/LandingNav'
import { Heading, VStack } from '@chakra-ui/react'
import HowItWorksForHomeChef from '../Components/HowItWorksforHomeChef'
import LeftImage from '../Components/LeftImage';
import RightImage from '../Components/RightImage'
import HomeChefCarousel from '../Components/HomeChefCarousel'
function BecomeAHomechef() {
  return (
    <VStack gap={[4,12]} w="full" overflowX={'hidden'}   pt={20}>
    <LandingNav />
    <JoinUS />
    <HowItWorksForHomeChef/>
    <Heading as="h1"  mb={6}   fontFamily={'Sansita Swashed'} w="full" textAlign={'center'} fontSize={['5xl','7xl']}>
        cooking isn’t always easy. But PinkApprons is
    </Heading>
    <LeftImage
        title={'Feeding the community'}
        para={
'For every meal sold on PinkAprons in Toronto, we will be making a donation to The Stop. At PinkAprons, we recognize that members of our community are challenged by food insecurity, and we are making it our responsibility to also nourish those in need.'        }
        imageSrc={
          'https://www.zomato.com/blog/wp-content/uploads/2019/07/Screen-Shot-2019-07-08-at-10.55.32-am.png'
        }
        backgroundColor= {'white'}

      />
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
            <HomeChefCarousel/>

    <Footer />
  </VStack>
  )
}

export default BecomeAHomechef
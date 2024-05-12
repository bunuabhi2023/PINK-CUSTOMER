import React, { useEffect } from 'react';
import FeaturesHome from './Components/featuresHome';
import ProductIntro from './Components/LocationHero';
import { useDispatch, useSelector } from 'react-redux';
import { setUserloaction } from '../../App/Actions/UserAction';
import Slider from './Components/Slider';
import { Box, VStack } from '@chakra-ui/react';
import ProductsTab from './Components/Tabs/Tabs';
import Footer from '../Layout/Footer';
import SpinWeel from './Components/SpinWeel';
import SearchCompo from './Components/Search';
import RegionalCusines, { LandingPageCousines } from './Components/RegionalCusines';
import Categories from './Components/Category';
// import HeroSection from './Components/HeroSection';
import JoinUS from './Components/joinUs';
import Navbar from '../Layout/NavBar';
import logoImg from '../../Assets/logoWithWhite.jpg';
import HowItWorks from './Components/HowItWorks';
import LandingNav from './Components/LandingNav';
import ScrollText from './Components/ScrollText';
import LeftImage from './Components/LeftImage';
import RightImage from './Components/RightImage';
const items = ['Free Delivery', '10% off', '20% off', '50% off'];

const Home = () => {
  const { userLocation, isAuthenticated } = useSelector(state => state.user);

  const handleSelectItem = selectedItem => {
    console.log('Selected Item:', selectedItem);
  };

  return !userLocation ? (
    <VStack gap={[4,12]} w="full" overflowX={'hidden'} >
<Box background={'#F5F5F5'} w="full">
<LandingNav />
      <ProductIntro />
</Box>
      <HowItWorks />
      <LeftImage
        title={'Hassle-Free Tiffin Subscriptions'}
        para={
          'We understand the pain of IT employees, senior citizens, and working couples, who need home-cooked food but are forever stuck with mediocre chefs, and unpredictable delivery. With PinkAprons, you can subscribe to tiffins and meals, seamlessly! Choose from 1000+ homeChefs specializing in multiple cuisines, schedule orders on a daily, weekly, or monthly basis, and get them delivered at your convenience, at a nominal delivery charge. The best part? Pay only for meals you order, and not a fixed monthly/weekly charge!'
                }
        imageSrc={
          'https://3.imimg.com/data3/HB/OP/MY-11059051/lunch-boxtiffin-service-500x500.jpg'
        }
      />
<VStack w="full">
<ScrollText
        text={
          "North Indian South Indian Bengali Punjabi Rajasthani Gujarati Maharashtrian Kashmiri Hyderabadi Mughlai Awadhi Kerala Tamil Andhra Odia"        }
      />
      <ScrollText
        text={
          "Bengali Punjabi Rajasthani Gujarati Maharashtrian Kashmiri Hyderabadi Mughlai Awadhi Kerala Tamil Andhra Odia North Indian South Indian"        }
      />
</VStack>
      <FeaturesHome />
      <RightImage
        title={'Download PinkAprons App and get your first meal for free! '}
        subTitle={'FSSAI Certified Home Chefs | Multiple Cuisines | Freshly Made Home Cooked Food'}
        para={
         ' Come, join our family at PinkAprons and be part of a home-cooked food revolution! Avail special discounts, offers and tons of love from our 1000+ home chefs across Pune & Mumbai.'
                  }
        colorTheme='dark'
        appLinks={true}
        imageAlt={'chef'}
        imageSrc={
          'https://as2.ftcdn.net/v2/jpg/02/88/27/39/1000_F_288273971_lyVD3ZuFSWJyFkHeD3JEbdvxTcVJL2Wx.jpg'
        }
      />
      <LandingPageCousines />
      <LeftImage
        title={'Celebrate & Rejoice With Bulk Orders & Party Bookings!'}
        para={
'Organizing an office or home party & concerned about food? Need not worry, because we at PinkAprons are market leaders in Bulk and Party Orders.. With us, you can order from multiple home chefs, multiple cuisines and sit back & relax! We will take care of everything else. With PinkAprons, ensure a memorable culinary experience for your guests…'
   }
        imageSrc={
          'https://images.pexels.com/photos/8919725/pexels-photo-8919725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
      />
      {/* <JoinUS /> */}
      <Footer />
    </VStack>
  ) : (
    <VStack gap={[6, 10]} pt={'14'} w={'full'}>
      {/* {isAuthenticated && (
        <SpinWeel items={items} onSelectItem={handleSelectItem} />
      )} */}
      <Navbar />

      <SearchCompo />
      <Categories />
      <RegionalCusines />
      <ProductsTab />
    
            <Footer />

    </VStack>
  );
};

export default Home;

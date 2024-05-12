import { Box, Flex, Spacer, Button, HamburgerIcon, MenuIcon, Icon, Image, HStack, Text, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import logoImg from '../../../Assets/Logo.png';
import { Link } from "react-router-dom";
import ScrollToTop from "../../../ScrollTOp";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        padding="1"
        maxW={'container.lg'}
        px={[2,12]}
        mx={'auto'}
      >
                <ScrollToTop/>
        <Box display={['none', 'block']}>
          <Flex align="center" gap={4}>
            <Link to="/become-a-home-chef">
            <Button variant="link" transition={"all"} transitionDelay={'300ms'} color={"black"} fontFamily={'Montserrat'} >
            Become a HomeChef
            </Button>
            </Link>
<Link to={'/our-story'}>
            <Button variant="link" transition={"all"} transitionDelay={'300ms'} color={"black"} fontFamily={'Montserrat'}>
              Our Story
            </Button>
            </Link>

          </Flex>
        </Box>

        <Spacer  display={['none', 'block']} />
       <Link to={'/'}>
        <Image src={logoImg}  w="60px" h={"auto"}/>
        </Link>

        <Spacer />

        <Box >
        <Flex align="center" gap={4}  display={['none','block']} opacity={'0'}>
            <Button variant="link" color={"black"} fontFamily={'Montserrat'} >
              Cook With Us
            </Button>
            <Button variant="link" color={"black"} fontFamily={'Montserrat'}>
              Our Story
            </Button>
          </Flex>

          <Button
          display={['block','none']}
          color={"black"} fontFamily={'Montserrat'}
          variant="link"
          onClick={handleToggle}
          >
           <HStack>
 <BiMenu />
            <Text>Menu</Text>
            </HStack>
          </Button>


              <Drawer isOpen={isOpen} placement="right" onClose={handleToggle}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Flex direction="column" gap={2}>
                <Link to="/">
                  <Button variant="link" color="black" fontFamily="Montserrat">
                    Home
                    </Button>
                </Link>
                <Link to="/cook-with-us">
                  <Button variant="link" color="black" fontFamily="Montserrat">
                    Cook With Us
                  </Button>
                </Link>
                <Link to="/our-story">
                  <Button variant="link" color="black" fontFamily="Montserrat">
                    Our Story
                  </Button>
                </Link>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

 
        </Box>
      </Flex>
    </header>
  );
};



 function LandingNav() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
      function handleScroll() {
        const scrollPosition = window.scrollY;
  
        if (scrollPosition > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <Box
        as="nav"
        id="navbar"
        position="fixed"
        top="0"
        left="0"
        zIndex={1000}
        transition="background-color 0.3s ease-in-out"
        backgroundColor={['white', isScrolled ? 'white' : 'transparent']}
        color={'white'}
        w="100%"
      >
        <Nav />
      </Box>
    );
  }
  
   export default LandingNav;
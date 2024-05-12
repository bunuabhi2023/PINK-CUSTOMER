









import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";


const HeroSection = () => (
  <Box bgColor="white"  fontFamily="ggSans"  w ="full"  >

    {/* Hero Section */}
    <Box bg="pink.sideNav" mt={-1} pos="relative" w="full" overflowX="hidden">
      <img
        src="./images/Image0.svg"
        className="hidden xl:block absolute z-10 bottom-0 top-auto scale-x-125"
        alt=""
      />
      <img src="./images/Image1.svg" className="hidden xl:block absolute z-10 bottom-0 -right-[5%]" alt="" />
      <img src="./images/Image2.svg" className="hidden xl:block absolute z-10 bottom-0 -left-[5%]" alt="" />
      <Box
        color="#fff"
        maxW="1200px"
        mx="auto"
        px={[7, 0]}
        maxH={[null, null, "555px"]}
        display="flex"
        flexDir="column"
        alignItems="center"
        gap={5}
        pt={[50, 120]}
      >
        <Text
          fontWeight={800}
          textAlign={["left", "center"]}
          fontSize={["34px", "56px"]}
          fontFamily="GintoNord"
          zIndex={20}
        >
          IMAGINE A PLACE...
        </Text>
        <Text
          fontWeight={400}
          textAlign={["left", "center"]}
          fontSize={["16px", "20px"]}
          lineHeight={["26px", "32.5px"]}
          fontFamily="gg sans"
          w={["90%", "70%", "90%"]}
          zIndex={20}
          alignSelf={["auto", "center"]}
        >
          ...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a
          handful of friends can spend time together. A place that makes it easy to talk every day and hang out more
          often.
        </Text>
        <Flex display={{ xl: "flex" }} flexDir="row" alignItems="center" justifyContent="center" gap={10} zIndex={20}>
          <Link href="#" bg="white" color="black" p={3} px={7} borderRadius="full" _hover={{ color: "pink.sideNav" }}>
            <Text>
              <i className="fa-solid fa-download mr-2"></i>
              Download for Windows
            </Text>
          </Link>
          <Link href="#" bg="#23272a" color="white" p={3} px={7} borderRadius="full">
            Open Discord in your browser
          </Link>
        </Flex>
        {/* Mobile/Tablet Mode Start */}
        <Flex display={["flex", "none"]} flexDir="column" alignItems="center" mt={4} zIndex={20}>
          <Link href="#" bg="white" color="black" p={3} px={7} borderRadius="full" _hover={{ color: "pink.sideNav" }}>
            <Text>
              <i className="fa-solid fa-download mr-2"></i>
              Download from Google Play
            </Text>
          </Link>
        </Flex>
        <img src="./images/Image2.svg" className="block md:hidden ml-[-80px]" alt="" />
        <Box display={["none", "flex"]} mr={[-150, -16]} mt={[-16, "unset"]} justifyContent="flex-end">
          <img src="./images/Image1.svg" className="w-[70%]" alt="" />
        </Box>
        {/* Mobile/Tablet Mode End */}
      </Box>
    </Box>

    {/* Section 1 */}
    <Flex
      maxW="1200px"
      mx="auto"
      alignItems="center"
      py={[14, 36]}
      flexDir={["column", "row"]}
      px={[7, 0]}
    >
      {/* Left section */}
      <Box w={["100%", "50%"]}>
        <img src="./images/section1Image.svg" alt="" />
      </Box>
      {/* Right section */}
      <Box w={["100%", "50%"]}>
        <Box w={["95%", "60%"]} mx="auto">
          <Text
            fontWeight={700}
            fontSize={["20px", "28px", "48px"]}
            fontFamily="ggSans"
            lineHeight={["24px", "57.6px"]}
            mt={[5, 0]}
          >
            Create an invite-only place where you belong
          </Text>
          <Text
            fontFamily="ggSans"
            fontSize={["16px", "20px"]}
            fontWeight={400}
            mt={[24, "24px"]}
          >
            Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about
            your day without clogging up a group chat.
          </Text>
        </Box>
      </Box>
    </Flex>

    {/* Section 2 */}
    <Box bg="#f6f6f6">
      <Flex
        maxW="1200px"
        mx="auto"
        alignItems="center"
        py={[14, 36]}
        flexDir={["column", "row"]}
        px={[7, 0]}
      >
        <Box display={["block", "none"]} w={["100%", "50%"]}>
          <img src="./images/section2Image.svg" alt="" />
        </Box>
        <Box w={["100%", "50%"]}>
          <Box w={["95%", "60%"]} mx="auto">
            <Text
              fontWeight={700}
              fontSize={["20px", "28px", "48px"]}
              fontFamily="ggSans"
              lineHeight={["24px", "57.6px"]}
              mt={[5, 0]}
            >
              Where hanging out is easy
            </Text>
            <Text
              fontFamily="ggSans"
              fontSize={["16px", "20px"]}
              fontWeight={400}
              mt={[24, "24px"]}
            >
              Grab a seat in a voice channel when you're free. Friends in your server can see you're around and instantly
              pop in to talk without having to call.
            </Text>
          </Box>
        </Box>
        <Box display={["none", "block"]} w={["100%", "50%"]}>
          <img src="./images/section2Image.svg" alt="" />
        </Box>
      </Flex>
    </Box>

    {/* Section 3 */}
    <Flex
      maxW="1200px"
      mx="auto"
      alignItems="center"
      py={[14, 36]}
      flexDir={["column", "row"]}
      px={[7, 0]}
    >
      <Box w={["100%", "50%"]}>
        <img src="./images/section3Image.svg" alt="" />
      </Box>
      <Box w={["100%", "50%"]}>
        <Box w={["95%", "60%"]} mx="auto">
          <Text
            fontWeight={700}
            fontSize={["20px", "28px", "48px"]}
            fontFamily="ggSans"
            lineHeight={["24px", "57.6px"]}
            mt={[5, 0]}
          >
            From few to a fandom
          </Text>
          <Text
            fontFamily="ggSans"
            fontSize={["16px", "20px"]}
            fontWeight={400}
            mt={[24, "24px"]}
          >
            Get any community running with moderation tools and custom member access. Give members special powers, set up
            private channels, and more.
          </Text>
        </Box>
      </Box>
    </Flex>

    {/* Section 4 */}
    <Box bg="#f6f6f6">
      <Flex
        maxW="1200px"
        mx="auto"
        alignItems="center"
        py={[14, 32]}
        flexDir="column"
        px={5}
      >
        <Text
          fontWeight={800}
          fontFamily="GintoNord"
          fontSize={["20px", "40px"]}
          lineHeight={["19px", "32px"]}
          textAlign={["left", "center"]}
          mt="auto"
        >
          RELIABLE TECH FOR STAYING CLOSE
        </Text>
        <Text
          fontFamily="ggSans"
          fontSize={["16px", "20px"]}
          lineHeight={["26px", "32.5px"]}
          mt={[24, "24px"]}
          textAlign={["left", "center"]}
          w={["100%", null, "83%"]}
        >
          Low-latency voice and video feels like you're in the same room. Wave hello over video, watch friends stream
          their games, or gather up and have a drawing session with screen share.
        </Text>
        <img src="./images/section4Image.svg" alt="" className="w-[100%]" />
        <Flex flexDir="column" alignItems="center" gap={40} mt="auto" zIndex={1} pos="relative">
          <img src="./images/section5Image.svg" className="md:block hidden absolute top-0" alt="" />
          <Text fontSize="32px" fontFamily="ggSans" fontWeight={700} pt={30} lineHeight="38px">
            Ready to start your journey?
          </Text>
          <Link
            href="#"
            bg="pink.sideNav"
            color="white"
            p={[16, 32]}
            roundedFull
            fontSize="20px"
            fontWeight={500}
            pos="relative"
            zIndex={1}
            _hover={{ bg: "#5865f2" }}
          >
            <i className="fa-solid fa-download mr-2"></i>
            Download for Windows
          </Link>
        </Flex>
        <Box
          bg="pink.sideNav"
          display={["flex", null, "none"]}
          justifyContent="center"
          alignItems="center"
          mt={4}
          color="white"
          fontSize="20px"
          fontWeight={500}
          fontFamily="ggSans"
          p={[16, 32]}
          rounded="10%"
          _hover={{ bg: "#5865f2" }}
        >
          <i className="fa-solid fa-download mr-2"></i>
          <Text>Download from Google Play</Text>
        </Box>
      </Flex>
    </Box>

  </Box>
);

export default HeroSection;


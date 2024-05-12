import { Box, SimpleGrid, Icon, Text, Stack, Flex, Heading, VStack } from '@chakra-ui/react';
import { FcDonate, FcInTransit } from 'react-icons/fc';
import { AiFillEdit,AiFillSchedule,BiDish, HiOutlineUserAdd} from 'react-icons/all';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack color={'black'} placeItems={'center'} textAlign={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'pink.sideNav'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text >{text}</Text>
    </Stack>
  );
};



export default function FeaturesHome () {
  return (
    <VStack gap={10} p={4} w={"full"} backgroundColor={'white'} py={'10'}>
      <Heading color='pink.sideNav'>Why PinkAprons?</Heading>
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10} maxW={'container.xl'} mx={'auto'}>
        <Feature
          icon={<Icon as={BiDish} w={10} h={10} />}
          title={'Authentic Regional Cuisines'}
          text={
'Get authentic regional cuisines: South Indian, North Indians, Marathi, Bengali, Gujarati, Andhra, Tamil, & More'          }

        />
        <Feature
          icon={<Icon as={AiFillEdit} w={10} h={10} />}
          title={'Fully Customized Orders'}
          text={
'Customize your every order, as per your specific taste and mood. Our home chefs will not just deliver food, but an experience: Be it a single meal or party/corporate orders '          }
        />
        <Feature
          icon={<Icon as={AiFillSchedule} w={10} h={10} />}
          title={'Schedule Your Orders'}
          text={
'Schedule your orders as per your need and requirements: We will deliver them at the time and date specified by you'          }
        />
        <Feature
          icon={<Icon as={HiOutlineUserAdd} w={10} h={10} />}
          title={'Join A Movement'}
          text={
'Join the revolution of home cooked food which we have triggered, and support women home chefs to become financially independent '          }
        />
      </SimpleGrid>
    </VStack>
  );
}
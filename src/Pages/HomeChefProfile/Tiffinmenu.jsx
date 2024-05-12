import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from 'react-router-dom';

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
  AlertDialogHeader,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Tag,
  TagLabel,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MobileNav, NavItem } from "./ProductData";
import axios from "axios";
import { server } from "../../App/store";




export const SidebarContent = ({
  categorizedProducts,
  setCategoryButton,
  categoryButton,
}) => {
  return (
    <Box h="full">
      {Object.keys(categorizedProducts).map(category => (
        <NavItem
          categoryButton={categoryButton}
          count={categorizedProducts[category].length}
          key={category}
          onClick={() => setCategoryButton(category)}
        >
          {category}
        </NavItem>
      ))}
    </Box>
  );
};




export default function TiffinMenu({tiffins}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

console.log({tiffins});
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [categoryButton, setCategoryButton] = useState();
  

  useEffect(() => {
    const categorizedProducts = {};

    tiffins.forEach(product => {

      if (product.data.thali_type) {
        if (!categorizedProducts[product.data.thali_type]) {
          categorizedProducts[product.data.thali_type] = [];
        }
        categorizedProducts[product.data.thali_type].push(product);
      }
    });
    setCategorizedProducts(categorizedProducts);
    const data = Object.keys(categorizedProducts);
    if (data[0]) {
      setCategoryButton(data[0]);
    }
  }, [tiffins]);

  return (
    <Grid
      templateColumns={{ base: 'repeat(12, 1fr)', lg: 'repeat(12, 1fr)' }}
      minH="80vh"
    >
      <GridItem
        colSpan={2}
        display={{ base: 'none', lg: 'grid' }}
        h="full"
        overflowY={'auto'}
        backgroundColor={'white'}
      >
        <SidebarContent
          categoryButton={categoryButton}
          setCategoryButton={setCategoryButton}
          categorizedProducts={categorizedProducts}
          onClose={() => onClose}
          display={{ base: 'none', lg: 'block' }}
        />
      </GridItem>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="md"
      >
        <DrawerContent>
          <DrawerCloseButton />
          <SidebarContent
            categoryButton={categoryButton}
            setCategoryButton={setCategoryButton}
            categorizedProducts={categorizedProducts}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}

      <GridItem colSpan={{ base: 12, md: 10 }} p={0}>
        <MobileNav display={{ base: 'flex', lg: 'none' }} onOpen={onOpen} />
        <Box w={'full'}>
          <VStack w={'full'} gap={[4, 12]} p={[0, 4]}>
            {categorizedProducts &&
              categoryButton &&
              categorizedProducts[categoryButton] &&
              categorizedProducts[categoryButton].map(product => (
                <TiffinCard {...product.data} price = {product.price}
                promoPrice =  {product.promoPrice}
                />
              ))}
          </VStack>
        </Box>
      </GridItem>
    </Grid>
  );
}




const TiffinCard = ( tiffin) => {
  console.log({tiffin})
  return (
    <HStack
      w={'full'}
      borderColor={'gray.400'}
      borderWidth={'1px'}
      borderRadius={'lg'}
      p={[0, 1]}
    >

      <HStack w={'full'} p={[0, 4]} justifyContent={'space-evenly'}>
        <Image
          w={['70px', '95px']}
          h={['70px', '95px']}
          src={tiffin&& tiffin.file}
          fallbackSrc="https://webient.in/upload/images/pinkaprons-16805330700.jpg"
        />
        <VStack w="full" maxW={'70%'} alignItems={'start'} p={2}>
            <Heading textTransform={'capitalize'} size={'sm'}>{tiffin.thali_type} thali for 28 days</Heading>
<HStack>

<Heading size={'sm'} color={'pink.500'} >
₹ {tiffin.per_day_price_for_veg * ((28/7) * 5)}
            </Heading>
</HStack>
<Tag size={'md'}    colorScheme= {tiffin.type === 'lunch' ? 'blue' : 'teal'}
>
  <TagLabel>
    {tiffin.type}
  </TagLabel>
</Tag>
        </VStack>
        <VStack justifyContent={'center'} alignItems={'center'}>
 {
            <RouterLink to={`/tiffin-page?thali_type=${tiffin.thali_type}&type=${tiffin.type}&id=${tiffin.home_chef_id}`}>
              <Button
                fontSize={'sm'}
                rounded={'full'}
                colorScheme="pink"
                backgroundColor={'rgba(228, 13, 134, 1)'}
                boxShadow="0px 4px 24px 0px rgba(228, 13, 134, 0.56)"
              >
                view
              </Button>
             </RouterLink>
          }
        </VStack>
      </HStack>
    </HStack>
  );
};
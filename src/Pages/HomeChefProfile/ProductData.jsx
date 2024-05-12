import React, { ReactNode, useEffect, useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  GridItem,
  Grid,
  DrawerCloseButton,
  VStack,
  HStack,
  Circle,
  Image,
  Heading,
  Button,
  Modal,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogContent,
  ButtonGroup,
  Stack,
  ModalFooter,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  NumberInputField,
  NumberInput,
  FormLabel,
  FormControl,
  Select,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Radio,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { BsCircleFill } from 'react-icons/bs';
import ReactEllipsisText from 'react-ellipsis-text';
import { useDispatch, useSelector } from 'react-redux';
// import { IconType } from 'react-icons';
// import { ReactText } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { addToCart, loadCart, removeToCart } from '../../App/Actions/cartAction';
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import { server } from '../../App/store';

const LinkItems = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

export default function ProductData({ products, homeChefId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: productModalisOpen,
    onOpen: productModalOnOpen,
    onClose: productModalOnClose,
  } = useDisclosure();
  const [modalProduct, setModalProduct] = useState(null);
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const handleModalAdd = id => {
    setModalProduct(id);
    productModalOnOpen();
  };
  const toast = useToast();

  const dispatch = useDispatch();
  const handleAddToCart =async () => {
    await dispatch(
      addToCart({
        home_chef_id: homeChefId,
        cart_details: [
          {
            product_id: modalProduct.id,
            quantity: 1,
            quantity_id: modalProduct.prices[0].quantity_id,
          },
        ],
      } ,  toast  ,closeModal )
    );
    dispatch(loadCart());

  };

  const closeModal = ()=>{
    
    setModalProduct(null);
    productModalOnClose();
  }
  const handleRemoveModal = () => {
    setModalProduct(null);
    productModalOnClose();
  };

  const [categories, setCategories] = useState([]);
  const [categoryButton, setCategoryButton] = useState('All');
  useEffect(() => {
    const categorizedProducts = {
      All: [], // Initialize an 'All' category
    };
  
    products.forEach(product => {
      const { category } = product; // Assuming category is an array of category objects
  
      if (category && Array.isArray(category)) {
        category.forEach(cat => {
          // Extract the name from the category object
          const categoryName = cat.name;
  
          // Create a category if it doesn't exist in categorizedProducts
          if (!categorizedProducts[categoryName]) {
            categorizedProducts[categoryName] = [];
          }
  
          // Push the product into the corresponding category
          categorizedProducts[categoryName].push(product);
        });
      }
  
      // Always add products to the 'All' category
      categorizedProducts['All'].push(product);
    });
  
    // Update the categorized products state
    setCategorizedProducts(categorizedProducts);
  }, [products]);
console.log({categorizedProducts})
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
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={handleRemoveModal}
        isOpen={productModalisOpen}
      >
        <AlertDialogContent bottom={0}>
          <AlertDialogHeader>Reset previous Cart ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Items already in cart. To enjoy our homemade delicacies, would you
            like to reset your cart and add items from our kitchen?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleRemoveModal}>No</Button>
            <Button colorScheme="pink" ml={3} onClick={handleAddToCart}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <GridItem colSpan={{ base: 12, md: 10 }} p={0}>
        <MobileNav display={{ base: 'flex', lg: 'none' }} onOpen={onOpen} />
        <Box w={'full'}>
          <VStack w={'full'} gap={[4, 12]} p={[0, 4]}>
            {categorizedProducts &&
              categoryButton &&
              categorizedProducts[categoryButton] &&
              categorizedProducts[categoryButton].map(product => (
                <ProductCard
                  homeChefId={homeChefId}
                  product={product}
                  handleModalAdd={handleModalAdd}
                />
              ))}
          </VStack>
        </Box>
      </GridItem>
    </Grid>
  );
}

export const SidebarContent = ({
  categorizedProducts,
  setCategoryButton,
  categoryButton,
}) => {


  const [categoriesInHomechef, setCategoriesInHomechefs] = useState([]);
  const dispatch = useDispatch();
  const { nameandid } = useParams();
  const id = nameandid.split('-');

  useEffect(() => {
    var newId = id[id?.length - 1];
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${server}/get-category-by-homechefId/${newId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategoriesInHomechefs(res?.data?.categories || []);
      })
      .catch((e) => {
        console.log({ e });
      });
  }, []);

  const arr = ['All', ...categoriesInHomechef?.filter((item) => categorizedProducts[item?.category_name])?.map((el) => el.category_name)];

  return (
    <Box h="full">
      {arr?.map(category => (
        <NavItem
          categoryButton={categoryButton}
          count={categorizedProducts[category]?.length || 0}
          key={category}
          onClick={() => setCategoryButton(category)}
        >
          {category}
        </NavItem>
      ))}
    </Box>
  );
};

export const NavItem = ({ children, categoryButton, count, ...rest }) => {
  const encodedString = encodeURIComponent(children);

  // Replace special characters with underscores

  return (
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontSize={['sm', 'md']}
        fontWeight={500}
        textTransform={'capitalize'}
        color={categoryButton === children ? 'pink.sideNav' : 'black'}
        _hover={{
          backgroundColor: 'pink.50',
        }}
        {...rest}
      >
        {children}
        {`(${count})`}
      </Flex>
    </Link>
  );
};

export const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      px={{ base: 4, lg: 24 }}
      height="12"
      alignItems="center"
      w={'full'}
      borderBottomWidth="1px"
      justifyContent="flex-start"
      textTransform={'capitalize'}
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};

const ProductCard = ({ product, homeChefId, handleModalAdd }) => {
  const { isAuthenticated } = useSelector(state => state.user);
  const { cart } = useSelector(state => state.cart);
  let cartProduct = null;
  if (cart && cart.home_chef_id == homeChefId) {
    cartProduct = cart.cart_details.find(
      item => item.product_id === product.id
    );
  }
  const toast = useToast();

  const addToCartAndCloseModal = (e) => {
    e.preventDefault();
    if (selectedPrice) {
      dispatch(
        addToCart({
          home_chef_id: homeChefId,
          cart_details: [
            {
              product_id: product.id,
              quantity: selectedQuantity,
              quantity_id: selectedPrice.quantity_id,
            },
          ],
        }, toast)
      );
      closeModal();
    }
    else {
      toast({
        title: "Error",
        description: "Please select a Product",
        status: "error",
        duration: 3000, // Optional: How long the toast should be visible
        isClosable: true, // Optional: Whether the toast can be closed by the user
      });
    }
  };

  const dispatch = useDispatch();
  const hanleAddProduct = () => {

    debugger;
    console.log((cart.home_chef_id != null && parseInt(cart.home_chef_id) !== parseInt(homeChefId)));

    if (
      (cart.home_chef_id != null && parseInt(cart.home_chef_id) !== parseInt(homeChefId)) &&
      cart.cart_count !== 0
    ) {
      handleModalAdd(product);
    } else {
      if (product.prices.length === 1) {
        dispatch(
          addToCart({
            home_chef_id: homeChefId,
            cart_details: [
              {
                product_id: product.id,
                quantity: 1,
                quantity_id: product.prices[0].quantity_id,
              },

            ],
          }, toast)
        );
      } else if (product?.prices?.length) {
        openModal();
      }
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const closeModal = () => {
    setSelectedPrice(null);
    setSelectedQuantity(1);
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const hanleRemoveProduct = () => {
    dispatch(
      removeToCart({
        home_chef_id: homeChefId, product_id: product.id,
        quantity_id: product.prices[0].quantity_id,
      })
    );
  };
  const color =
    product.tag === 'veg'
      ? 'rgba(58, 183, 87, 1)'
      : product.tag === 'egg'
        ? 'rgba(250, 136, 60, 1)'
        : product.tag === 'non-veg'
          ? 'rgba(255, 99, 71,1)'
          : 'white';
  return (
    <HStack
      w={'full'}
      borderColor={'gray.400'}
      borderWidth={'1px'}
      borderRadius={'lg'}
      p={[0, 1]}
    >
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalOverlay />
          <form onSubmit={addToCartAndCloseModal}>
            <ModalContent>
              <ModalHeader>Select Price and Quantity</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={4}>
                  <FormControl isRequired={true}>
                    <FormLabel>Select Price:</FormLabel>
                    <VStack spacing={2}>
                      {product.prices.map(price => (
                        <Radio
                          key={price.quantity_id}
                          value={price.quantity_id}
                          isRequired={true}
                          isChecked={selectedPrice === price}
                          onChange={() => setSelectedPrice(price)}
                        >
                          {`${price.size} - ${price.serve.replace('serve', '')} serve - ₹${price.price}`}
                        </Radio>
                      ))}
                    </VStack>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Select Quantity:</FormLabel>
                    <NumberInput
                      value={selectedQuantity}
                      min={1}
                      onChange={value => setSelectedQuantity(value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="pink" type='submit' >
                  Add to Cart
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>

        </Modal>
      )}

      <Flex
        alignSelf={'start'}
        justifyContent={'center'}
        borderRadius={'sm'}
        aliygnItems="center"
        w={'13px'}
        border={`1px solid ${color}`}
        color={color}
        fontSize={'xx-small'}
        h={'13px'}
      >
        <BsCircleFill />
      </Flex>

      <HStack w={'full'} p={[0, 4]} justifyContent={'space-evenly'}>
        <Image
          w={['70px', '95px']}
          h={['70px', '95px']}
          src={product.media && product.media[0] && product.media[0].file}
          fallbackSrc="https://webient.in/upload/images/pinkaprons-16805330700.jpg"
        />
        <VStack w="full" maxW={'70%'} alignItems={'start'} p={2}>
          <Stack
            direction={['column', 'column', 'row']}
            alignItems={'start'}
            pr={4}
            justifyContent={'space'}
            w={'full'}
          >
            <Box w={['full', '70%']}>
              <Heading size={'sm'}>{product.name}</Heading>
              <Text
                noOfLines={2}
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></Text>
            </Box>
            <VStack ml={'auto'}>
              {product.prices.map(price => (
                <Text size={'md'} fontWeight="semibold" color={'black'}>
                  {`${price.size} ${ price?.serve ? `- ${price?.serve?.replace(
                    'serve',
                    ''
                  )?.replace('Serve', '')} Serve` : ''} - ₹${price.price}`}
                </Text>
              ))}
            </VStack>
          </Stack>
        </VStack>
        <VStack justifyContent={'center'} alignItems={'center'}>
          {isAuthenticated && cartProduct && product.prices.length === 1 ? (
            <HStack borderColor={'pink.500'} borderWidth={'1px'}>
              <Button
                variant="solid"
                rounded={'none'}
                colorScheme="pink"
                size={'sm'}
                onClick={hanleRemoveProduct}
              >
                -
              </Button>
              <Text>{cartProduct.quantity}</Text>
              <Button
                variant="solid"
                rounded={'none'}
                colorScheme="pink"
                size={'sm'}
                onClick={hanleAddProduct}
              >
                +
              </Button>
            </HStack>
          ) : isAuthenticated ? (
            <Button
              fontSize={'sm'}
              rounded={'full'}
              colorScheme="pink"
              backgroundColor={'rgba(228, 13, 134, 1)'}
              boxShadow={'0px 4px 24px 0px rgba(228, 13, 134, 0.56)'}
              onClick={hanleAddProduct}
              isDisabled={product.available == 0 ?  true : false }
              >
{product.available == 0 ?  'Not Available' : 'Add' } 

            </Button>
          ) : (
product.available == 1 ?             <RouterLink to={'/login'}>
<Button
  fontSize={'sm'}
  rounded={'full'}
  colorScheme="pink"
  backgroundColor={'rgba(228, 13, 134, 1)'}
  boxShadow="0px 4px 24px 0px rgba(228, 13, 134, 0.56)"
  isDisabled={product.available == 0 ?  true : false }

>
{product.available == 0 ?  'Not Available' : 'Add' } 
</Button>
</RouterLink>
:
<Button
fontSize={'sm'}
rounded={'full'}
colorScheme="pink"
backgroundColor={'rgba(228, 13, 134, 1)'}
boxShadow="0px 4px 24px 0px rgba(228, 13, 134, 0.56)"
isDisabled={product.available == 0 ?  true : false }

>
{product.available == 0 ?  'Not Available' : 'Add' } 

</Button>

          )}
        </VStack>
      </HStack>
    </HStack>
  );
};

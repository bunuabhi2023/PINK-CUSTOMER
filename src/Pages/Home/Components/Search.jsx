import {
    Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Slider from './Slider';
import axios from 'axios';
import { server } from '../../../App/store';
import { Link, useNavigate } from 'react-router-dom';

function SearchCompo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [typingTimeout, setTypingTimeout] = useState(null); // New state for debounce timeout

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (searchQuery === '') {
      setSuggestions([]);
    } else {
      const newTypingTimeout = setTimeout(() => {
        axios.get(`${server}/search?query=${searchQuery}`)
          .then(response => {
            setSuggestions(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, 500); 

      setTypingTimeout(newTypingTimeout);
    }
  }, [searchQuery]);

const navigate= useNavigate();

  return (
    <Grid
      py={4}
      templateColumns={["repeat(1, 1fr) ","repeat(2, 1fr) "]}
      w={'full'}
      px={2}
      gap={6}
      minH={{ md: '450px' }}
      maxW={'container.xl'}
    >
      <GridItem w={'full'} h={'full'} pos={'relative'}>

        <VStack
          h={'full'}
          maxW={'100%'}
          justifyContent={'center'}
          alignItems={'start'}
          px={[2, 6, 8, 12]}
          pos={'relative'}
          
        >
                   <Box   pos={'absolute'} right={'-20%'} top={'5%'}                display={{base:"none", md:"block"}}
  width= {['350px']} height = '350px' backgroundImage={'radial-gradient(50% 50% at 50% 50%, rgba(228, 13, 134, 0.32) 0%, rgba(255, 255, 255, 0) 100%)'}>
            
        </Box>
          <Heading fontFamily={'Sansita Swashed'} size={['lg', 'xl', '2xl','3xl']} fontWeight={'normal'}>
            Fresh and yummy
          </Heading>
          <Heading
            fontFamily={'Montserrat'}
            color={'pink.500'}
            size={['md', 'lg', 'xl','2xl']}
                      >
            Homemade Food
          </Heading>
          <Heading fontFamily={'Montserrat'} size={['md', 'lg', 'xl','2xl']}>
            delivered with luv{' '}
          </Heading>
          <InputGroup   fontSize={{base:"sm" ,md:"md"} } pos={'relative'}>
          <Input
              type={'text'}
              onChange={(e)=>setSearchQuery(e.target.value)}
              value={searchQuery}
              fontSize={{base:"sm" ,md:"md"} }
              placeholder={"Search for Homechef or cuisine"}
              borderRadius={'full'}
              _focus={{
                outline: 'none',
              }}
              style={{
                '::placeholder': {
                  color: '#C5C5C5',
                },
              }}
              focusBorderColor="#C5C5C5"
              display={{base:"none", md:"block"}}
            />
                        <Input
              type={'text'}
              fontSize={{base:"sm" ,md:"md"} }
              placeholder={" Homechef or cuisine"}
              borderRadius={'full'}
              _focus={{
                outline: 'none',
              }}
              style={{
                '::placeholder': {
                  color: '#C5C5C5',
                },
              }}
              focusBorderColor="#C5C5C5"
              display={{base:"block", md:"none"}}
            />
            <InputRightElement w={'100px'} p={'1px'}>
              <Button
                h="full"
                colorScheme="pink"
                boxShadow="0px 4px 24px 0px rgba(228, 13, 134, 0.56)"
                rounded={'full'}
                fontSize={{base:"sm" ,md:"md"} }
              >
                <HStack>
                  <Text fontSize={{base:"sm" ,md:"md"} }>Search</Text> <BsSearch />
                </HStack>{' '}
              </Button>
            </InputRightElement>
            <List maxH={'250px'} p={[4,8]} w="full" bg={'white'} pos={'absolute'} top={12} overflow={'auto'} gap={4}> 
              {
                 suggestions && suggestions.cuisines && suggestions.cuisines.length > 0 && suggestions.cuisines.map((c)=><Link to={`/chef?category_id=${c.id}`}>
                 <ListItem>
                  <HStack gap={2} justifyContent={'start'} >
                    <Image w={'72px'} aspectRatio={1} src={c.image} rounded={'xl'}/>
                    <VStack align={'start'} p={4}>
                    <Heading size={'xs'}>{c.name}</Heading>
                    <Text size={'xs'}>{c.slug}</Text>
                    <Button colorScheme='red' size={'xs'}>Order..</Button>
                  
                    </VStack>
                  </HStack>
                 </ListItem> 
                 </Link>

                 )
              }
              {
                 suggestions && suggestions.home_chefs && suggestions.home_chefs.length > 0 && suggestions.home_chefs.map((c)=><ListItem         onClick={()=>navigate(`/home-chef/${(c.home_chef_name).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-')}-${c.id}`)} cursor={'pointer'}                 >
                  <HStack gap={2} justifyContent={'start'} >
                    <Image w={'72px'} aspectRatio={1} src={c.logo} rounded={'xl'}/>
                    <VStack align={'start'} p={4}>
                    <Heading size={'xs'}>{c.home_chef_name}</Heading>
                    <Button colorScheme='red' size={'xs'}>{'Outlet'}..</Button>
                  
                    </VStack>
                  </HStack>
                 </ListItem> )
              }
            </List>
          </InputGroup>
        </VStack>
      </GridItem>
      <GridItem h={'full'} w={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Slider/>
      </GridItem>
    </Grid>
  );
}

export default SearchCompo;

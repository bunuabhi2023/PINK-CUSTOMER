import { Tabs,Tab, TabList, TabPanel, TabPanels, Box, HStack, Heading, Flex, Center, useColorModeValue, Stack, Text, Image, Spinner } from '@chakra-ui/react'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadHomeChefs } from '../../../../App/Actions/screenDataReducerAction'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { server } from '../../../../App/store'
import axios from 'axios'
import { InfiniteScrollComponent } from '../../../../App'
import { StarIcon } from '@chakra-ui/icons'

function ProductsTab() {
        return (
          <InfiniteScrollComponent/>
        )
      }

export default ProductsTab;


  export  function Products({title,id,image,ratings =5}) {
    const navigate= useNavigate();
    return (
        <Stack 
        flexDir={['row','column']}
        onClick={()=>navigate(`/home-chef/${title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-')}-${id}`)} cursor={'pointer'}
          role={'group'}
          // p={[2,6]}
          gap={2}
          
          w={['full','250px']}
          pos={'relative'}

          zIndex={1}>

            <Image
              rounded={'lg'}
              h={['108px','146.312']}
              w={['88px','250px']}
              objectFit={'cover'}
              src={image}
              mx={'auto'}
              fallbackSrc={"https://img.freepik.com/free-photo/portrait-smiling-chef-uniform_329181-675.jpg?w=900&t=st=1688729740~exp=1688730340~hmac=a042e17b9387bd76ad42e0c8111790c0ab25ea2f16d3a05c65aeafb421c3c554" }
            />
          <Stack pt={[1,2]} align={'start'} rowGap={[2,1]}          w={['full','219.469px']} mx={'auto'}>
            <Heading fontSize={['md','xl']} fontFamily={'body'} fontWeight={500} noOfLines={1}>
{title}            </Heading>
        <HStack>
          <Flex bg={'green'} color={'white'} rounded={'full'} p={1} placeContent={'center'}>
          <StarIcon />
          </Flex>
 <Heading fontSize={['md','xl']} fontFamily={'body'} fontWeight={500}>
{ratings || 5}</Heading>
</HStack> 

          </Stack>
        </Stack>
    );
  }
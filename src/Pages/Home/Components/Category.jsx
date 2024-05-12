import { Box, Container, Flex, Heading, Image, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadCategory} from '../../../App/Actions/screenDataReducerAction';
import { createSearchParams, useNavigate } from 'react-router-dom';

function Categories() {
    const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    // let location = JSON.parse(localStorage.getItem('userLocation'));
    dispatch(loadCategory());
  }, [dispatch]);
  const {category} = useSelector(state=>state.screenData);

const navigatingToChef =(id)=>{
  navigate({
        pathname: '/chef',
        search: `?${createSearchParams({category_id: id})}`,
      });
}
  return (
    <Box w="full"  py={[4,8]} px={2}>
      <VStack
            w={'full'}
            maxW={'container.xl'}
            px={[2, 6, 8, 12]}
 gap={[2,4]}
 borderRadius= '8px'

 alignItems={'start'}
      >
      <Heading fontFamily={'Montserrat'}>Inspiration for your Order</Heading>
      <Box w="full" overflowX={'auto'} overflowY={'hidden'}       css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
  >

{category ?     <Flex w="max"  gap={[2,4]}       css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
>


   <>{category.map(c=>(
    <VStack backgroundColor={'white'} p={[2,4]}  borderRadius= '8px'  cursor={'pointer'}      _hover={{ boxShadow: "2xl" }} onClick={()=>navigatingToChef(c.id)}
    >
      <Image mx={'auto'} width = "230px" h = "200px" flexShrink={0}  borderRadius= '8px'
      fallbackSrc='https://images.unsplash.com/photo-1539136788836-5699e78bfc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhdGUlMjBvZiUyMGZvb2R8ZW58MHx8MHx8fDA%3D&w=1000&q=80'

 src ={c.image} alt={c.name}/>
 <Text size={'md'} fontFamily={'Montserrat'} fontWeight={'bold'}>{c.name}</Text>
    </VStack>
  ))}

   </>
   </Flex>
 :<VStack w="max" minW={'100%'} backgroundColor={'white'} p={[2,4]}  borderRadius= '8px'  cursor={'pointer'}      _hover={{ boxShadow: "2xl" }}

>
  <Flex alignItems={'center'}  justifyContent ="center" width = "100%" h = "200px">
    <Spinner/>
  </Flex>
  <Text size={'md'} fontFamily={'Montserrat'} opacity={'0'} fontWeight={'bold'}>{"fasdf"}</Text>

</VStack>
}
</Box>


      </VStack>
    </Box>
  )
}

export default Categories
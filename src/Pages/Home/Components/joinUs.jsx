import { useState } from 'react';
import axios from 'axios';
import { Box, Grid, FormControl, FormLabel, Input, Button, Table, Tbody, Tr, Td, Heading, VStack, } from "@chakra-ui/react";
import { server } from '../../../App/store';
import { Toaster, toast } from 'react-hot-toast';

const GridWithImageAndForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    zipCode: '',
    cuisine: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
        const { name, phoneNumber, email, zipCode, cuisine } = formData;
        const subject = 'PinkAprons HomeChef Request';
        const message = `Name: ${name}\nPhone: ${phoneNumber}\nEmail: ${email}\nZip Code: ${zipCode}\nCuisine: ${cuisine}`;
      
        axios
          .post(`${server}/send-email`, { message ,subject, email }, )
      
      .then((res) => {
        toast.success(res.data.message);
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          zipCode: '',
          cuisine: '',
        });
      })
      .catch((e) => {
        
          toast.failed('please resend the mail');
        
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }}   backgroundSize="cover"     rounded={'10%'} gap={0} backgroundImage={'https://img.freepik.com/free-photo/mature-experienced-baker-recording-culinary-recipe-tutorial-using-modern-camera-kitchen-wearing-bonete-apron-influencer-chef-using-internet-technology-communicating-social-media_482257-14428.jpg?w=1060&t=st=1689595634~exp=1689596234~hmac=a670a0b8ef99a2a8e163fdfa20a26216127bc861a9e069d8dd535db37f7facde'}>
     <Box></Box>
     <Toaster/>

      <Box  display="flex" justifyContent="center" alignItems="center" p={[0,8]}>
        <Box maxW="600px" p={[2,8]} bg={"white"} rounded={['unset','10%']}>
          <form onSubmit={handleSubmit}>
            <VStack  w="full" gap="2" textAlign="center" mb={8}>
              <Heading       fontFamily={'Sansita Swashed'}  size={'3xl'}>Are you a homechef?</Heading>
              <VStack  px={8}>
                <Heading px="4"  fontFamily={'Montserrat'}  size={'sm'}>Join Us To Trigger A Home Cooked Food Revolution! This can change everything</Heading>
              </VStack>
            </VStack>
            <Table >
  <Tbody>
    <Tr>
      <Td>
        <FormControl>
          <FormLabel>Name</FormLabel>
        </FormControl>
      </Td>
      <Td>
        <FormControl>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="your name"
          />
        </FormControl>
      </Td>
    </Tr>
    <Tr>
      <Td>
        <FormControl>
          <FormLabel>Number</FormLabel>
        </FormControl>
      </Td>
      <Td>
        <FormControl>
          <Input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Ex. 647 898 0000"
          />
        </FormControl>
      </Td>
    </Tr>
    <Tr>
      <Td>
        <FormControl>
          <FormLabel>E-mail</FormLabel>
        </FormControl>
      </Td>
      <Td>
        <FormControl>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your e-mail"
          />
        </FormControl>
      </Td>
    </Tr>
    <Tr>
      <Td>
        <FormControl>
          <FormLabel>PinCode</FormLabel>
        </FormControl>
      </Td>
      <Td>
        <FormControl>
          <Input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="your pinCode"
          />
        </FormControl>
      </Td>
    </Tr>
    <Tr>
      <Td>
        <FormControl>
          <FormLabel>Cuisine</FormLabel>
        </FormControl>
      </Td>
      <Td>
        <FormControl>
          <Input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="preferred cuisine"
          />
        </FormControl>
      </Td>
    </Tr>
    <Tr>
      <Td>
        <Button type='submit' colorScheme='pink'>submit</Button>
      </Td>

    </Tr>
  </Tbody>
</Table>

          </form>
        </Box>
      </Box>
    </Grid>
  );
};

export default GridWithImageAndForm;

import { Alert, AlertDescription, AlertIcon, Box, Button, CloseButton, FormControl, Heading, Image, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import backgroundLogin from '../../Assets/backgroundLogin.png'
import { Link } from 'react-router-dom'
import logo from '../../Assets/Logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../../App/Actions/UserAction'

function SignUp() {
  const dispatch = useDispatch();

  return (
    <Box w="100vw" h="100vh" bgImage={backgroundLogin} bgAttachment={'fixed'} display={'flex'} alignItems={'center'} justifyContent={'center'}  position={'relative'}>
        <Link to={'/'}>
        <Image src={logo} position={'absolute'} w="80px" h="80px" top="2" left="2" />
        </Link>
        <Box h={"400px"} w={"1024px"} bgColor={'rgba(0,0,0,0.7)'} display={'flex'}   alignItems={'center'} justifyContent={'space-around'}>
        <Box w={["100%" , "100%" , "100%" , "500px" , "500px"]} h={'595px'}  display={'flex'} alignItems={'center'} justifyContent={'center'} maxH = "90vh" bgColor={'white'} px={'5%'}> 
<RegisterForm/>
</Box>
            <VStack w="364px" h={'200px'} my={'auto'} display={{base:"none", md:"flex"} } alignItems={'start'}  justifyContent={'space-between'}>
            <Box>
                 <Heading  color='white'fontSize="40px"  fontFamily= "Montserrat" fontWeight={'normal'}>
                 Have an account?
                                 </Heading>
                <Text color =" #DCDCDC" fontSize= "md" fontFamily= "Montserrat" fontWeight={'normal'}>
                This will be a subtext a brief DescriptionThis will be a subtext a brief Description                </Text>
                </Box>
                <Link to="/login">
                <Button onClick={()=>dispatch({ type: "clearData" })} px={'12'} variant={'outline'} colorScheme='whiteAlpha' color={'white'} borderColor={'white'}>
                LOG IN
                </Button>
                </Link>
            </VStack>

        </Box>

    </Box>
    )
}

export default SignUp


export const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
  const [otpSending, setotpSending] = useState(false);

  const dispatch = useDispatch();
    const register = (e) => {
      e.preventDefault();
      setotpSending(true);
  dispatch(registerUser(email, phone,name));
  setotpSending(false);
  
    }
    const {aleartData,isOtpSent} = useSelector((state)=>state.user);

    const login = (e) => {
      console.log('Submitted data:', { email, phone, otp });
      dispatch(loginUser(phone, otp));
    };
  console.log(aleartData)
    return (
        <form onSubmit={register} width="100%">

      <VStack w={["100%" , "100%" , "100%" , "300px" , "300px"]}  mx="auto"alignItems={'start'} gap={2}>
        <Heading w="full" size={'lg'}> Get Started..</Heading>
            <FormControl id="name" isRequired w="full">
           <Input
        borderColor={'rgba(210, 210, 210, 1)'}
                color={'rgba(0, 0, 0, 1)'}
                backgroundColor={'rgba(246, 246, 246, 1)'}
              w="full"
                type="text"
                placeholder="Enter your Full Name "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired w="full">
              {/* <FormLabel>Email:</FormLabel> */}
           <Input
        borderColor={'rgba(210, 210, 210, 1)'}
                color={'rgba(0, 0, 0, 1)'}
                backgroundColor={'rgba(246, 246, 246, 1)'}
              w="full"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
  
            <FormControl w="full" id="phone" isRequired>
              {/* <FormLabel>Phone:</FormLabel> */}
           <Input
        borderColor={'rgba(210, 210, 210, 1)'}
                color={'rgba(0, 0, 0, 1)'}
                backgroundColor={'rgba(246, 246, 246, 1)'}
              w="full"
                type="tel"
                minLength={10}
                placeholder="Enter your phone number"
                value={phone}
        
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
            {aleartData && (
          <Alert status={aleartData.status }>
            <AlertIcon />
            <AlertDescription>          {aleartData.message}
  </AlertDescription>
            <CloseButton onClick={ ()=>dispatch({ type: 'clearData'})}/>
          </Alert>
        )}
            {isOtpSent ? (
              <>
              <FormControl id="otp" isRequired>
                {/* <FormLabel>OTP:</FormLabel> */}
             <Input
        borderColor={'rgba(210, 210, 210, 1)'}
                color={'rgba(0, 0, 0, 1)'}
                backgroundColor={'rgba(246, 246, 246, 1)'}
                  type="text"
                  placeholder="Enter the OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </FormControl>
                        <Button type="button" colorScheme='blackAlpha' backgroundColor={'black'} color="white" w="full" onClick={login}>
                        Verify Number
                      </Button>
                      </>
  
            ) : (
              <Button colorScheme="blackAlpha" w="full"  type="submit" isLoading={otpSending}>
                Send OTP
              </Button>
            )}
  
  
          {/* </VStack> */}
      </VStack>
      </form>

    );
  };
  
import { Alert, AlertDescription, AlertIcon, Box, Button, CloseButton, FormControl, Heading, Image, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import backgroundLogin from '../../Assets/backgroundLogin.png'
import { Link, Navigate } from 'react-router-dom'
import logo from '../../Assets/Logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, sendOtp } from '../../App/Actions/UserAction'
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

function Login() {
  const dispatch = useDispatch();

  return (

    <Box w="100vw" h="100vh" bgImage={backgroundLogin} bgAttachment={'fixed'} display={'flex'} alignItems={'center'} justifyContent={'center'} >
     
     <Link to={'/'}>
        <Image src={logo} position={'absolute'} w="80px" h="80px" top="2" left="2" />
        </Link>
           <Box h={"400px"} w={"1024px"} bgColor={'rgba(0,0,0,0.7)'} display={'flex'}   alignItems={'center'} justifyContent={'space-around'}>
            <VStack w="364px" h={'235px'} my={'auto'} display={{base:"none", md:"flex"} } alignItems={'start'}  justifyContent={'space-between'}>
            <Box>
                 <Heading  color='white'fontSize="40px"  fontFamily= "Montserrat" fontWeight={'normal'}>
                Don’t Have an account?
                </Heading>
                <Text color =" #DCDCDC" fontSize= "md" fontFamily= "Montserrat" fontWeight={'normal'}>
                This will be a subtext a brief Description This will be a subtext a brief Description
                </Text>
                </Box>
                <Link to="/signup">
                <Button onClick={()=>dispatch({ type: "clearData" })}  variant={'outline'} colorScheme='whiteAlpha' color={'white'} borderColor={'white'} px={'12'}>
                SIGN UP
                </Button>
                </Link>
            </VStack>
            <Box w={["100%" , "100%" , "100%" , "500px" , "500px"]} h={'595px'}  display={'flex'} alignItems={'center'} justifyContent={'center'} maxH = "90vh" bgColor={'white'} px={'5%'}> 
<LoginForm/>
</Box>
        </Box>

    </Box>
    )
}

export default Login





  
  const LoginForm = () => {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');

  const [otpSending, setotpSending] = useState(false);
  const dispatch = useDispatch();
    const register = (e) => {
      e.preventDefault();
      setotpSending(true);
  dispatch(sendOtp( phone));
  setotpSending(false);
  
    }

const [device_token, setDevice_token] = useState('')
    async function requestPermission() {
       await getToken(messaging, {
        vapidKey:
          "BLgBTwv4ABwYrjo7yTrIDvWZmAglJVlEBQepMksVOQ8Cq2G-a9zQqNxyvEJmVn7RD7u6u77xcnaF50d19sv4lII",
      }).then(token=>{ console.log("Token Gen", token);
      setDevice_token(token)})
      .catch(err=>{console.log(err); setDevice_token('')})
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);

    const {aleartData,isOtpSent} = useSelector((state)=>state.user);
  
    const login = async () => {
      try {
        const token = device_token;
        dispatch(loginUser(phone, otp,token));
      } catch (error) {
console.log(error)    
  }
    };
  console.log(aleartData)
    return (
        <form onSubmit={register}>
        <VStack w={["100%" , "100%" , "100%" , "300px" , "300px"]}  mx="auto"alignItems={'start'} gap={2}>
        <Heading w="full" size={'lg'}>Login !</Heading>
            <FormControl id="phone" isRequired>
           <Input
        borderColor={'rgba(210, 210, 210, 1)'}
                color={'rgba(0, 0, 0, 1)'}
                backgroundColor={'rgba(246, 246, 246, 1)'}
                type="tel"
                minLength={10}
                maxLength={10}
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
              <Button colorScheme='blackAlpha' backgroundColor={'black'} color="white"  w="full" type="submit" isLoading={otpSending}>
                Send OTP
              </Button>
            )}
  
  
          </VStack>
        </form>
    );
  };
  
  



// import {
//   Box,
//   Button,
//   Container,
//   FormLabel,
//   HStack,
//   Heading,
//   Input,
//   VStack,
// } from '@chakra-ui/react';
// import React from 'react';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {Link} from 'react-router-dom'
// import { loginUser } from '../../App/Actions/UserAction';
// // import { login } from '../../../Redux/actions/userAction';
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [Password, setPassword] = useState('');
//   const dispatch = useDispatch();

//   const submitHandler = (e)=>{
//       e.preventDefault();
//       dispatch(loginUser(email,Password));
//       setEmail("");
//       setPassword("");
//   }
//   const img = "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2067&q=80"
//   return (
//     <Container minH={"89vh"} py={"10"} w="100%" maxW={'100vw'} px={'5%'} bgImage={img} bgSize={"cover"} bgAttachment={"fixed"} bgPos={"center"} >
//     <VStack h="full" justifyContent={"center"} spacing={"8"} w={"container.sm"} maxW={'100%'} mx={"auto"} bgColor={'rgba(255,255,255,0.8)'} p={'5%'} bgBlendMode={"color-burn"} backdropBlur={'5px'} shadow={'2xl'} rounded={'3xl'} >
//         <Heading children={'Welcome to Pink Aprons'} />

//         <form style={{ width: '100%' }}>
//           <Box my={'4'}>
//             <FormLabel htmlFor="email" children="Email Adress" />
//             <Input
//               required
//               id="email"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               placeholder="abc@email.com"
//               type="email"
//               focusBorderColor="pink.500"
//             />
//           </Box>

//           <Box my={'4'}>
//             <FormLabel htmlFor="Password" children="Password" />
//             <Input
//               required
//               id="Password"
//               value={Password}
//               onChange={e => setPassword(e.target.value)}
//               placeholder="Password"
//               type="Password"
//               focusBorderColor="pink.500"
//             />
//           </Box>
//           <Box>
//           <Link to ="/forgetpassword"><Button fontSize={'sm'} variant={'link'}>forget password</Button></Link>
//           </Box>
//             <Button my={'4'} colorScheme='pink' type='button' onClick ={(e)=>submitHandler(e)}>Login</Button>
//             <HStack my={'4'}>
//             <Box>New User?</Box>< Link to ='/register' ><Button px="2" colorScheme='pink' variant={'ghost'}>Register</Button></Link>
//               </HStack>
//         </form>
//       </VStack>
//     </Container>
   
//   );
// };

// export default Login;

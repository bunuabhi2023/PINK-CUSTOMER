import {  VStack } from '@chakra-ui/react'
import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'


function Layout({children}) {
  return (   
    <VStack gap="4" w ="full"  overflowX={'hidden'} >
    <NavBar />
    {children}
    <Footer/>
    </VStack>

   ) 
}

export default Layout
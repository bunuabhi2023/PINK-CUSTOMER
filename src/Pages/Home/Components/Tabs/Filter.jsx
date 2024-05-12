import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, IconButton, Input, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { FaFilter } from 'react-icons/fa'


export default Filter

function Filter() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    return (
      <>
        <HStack  gap={3}>
          <Text fontWeight={'bold'} fontSize={'xl'} >Filter</Text> <IconButton rounded={'full'} colorScheme='pink' variant={'outline'}   ref={btnRef} onClick={onOpen} ><FaFilter/></IconButton>
        </HStack>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader>Create your account</DrawerHeader>
  
            <DrawerBody>
              <Input placeholder='Type here...' />
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
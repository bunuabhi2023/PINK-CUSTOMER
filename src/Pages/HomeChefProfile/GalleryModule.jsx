import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';


import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import { Box, Flex, HStack, Heading, Image, Text, VStack ,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Icon,} from '@chakra-ui/react';
import Gallery from './Lightbox';


function GalleryModule({galleryData}) {
  return (
    <VStack align={'start'}>
      <Heading>
        About HomeChef
      </Heading>
<Text  whiteSpace="pre-line"  fontSize={'unset'}        dangerouslySetInnerHTML={{ __html:  galleryData?.about?.description}}>
 
</Text>
        <Gallery photos = {galleryData?.images} videos={galleryData?.videos}/>
    </VStack>
  )
}

export default GalleryModule
























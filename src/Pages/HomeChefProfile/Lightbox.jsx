import React from 'react';
import {
  VStack,
  Box,
  Flex,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import 'swiper/swiper.min.css';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BsPlayFill } from 'react-icons/bs';
import { useState } from 'react';
import { useRef } from 'react';
SwiperCore.use([Navigation, Pagination]);

function Gallery({ photos, videos }) {
  const [photoIndex, setPhotoIndex] = React.useState(null);
  const [isPhotoLightboxOpen, setPhotoLightboxOpen] = React.useState(false);

  const openPhotoLightbox = (idx) => {
    setPhotoIndex(idx);
    setPhotoLightboxOpen(true);
  };
  const closePhotoLightbox = () => {
    setPhotoLightboxOpen(false);
  };




  return (
    <VStack w="full" spacing={4}>
      <Box w="full">
     {photos?.length> 0&&   <Text fontSize="xl" fontWeight="bold">
          Photos
        </Text>}
        <Flex flexWrap="wrap" gap={1}  w={'full'}>
          {photos?.map((photo, idx) => (
            <Image
              key={idx}
              h="150px"
              w="auto"
              src={photo.file}
              alt={`Photo ${idx + 1}`}
              onClick={() => openPhotoLightbox(idx)}
              cursor="pointer"
            />
          ))}
        </Flex>
      </Box>

      <Box w={'full'}>
      {videos?.length> 0&&<Text fontSize="xl" fontWeight="bold">
          Videos
        </Text>}
        <Flex w={'full'} flexWrap="wrap" gap={1}>
          {videos?.map((video, idx) => (
 <VideoCard videoUrl={video?.file}/>
          ))}
        </Flex>
      </Box>

      {/* Photo Lightbox */}
      <Modal isOpen={isPhotoLightboxOpen} onClose={closePhotoLightbox} size="full" zIndex={9999}>
        <ModalOverlay bg="rgba(0, 0, 0, 0.8)" />
        <ModalContent bg="transparent" px={[0, '20']}>
          <ModalHeader />
          <ModalCloseButton color={'white'} />
          <ModalBody p={0} display="flex" alignItems="center" justifyContent="space-between">
           
            {photoIndex !== null && (
              <Swiper
                
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                initialSlide={photoIndex}
                onSlideChange={(swiper) => setPhotoIndex(swiper.activeIndex)}
                onSwiper={(swiper) => setPhotoIndex(swiper.activeIndex)}
              >
                {photos?.map((photo, idx) => (
                  <SwiperSlide key={idx}>
                    <Image mx={'auto'} my={'auto'} src={photo.file} alt={`Photo ${idx + 1}`} maxH="80vh" maxW="80vw" />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

          </ModalBody>
     
        </ModalContent>
      </Modal>

    </VStack>
  );
}

export default Gallery;












const VideoCard = ({ videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <>
      <Box
      shadow={'xl'}
        position="relative"
        width={["100px" ,"200px"]}
        height="auto"
        maxH="150px"
        overflow="hidden"
        cursor="pointer"
        onClick={openModal}
      >
        <video ref={videoRef} src={videoUrl} alt="Video" width="100%" height="100%" onClick={playVideo} loop muted />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          fontSize="32px"
          display={{base:"none" , md:"block"}}
          fontWeight="bold"
          cursor="pointer"
          zIndex="1"
          background={'none'}
          border={'none'}
        >
         <BsPlayFill/>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={closeModal} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton zIndex={10}  maxH={'80vh'}/>
          <ModalBody p={0}>
            <video ref={videoRef} src={videoUrl} autoPlay controls width="100%" height="100%" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};


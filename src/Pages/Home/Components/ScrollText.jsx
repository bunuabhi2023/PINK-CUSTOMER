import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const ScrollText = ({text}) => {
  return (
    <Box
      id="scroll-container"
      overflow="hidden"
      w="100%"
          position="relative"
      fontSize={['5xl','7xl']}
      fontWeight={'bold'}
      fontFamily={'Sansita Swashed'} 
    >
      <motion.div

      style={{width:"max-content"}}
        id="scroll-text"
        textAlign="right"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="flex"
        alignItems="center"
        whiteSpace="nowrap"
        animate={{
          x: ["0%", "-60%"],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        
      >
        {text}
      </motion.div>
    </Box>
  );
};

export default ScrollText;

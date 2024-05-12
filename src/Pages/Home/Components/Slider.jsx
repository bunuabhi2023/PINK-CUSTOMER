import React,{useEffect} from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./mainslider.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Img } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loadSliders } from "../../../App/Actions/screenDataReducerAction";

const Slider = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // let location = JSON.parse(localStorage.getItem('userLocation'));
    dispatch(loadSliders());
  }, [dispatch]);
  const {sliders} = useSelector(state=>state.screenData)
 if(sliders) return (

<Box px={['4','10']}  w={['100vw' , "40vw" ]}>
<Swiper
      
       slidesPerView={1}
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      navigation
    >
      {
        sliders&& sliders.map(slider=>     <SwiperSlide key={slider.id} className="bg-color1">
        <ImageAndTitle title = {slider.discription} img = {slider.file}/>
        </SwiperSlide>)
      }
    </Swiper>
</Box>
  );
  else return <></>
};

export default Slider;


const ImageAndTitle = ({title,img}) => {
    return (
        <Box w="250px" h={'250px'} bg={'black'} mx={"auto"}  overflow={"hidden"}>
<Box w="full" h="full" aspectRatio={1} rotate={'15deg'}       _hover={{
        transform: "scale(1.02) rotate(1deg)",
      }}
      transition="transform 0.3s"

>
<Img src={img} w="full" h="full" aspectRatio={1}/>

  </Box>        </Box>
    );
}


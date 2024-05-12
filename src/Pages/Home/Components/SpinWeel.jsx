import React, { useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { SpinWeel } from "../../../App/Actions/screenDataReducerAction";
import axios from "axios";
import { server } from "../../../App/store";
import { Box, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

const Wheel = (props) => {
  const [counter, setCounter] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const dispatch = useDispatch();
  const selectItem = async () => {
    if (!isSpinning && selectedItem === null && counter === 0) {
      let token = JSON.parse(localStorage.getItem('token'));

      axios.get(`${server}/spin-wheel`, {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`,
        }
      }).then((res) => {
        console.log(res.data);
        const reward = res.data.data.reward;
        const selectedItem = items.indexOf(reward);
        if (props.onSelectItem) {
          props.onSelectItem(selectedItem);
        }

        setSelectedItem(selectedItem);
        setCounter((prevCounter) => prevCounter + 1);
        setIsSpinning(true);
        onOpen();
        setTimeout(() => {
          dispatch({ type: "setweelSpined" });
        }, 20000);

      }).catch((e) => {
        if (e.response && e.response.status === 401) {
          dispatch({ type: 'logoutSuccess' })
        }
        setTimeout(() => {
          dispatch({ type: "setweelSpined" });
        }, 20000);
        console.log(e.response.data)
      })
    }
  };

  const handleSpinButtonClick = () => {
    if (counter === 0) {
      setIsSpinning(false);
      selectItem();
    }
  };

  const { items } = props;
  console.log(items[selectedItem])

  const wheelVars = {
    "--nb-item": items.length,
    "--selected-item": selectedItem,
  };
  const spinning = isSpinning ? "spinning" : "";
  const { isOpen, onOpen , onClose } = useDisclosure()

  return (
    <div className="wheel-container">
       <Modal  isOpen={isOpen} onClose={()=>{dispatch({ type: "setweelSpined" }); onClose()}}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
           <Flex justifyContent={'center'} alignItems={'center'} p="10">
            Congratulation you got <Text color="pink.500" ml={2}>{items[selectedItem]}</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className={`wheel ${spinning}`} style={wheelVars} onClick={selectItem}>
        {items.map((item, index) => (
          <div className="wheel-item" key={index} style={{ "--item-nb": index }} >
            {item}
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleSpinButtonClick}>Spin</button>
      </div>
    </div>
  );
};

// export default Wheel;




function Spinweel({items, onSelectItem}) {
  const {user} = useSelector((state)=>state.user);
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

 if(user && user.has_spun_wheel === 0)
    return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent w="full" h="full">
        <ModalCloseButton />
          <ModalBody>
            <Wheel items ={items} onSelectItem ={onSelectItem}/>
            </ModalBody>
      </ModalContent>
      </Modal>
    </div>
  )
  else return (<></>)
  
}

export default Spinweel
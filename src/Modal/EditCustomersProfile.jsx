import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccountDetails, updateCustomerDetails } from "../App/Actions/MyAccountAction";
import { FiEdit } from "react-icons/fi";


const EditCustomersProfile = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    const { accountDetails } = useSelector(state => state.myAccountDetails);
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [mobile_number, setMobileNumber] = useState("");
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    
    const handleOpen = () => {
        onOpen();
        dispatch(getAccountDetails());
    }

    // Edit details:-
    const editDetails = () => {
        const newDetails = {}
        if(name){
            newDetails.name = name
        }
        if(email){
            newDetails.email = email
        }
        if(dob){
            newDetails.dob = dob
        }
        if(mobile_number){
            newDetails.mobile_number = mobile_number
        }
        dispatch(updateCustomerDetails(newDetails));
        onClose();
    }

    useEffect(() => {
        if (accountDetails) {
            setName(accountDetails.name ? accountDetails.name : "");
            setDob(accountDetails.dob ? accountDetails.dob : "" );
            setEmail(accountDetails.email ? accountDetails.email : '');
            setMobileNumber(accountDetails.mobile_number ? accountDetails.mobile_number : '');
        }
    }, [accountDetails, dispatch]);


    return (
        <>
            <Button onClick={onOpen} size={{ base: 'xs', lg: 'sm' }} borderRadius="5px" bg="#c7177a" color="white">
                <FiEdit />Edit Profile
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={() => handleOpen()}
            >
                <ModalOverlay />
                <ModalContent backgroundColor="white">
                    <ModalHeader color={'#c7177a'} fontWeight="bold" pb={0}>Update Profile Details</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel color={'blue.600'} fontSize="80%">Name</FormLabel>
                            <Input
                                value={name}
                                size={'sm'}
                                type="text"
                                border="1px solid gray"
                                placeholder='Enter name'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel color={'blue.600'} fontSize="80%">Email</FormLabel>
                            <Input
                                value={email}
                                size={'sm'}
                                type="email"
                                border="1px solid gray"
                                placeholder='Enter mail'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mt={3}>
                            <FormLabel color={'blue.600'} fontSize="80%">Mobile No.</FormLabel>
                            <Input
                                value={mobile_number}
                                size={'sm'}
                                type="number"
                                border="1px solid gray"
                                placeholder='Enter mobile no.'
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={3}>
                            <FormLabel color={'blue.600'} fontSize="80%">Dob</FormLabel>
                            <Input
                                value={dob}
                                size={'sm'}
                                type="date"
                                border="1px solid gray"
                                placeholder='dob'
                                onChange={(e) => setDob(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button bg="#c7177a" color="white" size={'sm'} mr={3} onClick={() => editDetails()}>
                            Update
                        </Button>
                        <Button colorScheme="white" color="#c7177a" border="1px solid #c7177a" onClick={onClose} size={'sm'}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export { EditCustomersProfile };
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { getOtpWithWithMobile, submitOtpWithMobileFunc } from "../App/Actions/MyAccountAction";
import { useDispatch } from "react-redux";


const VerifyWithMobileNo = ({ mobNum }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();


    const verifyWithMobileNumber = async () => {
        const mobileData = { 'mobile_number': mobNum };
        if (mobileData.mobile_number) {
            dispatch(getOtpWithWithMobile(mobileData));
        }
        // if (mobileData.mobile_number) {
        //     try {
        //         const response = await axios.post('https://webient.in/api/auth/send-otp', mobileData,
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                 },
        //             });
        //         console.log(response.data);
        //         setMsg(response.data.message);
        //         setShowOtpInput(true);
        //     }
        //     catch (error) {
        //         console.error('Error posting data:', error);
        //         setShowOtpInput(false);
        //     }
        // }
    }


    const submitOtp = async () => {
        const otpdata = { "mobile_number": mobNum, 'otp': otp };
        console.log({ otpdata });
        dispatch(submitOtpWithMobileFunc(otpdata))
            .then(() => {
                setOtp('');
                setShowOtpInput(false);
                onClose();
            })
    }


    return (
        <>
            <Button colorScheme="pink" size={'xs'} fontSize={'70%'} onClick={onOpen}>
                Verify Mobile No.
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent backgroundColor="white">
                    <ModalHeader color={'pink.600'} fontWeight="bold">Verify with Mobile No.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {
                            !showOtpInput && <FormControl>
                                <FormLabel>Mobile No.</FormLabel>
                                <Input
                                    value={mobNum}
                                    size={'sm'}
                                    type="number"
                                    border="1px solid gray"
                                    placeholder='Mobile No.'
                                />
                            </FormControl>
                        }
                        {
                            showOtpInput ? (
                                <FormControl mt={2}>
                                    <FormLabel>Enter Otp</FormLabel>
                                    <Input
                                        value={otp}
                                        size={'sm'}
                                        type="text"
                                        border="1px solid gray"
                                        placeholder='Enter otp'
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </FormControl>
                            ) : <></>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {
                            !showOtpInput ?
                                <Button bg="pink.600" color="white" size={'sm'} mr={3} onClick={() => verifyWithMobileNumber()}>
                                    Sent OTP
                                </Button> :
                                <Button bg="pink.600" color="white" size={'sm'} mr={3} onClick={() => submitOtp()}>
                                    Verify
                                </Button>
                        }
                        <Button colorScheme="white" color="black" border="1px solid red" onClick={onClose} size={'sm'}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export { VerifyWithMobileNo };
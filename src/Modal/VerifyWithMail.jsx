
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getOtpWithMailFunc, submitOtpWithMailFunc } from "../App/Actions/MyAccountAction";


const VerifyWithMail = ({ email }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const dispatch = useDispatch();

    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');

    const verifyWithMail = async () => {
        const mailData = { 'email': email };
        dispatch(getOtpWithMailFunc(mailData))
            .then(() => setShowOtpInput(true));
    }


    const submitOtp = async () => {
        const otpdata = { "email": email, 'otp': otp };
        console.log({ otpdata });
        dispatch(submitOtpWithMailFunc(otpdata))
            .then(() => {
                setOtp('');
                setShowOtpInput(false);
                onClose();
            })
    }


    return (
        <>
            <Button colorScheme="pink" size={'xs'} fontSize={'70%'} onClick={onOpen}>
                Verify Email
            </Button>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent backgroundColor="white">
                    <ModalHeader color={'pink.600'} fontWeight="bold">Verify with Email</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {
                            !showOtpInput && <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    value={email}
                                    size={'sm'}
                                    type="email"
                                    border="1px solid gray"
                                    placeholder='Email'
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
                                <Button bg="pink.600" color="white" size={'sm'} mr={3} onClick={() => verifyWithMail()}>
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

export { VerifyWithMail };
import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import useRazorpay from 'react-razorpay';
import { ProfileSideBar } from "./ProfileSideBar";
import { TopBoxProfileDetails } from "./TopBoxProfileDetails";
import axios from "axios";
import { server } from "../../App/store";

const PinkApronsCredits = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [addingBalance, setAddingBalance] = useState(false);
  const [addBalanceAmount, setAddBalanceAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    try {
        const accessToken = JSON.parse(localStorage.getItem("token"),);
      const response = await axios.get(`${server}/get-balance`, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      ); // Replace with actual API endpoint
      console.log({balance: response.data.data[0]?.balance})
      setWalletBalance(response.data.data[0]?.balance|| 0);
      setAddingBalance(false)
      setAddBalanceAmount(0);
    } catch (error) {
      setErrorMessage("Failed to fetch wallet balance.");
    }
  };
 
  const Razorpay = useRazorpay();

  const handlePayment = async (order) => {
    console.log(order);

    const options = {
      key: "rzp_live_RFDCf6fNpIDBTl", // Enter the Key ID generated from the Dashboard
      amount: order.balance, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "PinkAprons",
      description: "pinkAprons is a food delivery site ",
    //   image: { logoimg },
      order_id: order.rzp_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (rs) {
        const token = JSON.parse(localStorage.getItem("token"));

        axios.post(`${server}/success-balance`, {
          "order_id": rs.razorpay_order_id,
          "razorpay_payment_id": rs.razorpay_payment_id,
          "generated_signature": rs.razorpay_signature
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(res => {
          getBalance();
          console.log(res.data);
          setSuccessMessage('successfully added money in the wallet')
        }).catch(e => alert(e));
        console.log(rs)
      },
      prefill: {
        name: order.customer_name,
        email: order.email,
        contact: order.mobile_number,
      },
      notes: {
        address: "order by pinkapprons",
      },
      theme: {
        color: "rgba(247, 35, 150, 1)",
      },
    };
    console.log(options);
    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      getBalance();

    });
    rzp1.on("payment.cancel", function (response) {
      getBalance();

    });
    rzp1.on("dismiss", function (response) {
      getBalance();

    });

    
    rzp1.open();
  };

  const handleAddBalance = async () => {
    if (addBalanceAmount <= 9) {
      setErrorMessage("Amount must be minium 10 rupees.");
      return;
    }

    setAddingBalance(true);
    try {
        const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.post(`${server}/add-balance`, {
        balance: parseInt(addBalanceAmount),
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        }
    }); // Replace with actual API endpoint

      // Extract the orderId and orderAmount from the response
    //   balance: 2000,
    //   customer_name: "geetanjali chawla",
    //   email: "geetc1919@gmai.com",
    //   mobile_number:"9990354632",
    //   rzp_order_id: "order_MKmZdVokmNdfmH"

      console.log(response.data)



    await  handlePayment(response.data); // Call the handlePayment function to initiate the payment process
      setAddingBalance(false);

    } catch (error) {
      setErrorMessage("Failed to add balance.");
      setAddingBalance(false);
    }
  };

  return (
    <Box display="flex" flexDir="column" width="100%" m={"auto"} mt={[12, 20]}>
      <TopBoxProfileDetails />
      <Flex width="95%" m="auto">
        <Box className="sidebar-box">
          <ProfileSideBar />
        </Box>
        <Box className="main-box">
          <Box>
            <Text
              fontSize={{ base: "100%", sm: "110%", lg: "120%" }}
              fontWeight={"bold"}
              fontFamily="sans-serif"
              textDecoration="underline"
              p={1}
            >
              PinkAprons Credits
            </Text>
          </Box>
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">
              Wallet Balance: {walletBalance} Points
            </Text>
            <Text size={'sm'}> 1 point = 1 Rupees</Text>
          </Box>
          <Box mt={4}>
            <FormControl>
              <FormLabel>Amount to Add:</FormLabel>
              <Input
                type="number"
                placeholder="Enter amount"
                value={addBalanceAmount}
                onChange={(e) => setAddBalanceAmount(e.target.value)}
              />
            </FormControl>
            <Button
              mt={2}
              colorScheme="pink"
              isLoading={addingBalance}
              onClick={handleAddBalance}
            >
              Add Balance
            </Button>
          </Box>
          {successMessage && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}
          {errorMessage && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Box mt={4}>
            {/* Display a list of successful payments or transactions here */}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export { PinkApronsCredits };

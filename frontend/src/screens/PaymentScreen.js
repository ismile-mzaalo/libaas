import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Radio,
  HStack,
  RadioGroup,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Checkoutsteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const [paymentMethodRadio, setPaymentMethodRadio] = useState(
    paymentMethod || "paypal"
  );

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodRadio));
    navigate("/placeorder");
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <Checkoutsteps step1 step2 step3 />

        <Heading as="h1" mb="8" fontSize="3xl">
          Payment Method
        </Heading>

        <form onSubmit={submitHandler}>
          <FormControl as="fieldset">
            <FormLabel as="legend">Select Methods</FormLabel>
            <RadioGroup defaultValue={paymentMethodRadio}>
              <HStack spacer="24px">
                <Radio
                  value="paypal"
                  onChange={(e) => setPaymentMethodRadio(e.target.value)}
                >
                  Payment or Credit/Debit Card
                </Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Button type="submit" mt="4" colorScheme="teal">
            Continue
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default PaymentScreen;

import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Select,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { countryList } from "../data/CountryList";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center" py="5">
      <FormContainer>
        <CheckoutSteps step1 step2 />

        <Heading as="h1" mb="8" fontSize="3xl">
          Shipping
        </Heading>

        <form onSubmit={submitHandler}>
          {/* Address */}
          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          {/* City */}
          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input
              type="text"
              placeholder="Your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          {/* postal code */}
          <FormControl id="postalCode">
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="number"
              placeholder="Your postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          {/* Country */}
          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Select
              placeholder="Select your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {countryList.map((i) => (
                <option key={i + 1} value={i}>
                  {i}
                </option>
              ))}
            </Select>
          </FormControl>

          <Spacer h="3" />

          <Button type="submit" mt="4" colorScheme="teal">
            Continue
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default ShippingScreen;

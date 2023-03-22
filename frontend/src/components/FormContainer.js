import { Flex } from "@chakra-ui/react";

const FormContainer = ({ children, width = "xl" }) => {
  return (
    <Flex
      direction="column"
      boxShadow="base"
      rounded="md"
      bgColor="gray.50"
      p="10"
      width={width}
    >
      {children}
    </Flex>
  );
};

export default FormContainer;

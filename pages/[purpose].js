import {
    FormControl,
    FormLabel,
    Input,
    Flex,
    Button,
    VStack,
    Box
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from "formik";

const Form = () => {
 
    const { asPath } = useRouter();
    let str = asPath.replace('/for-rent-', '');
    const formik = useFormik({
        initialValues: {
          email: "",
          name: "",
          contactNo: ""
        },
        onSubmit: (values) => {
          fetch('/api/email', {
            method: 'post',
            body: JSON.stringify(values)
          })
        }
    });

    return (
        <Flex bg="gray.100" align="center" justify="center" h="80vh" rounded='md'>
          <Box bg="white" p={6} rounded="md" w='60vh'>
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    type="name"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="contactNo">Contact Number</FormLabel>
                  <Input
                    id="contactNo"
                    name="contactNo"
                    type="number"
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.contactNo}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" width='full'>
                  Submit
                </Button>
                <Button type="cancel" colorScheme="blue" width='full'>
                  Cancel
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
    );
}

export default Form;
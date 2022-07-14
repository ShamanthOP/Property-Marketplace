import { Flex, Box, Button} from '@chakra-ui/react';
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use';
import Link from 'next/link';

const Confirmation = () => {
    const {width, height} = useWindowSize();
    return (
        <Flex bg="gray.100" align="center" justify="center" h="80vh" rounded='md'>
            <Box bg="white" p={6} rounded="md" w='60vh'>
                <Confetti
                    width={width}
                    height={700}
                    recycle={false}
                />
                <Flex align="center" justify="center" rounded='md'>
                    Thank you for showing interest.<br/>We will contact you for further procedures.
                    <Link href='/'>
                        <Button m={3}>
                            Back To Home
                        </Button>
                    </Link>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Confirmation;
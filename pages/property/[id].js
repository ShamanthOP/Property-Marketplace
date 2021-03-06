import Link from 'next/link';
import { Box, Spacer, Avatar, Text, Flex, Button } from '@chakra-ui/react';
import { FaBed, FaBath, FaRegMoneyBillAlt } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { fetchApi, baseUrl } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';
    
const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos }, siteID}) => (
    
    <Box minWidth='1000px' margin='auto' p='4'>
        { photos && <ImageScrollbar data={photos}/> }
        <Box w='full' p='6'>
            <Flex paddingTop='2' align-items='center' justifyContent='space-between'>
                <Flex alignItems='center'>
                    <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
                    <Text fontSize='lg' fontWeight='bold'>RS {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
                </Flex>
                <Box>
                    <Avatar size='sm' src={agency?.logo?.url} />
                </Box>
            </Flex>
            <Flex alignItems='center' p='1' justifyContent='space-between' w={250} color='blue.400'>
                {rooms} <FaBed /> | {baths}<FaBath /> | {millify(area)} sqft <BsGridFill />
            </Flex>
            <Box marginTop='2'>
                <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
                <Text LineHeight='2' color='gray.600'>{description}</Text>
            </Box>
            <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
                <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.200' p='3'>
                    <Text>Type</Text>
                    <Text fontWeight='bold'>{type}</Text>
                </Flex>
                <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.200' p='3'>
                    <Text>Purpose</Text>
                    <Text fontWeight='bold'>{purpose}</Text>
                </Flex>
                {furnishingStatus && (
                    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.200' p='3'>
                        <Text>Furnishing Status</Text>
                        <Text fontWeight='bold'>{furnishingStatus}</Text>
                    </Flex>
                )}
            </Flex>
            <Box>
                {amenities.length && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Amenities</Text>}
                <Flex flexWrap='wrap'>
                    {amenities.map((item) => (
                        item.amenities.map((amenity) => (
                            <Text key={amenity.text} fontWeight='bold' color='blue.400' fontSize='l' p='2' bg='gray.200' m='1' borderRadius='5'>{amenity.text}</Text>
                        ))
                    ))}
                </Flex>
                <Flex justifyContent='center'>
                    <Link href={`/${purpose}-${siteID}`}>
                        <Button leftIcon={<FaRegMoneyBillAlt />} colorScheme='green' variant='solid' m={7} width='420px'>
                            Buy Now
                        </Button>
                    </Link>
                </Flex>
            </Box>
        </Box>
    </Box>
)

export async function getServerSideProps({ params: { id }}) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)
    return {
        props: {
            propertyDetails: data, 
            siteID: `${id}`
        }
    }
}

export default PropertyDetails;
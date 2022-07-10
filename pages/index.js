import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import Property from '../components/Property';

const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, imageUrl, linkName}) => (
  <Flex m='10' justifyContent='center' alignItems='center' flexWrap='wrap'>
    <Image src={imageUrl} width='500' height='300' p={3} alt='banner'/>
    <Box p='3'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br/>{title2}</Text>
      <Text color='gray.800' fontSize='lg' fontWeight='medium'>{desc1}<br/>{desc2}</Text>
      <Button fontSize='l' color='black' bg='blue.200'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({ propertiesForRent, propertiesForSale }) {
  return (
    <Box>
      <Banner 
        purpose='RENT A HOME'
        title1='Rental homes for'
        title2='Everyone'
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore renting'
        linkName='/search?purpose=for-rent'
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap='wrap'>
        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
      <Banner 
        purpose='BUY A HOME'
        title1='Find, Buy & Own Your'
        title2='Dream Home'
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText='Explore buying'
        linkName='/search?purpose=for-sale'
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap='wrap'>
        {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {

  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}

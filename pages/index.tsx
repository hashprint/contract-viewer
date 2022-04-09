import { Box, Center, Container, HStack } from '@chakra-ui/react'
import { LogoIcon, ViewerLogoIcon } from 'components/Header/LogoIcon'
import { SearchBox } from 'components/Header/SearchBox'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <Container maxW={'container.xl'} h='100vh' centerContent>
      <Head>
        <title>Contract Viewer by HashPrint</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Center flexDirection={'column'} height='full'>
        <HStack
          color='gray.900'
          alignItems='center'
          justify={'center'}
          cursor={'pointer'}
          marginBottom='4'
        >
          <LogoIcon sx={{ width: '108px', height: '24px' }} />
          <ViewerLogoIcon
            sx={{
              width: '60px',
              height: '16px',
              marginBottom: '3px !important',
              marginLeft: '12px',
            }}
          />
        </HStack>

        <SearchBox color={'gray.900'} size='lg' />
      </Center>
    </Container>
  )
}

export default Home

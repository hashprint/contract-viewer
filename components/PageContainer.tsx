import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { Header } from './Header'

export const PageContainer: React.FC<{ children: React.ReactNode }> = props => {
  return (
    <Box>
      <Header />
      <Container maxW={'container.xl'} paddingTop='4' paddingBottom='20'>
        {props.children}
      </Container>
    </Box>
  )
}

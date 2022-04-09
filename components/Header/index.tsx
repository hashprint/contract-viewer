import { Box, BoxProps, Container, HStack, DarkMode } from '@chakra-ui/react'
import { LogoIcon, ViewerLogoIcon } from './LogoIcon'
import { SearchBox } from './SearchBox'
import NextLink from 'next/link'

export const Header: React.FC<BoxProps> = props => {
  return (
    <Box as='header' bg='gray.900' padding={4} {...props}>
      <Container
        maxW={'container.xl'}
        padding='0'
        display={'flex'}
        justifyContent='space-between'
      >
        <NextLink href='/' passHref>
          <HStack alignItems='center' cursor={'pointer'}>
            <LogoIcon color='white' sx={{ width: '108px', height: '24px' }} />
            <ViewerLogoIcon
              color='white'
              sx={{
                width: '60px',
                height: '16px',
                marginBottom: '3px !important',
                marginLeft: '12px',
              }}
            />
          </HStack>
        </NextLink>

        <SearchBox />
      </Container>
    </Box>
  )
}

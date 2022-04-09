import { Box, BoxProps, Container } from '@chakra-ui/react'
import { LogoIcon, ViewerLogoIcon } from './LogoIcon'

export const Header: React.FC<BoxProps> = props => {
  return (
    <Box as='header' bg='gray.900' padding={4} {...props}>
      <Container
        maxW={'container.xl'}
        padding='0'
        display={'flex'}
        alignItems={'center'}
      >
        <LogoIcon color='white' sx={{ width: '108px', height: '24px' }} />
        <ViewerLogoIcon
          color='white'
          sx={{
            width: '60px',
            height: '16px',
            marginBottom: '3px',
            marginLeft: '12px',
          }}
        />
      </Container>
    </Box>
  )
}

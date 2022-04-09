import '../styles/globals.css'
import 'focus-visible/dist/focus-visible'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <Toaster />
    </ChakraProvider>
  )
}

export default MyApp

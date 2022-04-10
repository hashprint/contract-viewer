import '../styles/globals.css'
import 'focus-visible/dist/focus-visible'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        {/*@ts-ignore */}
        <Component {...pageProps} />
        <Toaster />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp

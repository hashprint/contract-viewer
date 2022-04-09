import {
  Icon,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
  Select,
  Spinner,
  useCallbackRef,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'

export const SearchBox: React.FC<InputGroupProps> = props => {
  const router = useRouter()

  const [chain, setChain] = useState('ethereum')
  const [address, setAddress] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const onChangeChain = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setChain(event.target.value)
    },
    []
  )

  const onKeyDown = useCallbackRef(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        setIsLoading(true)
        router.push(`/${chain}/${address}`)
      }
    }
  )

  return (
    <InputGroup maxW='md' color='white' {...props}>
      <InputLeftElement width={'120px'} border={'none'}>
        <Select
          value={chain}
          onChange={onChangeChain}
          border='none'
          outline={'none'}
        >
          <option value={'ethereum'}>Ethereum</option>
          {/* <option value={'polygon'}>Polygon</option>
          <option value={'avalanche'}>Avalanche</option> */}
        </Select>
      </InputLeftElement>
      <Input
        paddingLeft={'120px'}
        borderColor='gray.700'
        type={'text'}
        placeholder='Contract Address'
        value={address}
        disabled={isLoading}
        onChange={event => setAddress(event.target.value)}
        onKeyDown={onKeyDown}
      />

      {isLoading && (
        <InputRightElement border='none'>
          <Spinner color='gray.400' />
        </InputRightElement>
      )}
    </InputGroup>
  )
}

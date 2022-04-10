import {
  Icon,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
  List,
  ListItem,
  ListProps,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  Select,
  Spinner,
  Text,
  useCallbackRef,
} from '@chakra-ui/react'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Contract } from 'lib/service/type'
import { useQuery } from 'react-query'
import debounce from 'lodash-es/debounce'

const ResultList: React.FC<
  {
    contracts: Array<{ name: string; address: string }>
    isLoading: boolean
    onSelectContract: (address: string) => void
  } & ListProps
> = props => {
  const { contracts, isLoading, onSelectContract, ...restProps } = props

  function renderList() {
    if (isLoading) {
      return <ListItem>Loading....</ListItem>
    }

    return contracts.map(({ name, address }) => (
      <ListItem
        key={address}
        py='2'
        px='2'
        borderRadius={'base'}
        cursor={'pointer'}
        color='gray.900'
        _hover={{ bg: 'gray.100' }}
        onClick={() => onSelectContract(address)}
      >
        <Text isTruncated fontSize='md'>
          {name}
        </Text>
        <Text isTruncated fontSize='xs' color={'gray.500'}>
          {address}
        </Text>
      </ListItem>
    ))
  }

  return <List {...restProps}>{renderList()}</List>
}

const useSearchContracts = () => {
  const [contracts, setContracts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const lastSearchRef = useRef('')

  const search = useCallback((name: string) => {
    if (!name) return
    lastSearchRef.current = name
    setIsLoading(true)

    fetch('/api/search?name=' + name)
      .then(res => res.json())
      .then(res => {
        if (lastSearchRef.current === name) {
          setContracts(res)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return {
    search,
    isSearching: isLoading,
    contracts,
  }
}

export const SearchBox: React.FC<InputGroupProps> = props => {
  const router = useRouter()

  const [chain, setChain] = useState('ethereum')
  const [address, setAddress] = useState('')
  const [isPending, setIsPending] = useState(false)

  const { search, isSearching, contracts } = useSearchContracts()

  const onChangeChain = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setChain(event.target.value)
    },
    []
  )

  const selectAddress = useCallback(
    (selectedAddress: string) => {
      setIsPending(true)
      router.push(`/${chain}/${selectedAddress}`)
    },
    [chain, router]
  )

  const debouncedSearch = useMemo(() => debounce(search, 1000), [search])
  const onChangeAddress = useCallbackRef(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(event.target.value)
      debouncedSearch(address)
    }
  )

  const onKeyDown = useCallbackRef(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        selectAddress(address)
      }
    }
  )

  function renderAutoComplete() {
    if (!contracts.length && !isSearching) return null
    return (
      <ResultList
        isLoading={isSearching}
        contracts={contracts}
        onSelectContract={selectAddress}
      />
    )
  }

  return (
    <Popover
      isOpen={!!address && (isSearching || contracts.length > 0)}
      autoFocus={false}
    >
      <PopoverAnchor>
        <InputGroup pos={'relative'} maxW='md' color='white' {...props}>
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
            disabled={isPending}
            onChange={onChangeAddress}
            onKeyDown={onKeyDown}
          />

          {isPending && (
            <InputRightElement border='none'>
              <Spinner color='gray.400' />
            </InputRightElement>
          )}
        </InputGroup>
      </PopoverAnchor>
      <PopoverContent>
        <PopoverBody overflowX={'hidden'} overflowY='auto' maxH={'2xs'}>
          {renderAutoComplete()}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

import {
  Box,
  HStack,
  IconButton,
  LinkBox,
  LinkOverlay,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'
import { RiFileCopyLine, RiQrScan2Line } from 'react-icons/ri'
import { useCallback, useState } from 'react'

export const ContractAddress: React.FC<{
  address: string
}> = ({ address }) => {
  const onClickCopy = useCallback(() => {
    toast.success('Successfully copied!')
  }, [])

  return (
    <HStack spacing={2} flexWrap='wrap'>
      <Text fontWeight={'medium'} color='gray.500' fontSize={['sm', 'md']}>
        Address: {address}
      </Text>

      <CopyToClipboard text={address} onCopy={onClickCopy}>
        <Box>
          <Tooltip placement='top' hasArrow label={'Copy to clipboard'}>
            <IconButton
              size={'sm'}
              aria-label='copy'
              isRound
              icon={<RiFileCopyLine />}
            />
          </Tooltip>
        </Box>
      </CopyToClipboard>

      <Tooltip placement='top' hasArrow label='View on Etherscan'>
        <LinkBox>
          <LinkOverlay
            href={`https://etherscan.io/address/${address}`}
            isExternal
          >
            <IconButton
              size={'sm'}
              aria-label='view on etherscan'
              isRound
              icon={<RiQrScan2Line />}
            />
          </LinkOverlay>
        </LinkBox>
      </Tooltip>
    </HStack>
  )
}

import { Box, Text, Icon, HStack, IconButton, Collapse } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiCodeSSlashLine,
} from 'react-icons/ri'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// @ts-ignore: no declare file for this style
import oneLight from 'react-syntax-highlighter/dist/cjs/styles/prism/one-light'

type Props = {
  defaultOpen?: boolean
  name: string
  sourceCode: string
}

export const ContractDisplay: React.FC<Props> = props => {
  const [isOpen, setIsOpen] = useState(props.defaultOpen ?? false)

  return (
    <Box borderRadius={'base'} boxShadow='xs'>
      <HStack
        bg='gray.100'
        fontSize='sm'
        fontWeight={'medium'}
        color='blue.900'
        px='4'
        py='2'
        boxShadow={'sm'}
        justify='space-between'
        cursor={'pointer'}
        onClick={() => setIsOpen(!isOpen)}
        overflow='hidden'
      >
        <HStack flex={'1 0 0'} spacing='2' overflow={'hidden'}>
          <Icon as={RiCodeSSlashLine} />
          <Text isTruncated>{props.name}</Text>
        </HStack>
        <IconButton
          flex='0 0 auto'
          aria-label='toggle'
          size={'sm'}
          icon={isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
        />
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <SyntaxHighlighter
          language='solidity'
          style={oneLight}
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: '1em 0',
            fontSize: 12,
          }}
        >
          {props.sourceCode}
        </SyntaxHighlighter>
      </Collapse>
    </Box>
  )
}

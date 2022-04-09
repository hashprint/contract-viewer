import { Box, Text, Icon, HStack } from '@chakra-ui/react'
import React from 'react'
import { RiCodeSSlashLine } from 'react-icons/ri'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// @ts-ignore: no declare file for this style
import oneLight from 'react-syntax-highlighter/dist/cjs/styles/prism/one-light'

type Props = {
  name: string
  sourceCode: string
}

export const ContractDisplay: React.FC<Props> = props => {
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
        spacing='2'
      >
        <Icon as={RiCodeSSlashLine} />
        <Text>Source Code</Text>
      </HStack>
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
    </Box>
  )
}

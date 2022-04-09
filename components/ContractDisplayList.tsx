import { VStack } from '@chakra-ui/react'
import { ContractSourceFile } from 'lib/service/type'
import { ContractDisplay } from './ContractDisplay'

type Props = {
  sourceFiles: ContractSourceFile[]
}

export const ContractDisplayList: React.FC<Props> = props => {
  return (
    <VStack w='full' alignItems={'stretch'} spacing={4}>
      {props.sourceFiles.map((source, idx) => {
        return (
          <ContractDisplay
            key={idx}
            defaultOpen={idx === 0}
            name={source.name}
            sourceCode={source.content}
          />
        )
      })}
    </VStack>
  )
}

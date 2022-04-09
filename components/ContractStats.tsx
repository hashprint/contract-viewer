import {
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatGroupProps,
} from '@chakra-ui/react'
import { Contract } from 'lib/service/type'

export const ContractStats: React.FC<
  Omit<Contract, 'sourceCode'> & Pick<StatGroupProps, 'sx'>
> = props => {
  return (
    <StatGroup color={'gray.600'} sx={props.sx}>
      <Stat>
        <StatLabel>Contract Name</StatLabel>
        <StatNumber color='blue.900'>{props.name}</StatNumber>
      </Stat>

      <Stat>
        <StatLabel>Compiler Version</StatLabel>
        <StatNumber color='blue.900'>{props.compilerVersion}</StatNumber>
      </Stat>
    </StatGroup>
  )
}

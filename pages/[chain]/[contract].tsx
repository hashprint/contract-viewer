import { Container, VStack } from '@chakra-ui/react'
import { ContractDisplay } from 'components/ContractDisplay'
import { ContractStats } from 'components/ContractStats'
import { PageContainer } from 'components/PageContainer'
import { EthereumApiResolver } from 'lib/service/api-resolver'
import { ContractResolver } from 'lib/service/contract-resolver'
import { Contract } from 'lib/service/type'
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'

export const getServerSideProps: GetServerSideProps<
  { contract: Contract },
  { chain: string; contract: string }
> = async ctx => {
  const contractResolver = new ContractResolver(new EthereumApiResolver())
  const contract = await contractResolver.getContract(ctx.params!.contract)

  return {
    props: {
      contract,
    },
  }
}

const ContractPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = props => {
  const {
    contract: { sourceCode, ...contractStats },
  } = props

  return (
    <PageContainer>
      <ContractStats
        {...contractStats}
        sx={{ marginBottom: 4, marginTop: 4 }}
      />
      <ContractDisplay name={contractStats.name} sourceCode={sourceCode} />
    </PageContainer>
  )
}

export default ContractPage

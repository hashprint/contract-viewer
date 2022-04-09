import { ContractStats } from 'components/ContractStats'
import { PageContainer } from 'components/PageContainer'
import { ApiResolver, EthereumApiResolver } from 'lib/service/api-resolver'
import { ContractResolver } from 'lib/service/contract-resolver'
import { Contract } from 'lib/service/type'
import Head from 'next/head'
import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import { ContractDisplayList } from 'components/ContractDisplayList'
import { Heading, VStack, Text } from '@chakra-ui/react'
import { ContractAddress } from 'components/ContractAddress'

const getApiResolver = (chain: IChain): ApiResolver | null => {
  switch (chain) {
    case 'ethereum':
      return new EthereumApiResolver()
    default:
      return null
  }
}

export const getServerSideProps: GetServerSideProps<
  { contract: Contract; address: string },
  { chain: IChain; contract: string }
> = async ctx => {
  const chain = ctx.params!.chain
  const address = ctx.params!.contract

  const apiResolver = getApiResolver(chain)
  if (!apiResolver) {
    return {
      notFound: true,
    }
  }

  try {
    const contractResolver = new ContractResolver(apiResolver)
    const contract = await contractResolver.getContract(address)
    return {
      props: {
        contract,
        address,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}

const ContractPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = props => {
  const {
    address,
    contract: { sourceCode, ...contractStats },
  } = props

  return (
    <PageContainer>
      <Head>
        <title>
          {contractStats.name} Contract Code | Address {address} | hashprint
        </title>
      </Head>

      <VStack align={'flex-start'}>
        <Heading>{contractStats.name} Contract Code</Heading>
        <ContractAddress address={address} />
      </VStack>

      <ContractStats
        {...contractStats}
        sx={{ marginBottom: 4, marginTop: 4 }}
      />

      <ContractDisplayList sourceFiles={sourceCode} />
    </PageContainer>
  )
}

export default ContractPage

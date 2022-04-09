import { Contract, ContractSourceFile } from './type'
import config from 'lib/config'
import fake from './fake.json'

export interface ApiResolver {
  getContract(address: string): Promise<Contract>
}

const parseSourceCode = (text: string): ContractSourceFile[] => {
  if (!text.startsWith('{{')) {
    return [{ name: 'Contract.sol', content: text, language: 'Solidity' }]
  }

  const sourceCode: ContractSourceFile[] = []
  try {
    const json = JSON.parse(text.slice(1, -1)) as {
      language: string
      sources: Record<string, { content: string }>
    }
    for (const [name, value] of Object.entries(json.sources)) {
      sourceCode.push({
        language: json.language,
        name,
        content: value.content,
      })
    }
  } catch {
    //
  }

  return sourceCode
}

class FakeApiResolver implements ApiResolver {
  constructor() {}
  async getContract(address: string): Promise<Contract> {
    const contract = fake.result[0]
    return Promise.resolve({
      compilerVersion: contract.CompilerVersion,
      sourceCode: parseSourceCode(contract.SourceCode),
      name: contract.ContractName,
      evmVersion: contract.EVMVersion,
      abi: JSON.parse(contract.ABI),
    })
  }
}

class EthereumApiResolver implements ApiResolver {
  static baseUrl = 'https://api.etherscan.io/api'

  async getContract(address: string): Promise<Contract> {
    type Response = {
      status: string
      message: string
      result: Array<{
        SourceCode: string
        ABI: string
        ContractName: string
        EVMVersion: string
        CompilerVersion: string
      }>
    }

    return fetch(
      `${EthereumApiResolver.baseUrl}?module=contract&action=getsourcecode&address=${address}&apikey=${config.apiKeys.etherscan}`
    )
      .then(res => res.json())
      .then((res: Response) => {
        if (res.status !== '1') throw new Error(res.result.toString())

        const [contract] = res.result
        return {
          compilerVersion: contract.CompilerVersion,
          sourceCode: parseSourceCode(contract.SourceCode),
          name: contract.ContractName,
          evmVersion: contract.EVMVersion,
          abi: JSON.parse(contract.ABI),
        }
      })
  }
}

export const createApiResolver = (chain: IChain): ApiResolver => {
  if (process.env.USE_FAKE_PROVIDER) return new FakeApiResolver()
  // TODO: create for polygon and avalanche
  return new EthereumApiResolver()
}

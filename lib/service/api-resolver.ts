import { Contract } from './type'
import config from 'lib/config'

export abstract class ApiResolver {
  abstract getContract(address: string): Promise<Contract>
}

export class EthereumApiResolver extends ApiResolver {
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
        const [contract] = res.result
        return {
          compilerVersion: contract.CompilerVersion,
          sourceCode: contract.SourceCode,
          name: contract.ContractName,
          evmVersion: contract.EVMVersion,
          abi: JSON.parse(contract.ABI),
        }
      })
  }
}

import { ApiResolver } from './api-resolver'
import { Contract } from './type'

export class ContractResolver {
  constructor(private apiResolver: ApiResolver) {}

  getContract(address: string): Promise<Contract> {
    return this.apiResolver.getContract(address)
  }
}

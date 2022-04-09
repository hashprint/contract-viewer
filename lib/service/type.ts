export interface ContractSourceFile {
  language: string
  name: string
  content: string
}

export interface Contract {
  sourceCode: ContractSourceFile[]
  name: string
  optimizationUsed?: string
  compilerVersion?: string
  evmVersion: string
  // TODO
  abi: any
}

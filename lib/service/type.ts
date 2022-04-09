export interface Contract {
  sourceCode: string
  name: string
  optimizationUsed?: string
  compilerVersion?: string
  evmVersion: string
  // TODO
  abi: any
}

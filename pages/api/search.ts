// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = Array<{
  name: string
  address: string
}>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const name = req.query.name as string
  const response = await fetch(
    'https://api.thegraph.com/subgraphs/name/amxx/eip721-subgraph',
    {
      headers: {
        accept: 'application/json, multipart/mixed',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'content-type': 'application/json',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="100", "Microsoft Edge";v="100"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      referrer:
        'https://api.thegraph.com/subgraphs/name/amxx/eip721-subgraph/graphql',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: `{"query":"{\\n  tokenRegistries(\\n  first: 10\\n   block: {number_gte: 14265068}\\n    where: {name_contains_nocase: \\"${name}\\"}\\n  ) {\\n    id\\n    supportsMetadata\\n    name\\n    symbol\\n  }\\n}","variables":null,"extensions":{"headers":null}}`,
      method: 'POST',
    }
  )
  const result = await response.json()

  res.status(200).json(
    result.data.tokenRegistries.map((item: any) => ({
      name: item.name,
      address: item.id,
    }))
  )
}

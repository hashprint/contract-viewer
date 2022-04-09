import { PageContainer } from 'components/PageContainer'
import type { NextPage } from 'next'

const Error: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  return (
    <PageContainer>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    </PageContainer>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

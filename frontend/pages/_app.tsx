import { RecoilRoot } from 'recoil'
import { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </UserProvider>
  )
}

export default MyApp

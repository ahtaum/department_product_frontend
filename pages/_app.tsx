import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import PageWithLayoutType from '@/types/PageWithLayouts'
import { ReactElement } from 'react'

type AppLayoutProps = AppProps & {
  Component: PageWithLayoutType
  pageProps: any
}

export default function App({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.layout || ((children: ReactElement) => {children})

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

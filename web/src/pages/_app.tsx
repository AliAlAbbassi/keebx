import type { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import React, { ReactNode } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { CLIENT } from '../../env';

const client = new ApolloClient({
    uri: CLIENT,
    cache: new InMemoryCache(),
    credentials: 'include'
})

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
    Component,
    pageProps,
}: AppLayoutProps) => {
    const getLayout = Component.getLayout || ((page: ReactNode) => page);
    return getLayout(
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp
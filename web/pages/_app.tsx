import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react'
import { createGlobalStyle } from 'styled-components';
import Layout from '../components/Layout';

const GlobalStyle = createGlobalStyle`
        html{
            margin:0;
            padding: 0;
        }

        body{
            min-height:100vh;
            margin: 0;
        }
`
const theme = {
    colors: {
        primary: "#fafafa",
    },
}

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <GlobalStyle />
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp
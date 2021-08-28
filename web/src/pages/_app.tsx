import type { NextComponentType } from 'next';
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
    Component,
    pageProps,
}: AppLayoutProps) => {
    const getLayout = Component.getLayout || ((page: ReactNode) => page);
    return getLayout(
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
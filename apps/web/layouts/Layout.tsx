import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { ReactElement } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from '../components/NavBar';
import { CLIENT } from '../env';

interface LayoutProps {
  layoutType?: 'Default' | 'Keyboard' | 'NoBgColor';
  children: ReactElement;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  layoutType = 'Default',
}) => {
  const client = new ApolloClient({
    uri: CLIENT,
    cache: new InMemoryCache(),
    credentials: 'include',
  });

  if (layoutType === 'Keyboard') {
    return (
      <ApolloProvider client={client}>
        <LayoutContainerKeyboard>
          <GlobalStyle />
          <NavBar withSpaceBar={true} />
          <main>{children}</main>
        </LayoutContainerKeyboard>
      </ApolloProvider>
    );
  }

  if (layoutType === 'NoBgColor') {
    return (
      <ApolloProvider client={client}>
        <LayoutContainer>
          <GlobalStyle />
          <NavBar withSpaceBar={false} />
          <main>{children}</main>
        </LayoutContainer>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <LayoutContainer>
        <GlobalStyle />
        <NavBar withSpaceBar={false} />
        <main>{children}</main>
      </LayoutContainer>
    </ApolloProvider>
  );
};

const GlobalStyle = createGlobalStyle`
      html{
        margin:100;
      padding: 0;
      }

      body{
        min-height: 100vh;
      margin: 0;
      }
      `;

const LayoutContainer = styled.div`
  background: rgb(0, 139, 246);
  background: linear-gradient(
    0deg,
    rgba(0, 139, 246, 1) 0%,
    rgba(0, 245, 255, 1) 50%,
    rgba(0, 255, 136, 1) 100%
  );
  width: 100vw;
  margin: 0px;
`;

const LayoutContainerKeyboard = styled.div`
  width: 100vw;
  margin: 0px;
`;

export default Layout;

import React from 'react'
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from './NavBar'

interface LayoutProps {
  layoutType: 'Default' | 'Keyboard'
}

const Layout: React.FC<LayoutProps> = ({ children, layoutType = 'Default' }) => {
  if (layoutType === 'Keyboard') {
    return (
      <LayoutContainer>
        <GlobalStyle />
        <NavBar withSpaceBar={true} />
        <main>{children}</main>
      </LayoutContainer>
    )
  }

  return (
    <LayoutContainer>
      <GlobalStyle />
      <NavBar withSpaceBar={false} />
      <main>{children}</main>
    </LayoutContainer>
  );
}

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

const LayoutContainer = styled.div`
  background: rgb(0,139,246);
  background: linear-gradient(0deg, rgba(0,139,246,1) 0%, rgba(0,245,255,1) 50%, rgba(0,255,136,1) 100%);
  width: 100vw;
  margin: 0px;
`

export default Layout
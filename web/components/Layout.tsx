import React from 'react'
import styled from 'styled-components';
import NavBar from './NavBar'

interface LayoutProps {

}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <NavBar />
      <main>{children}</main>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  background: rgb(0,139,246);
  background: linear-gradient(0deg, rgba(0,139,246,1) 0%, rgba(0,245,255,1) 50%, rgba(0,255,136,1) 100%);
  width: 100vw;
  margin: 0px;
`

export default Layout
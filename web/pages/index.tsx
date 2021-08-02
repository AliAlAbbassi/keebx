import React from 'react'
import styled from 'styled-components';
import { HomeNav } from '../components/HomeNav';
import { MainHeader } from '../components/MainHeader';

interface indexProps {

}

const index: React.FC<indexProps> = ({ }) => {
  return (
    <Container>
      <MainHeader />
      <HomeNav />
    </Container>
  );
}

const Container = styled.div`
  font-family: 'Segoe UI';
  height: 55vh;
`
export default index
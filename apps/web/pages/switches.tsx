import React from 'react';
import styled from 'styled-components';
import { Links, Options } from '../data';
import { SideBar } from '../components/SideBar';
import Layout from '../layouts/Layout';
import { NextLayoutComponentType } from './_app';

const switches: NextLayoutComponentType = () => {
  return (
    <Container>
      <SideBar Links={Links} Options={Options} />
      <ProductsSectionContainer>
        {/* <ProductsSection /> */}
        no switches
      </ProductsSectionContainer>
    </Container>
  );
};

const ProductsSectionContainer = styled.div`
  grid-column: span 2;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  height: 100%;
  height: 89.5vh;
  font-family: 'Segoe UI';
`;

switches.getLayout = (page) => <Layout layoutType="Keyboard">{page}</Layout>;

export default switches;

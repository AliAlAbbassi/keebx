import { NextLayoutComponentType } from 'next';
import React from 'react';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import { SideBar } from '../components/SideBar';
import { ProductsSection } from '../components/ProductsSection';
import { Links, Options } from '../data';

interface keyboardProps {
}

const keyboard: NextLayoutComponentType<keyboardProps> = ({ }) => {
    return (
        <Container>
            <SideBar Links={Links} Options={Options} />
            <ProductsSectionContainer>
                <ProductsSection />
            </ProductsSectionContainer>
        </Container>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    height: 100%;
    height: 89.5vh;
    font-family: 'Segoe UI';
`
const ProductsSectionContainer = styled.div`
    grid-column: span 2;
`

keyboard.getLayout = (page) => (
    <Layout layoutType='Keyboard'>
        {page}
    </Layout>
)
export default keyboard
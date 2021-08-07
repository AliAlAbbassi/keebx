import React from 'react'
import styled from 'styled-components';
import { KeebsQuery } from '../generated/graphql';
import { ProductCard } from './ProductCard';

interface ProductsSectionProps {
    keebs: KeebsQuery
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ keebs }) => {
    return (
        <Container>
            {keebs.keebs?.map((keeb) => (
                <ProductCard key={keeb.id} keeb={keeb} />
            ))}
        </Container>
    )
}

const Container = styled.div`
    
`
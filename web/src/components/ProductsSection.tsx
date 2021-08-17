import React from 'react'
import styled from 'styled-components';
import { KeebsQuery, useAsksQuery } from '../generated/graphql';
import { ProductCard } from './ProductCard';

interface ProductsSectionProps {
    keebs: KeebsQuery
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ keebs }) => {
    return (
        <Container>
            {keebs.keebs?.map((keeb) => {
                const { data } = useAsksQuery({
                    variables: {
                        keebId: keeb.id
                    }
                })
                let price: number = 0
                data?.asks?.map((ask) => {
                    if (ask.keebId === keeb.id) price = ask.askPrice
                })
                return (
                    <ProductCard key={keeb.id} keeb={keeb} price={price} />
                )
            })}
        </Container>
    )
}

const Container = styled.div`
    
`
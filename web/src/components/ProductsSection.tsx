import React from 'react';
import styled from 'styled-components';
import { KeebsQuery, useLastSaleQuery, useLowestAskQuery } from '../generated/graphql';
import { ProductCard } from './ProductCard';

interface ProductsSectionProps {
    keebs: KeebsQuery
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ keebs }) => {
    return (
        <Container>
            {keebs.keebs?.map((keeb) => {
                const { data } = useLastSaleQuery({
                    variables: {
                        keebId: keeb.id
                    }
                })

                const { data: askPrice } = useLowestAskQuery({
                    variables: {
                        keebId: keeb.id
                    }
                })
                return (
                    <ProductCard key={keeb.id} keeb={keeb} price={data?.lastSale?.salePrice! || askPrice?.lowestAsk?.askPrice!} />
                )
            })}
        </Container>
    )
}

const Container = styled.div`
    
`
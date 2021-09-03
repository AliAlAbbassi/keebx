import React from 'react';
import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { KeebsQuery, useLastSaleQuery, useLowestAskQuery } from '../generated/graphql';
import { RootState } from '../redux/store';
import { ProductCard } from './ProductCard';

const mapState = (state: RootState) => ({
    price: state.filterData.price,
    greaterThan: state.filterData.greaterThan
})

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>

interface ProductsSectionProps extends PropsFromRedux {
    keebs: KeebsQuery
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ keebs, price, greaterThan }) => {
    useEffect(() => {
        console.log('price', price)
    }, [price])
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
                const realPrice = data?.lastSale?.salePrice! || askPrice?.lowestAsk?.askPrice!

                if (greaterThan) {
                    if (price <= realPrice) {
                        return (
                            <ProductCard key={keeb.id} keeb={keeb} price={realPrice} />
                        )
                    }
                } else {
                    if (price >= realPrice) {
                        return (
                            <ProductCard key={keeb.id} keeb={keeb} price={realPrice} />
                        )
                    }
                }
            })}
        </Container>
    )
}

const Container = styled.div`
    
`

export default connector(ProductsSection)
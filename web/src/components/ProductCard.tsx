import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';
import { Keeb } from '../generated/graphql';

interface ProductCardProps {
    keeb: Keeb
    price: number
}

export const ProductCard: React.FC<ProductCardProps> = ({ keeb, price }) => {
    const router = useRouter()
    return (
        <Container onClick={() => router.push(`/Keeb/${keeb.id}`)}>
            <Media src={keeb.imageUrl} />
            <Title>{keeb.title}</Title>
            <DescContainer>
                <Ticker>#{keeb.ticker}</Ticker>
                <Price>${price}</Price>
            </DescContainer>
        </Container>
    )
}

const Container = styled.div`
    background-color: #e4e4e4;
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Media = styled.img` 
   width : 200px;
`

const Title = styled.p`
    font-size: 20px;
    margin: 0px;
    padding: 5px;
    font-weight: 500;
    cursor: pointer;
`
const DescContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    font-size: 17px;
`

const Ticker = styled.div`
    opacity: 75%;
    margin: 3px;
`
const Price = styled.div`
    color: black;
    margin: 3px;
`
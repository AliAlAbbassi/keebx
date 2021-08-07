import React from 'react'
import styled from 'styled-components';
import { Keeb } from '../generated/graphql';

interface ProductCardProps {
    keeb: Keeb
}

export const ProductCard: React.FC<ProductCardProps> = ({ keeb }) => {
    return (
        <Container>
            <Media src={keeb.imageUrl} />
            <Title>{keeb.title}</Title>
            <DescContainer>
                <Ticker>{keeb.ticker}</Ticker>
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
`
const DescContainer = styled.div`
    
`

const Ticker = styled.div`
    
`

const Description = styled.div`
    
`
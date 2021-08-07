import React from 'react'
import styled from 'styled-components';

interface DiscoverProps {
    keebs: Keeb[]
}

type Keeb = {
    title: string
    imageUrl: string
    ticker: string
    condition: string
    authenticity: Number
    switches: string[]
    createdAt: Date
    updatedAt: Date
}


export const Discover: React.FC<DiscoverProps> = ({ keebs }) => {
    return (
        <DiscoverContainer>
            {keebs.map((keeb) => {
                return (
                    <DiscoverCard key={keeb.ticker}>
                        <DiscoverMedia src={keeb.imageUrl} />
                        <DiscoverTitle>{keeb.title}</DiscoverTitle>
                    </DiscoverCard>
                )
            })}
        </DiscoverContainer >
    );
}

const DiscoverContainer = styled.div`
    display: grid;
    gap: 1rem;
    margin-left: 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    margin-top: 20px;
`

const DiscoverCard = styled.div`
    background-color: #ebebeb;
`

const DiscoverMedia = styled.img`
    width: 200px;
    /* aspect-ratio: 9 / 16; */
    /* border: 2px solid black; */
    box-shadow: 1px solid black;
`

const DiscoverTitle = styled.p`
    text-decoration: none;
    margin: 10px;
    font-weight: 500;
`
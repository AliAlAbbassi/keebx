import { NextLayoutComponentType } from 'next'
import React from 'react'
import styled from 'styled-components'
import { useKeebQuery } from '../../generated/graphql'
import Layout from '../../layouts/Layout'
import { useGetIntId } from '../../utils/useGetIntId'

interface KeebProps {
}

const Keeb: NextLayoutComponentType<KeebProps> = ({ }) => {
    const { data, loading } = useKeebQuery({
        variables: {
            id: useGetIntId()
        }
    })

    if (loading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <Container>
            <h1>{data?.keeb?.title}</h1>
            <DetailsContainer>
                <DetailsStyle>Condition: {data?.keeb?.condition}</DetailsStyle>
                <DetailsStyle>|</DetailsStyle>
                <DetailsStyle>ticker: #{data?.keeb?.ticker}</DetailsStyle>
                <DetailsStyle>|</DetailsStyle>
                <DetailsStyle>authenticity: {data?.keeb?.authenticity}</DetailsStyle>
            </DetailsContainer>
            <Media src={data?.keeb?.imageUrl} />
        </Container>
    )
}

const Container = styled.div`
    font-family: 'Segoe UI';
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 24%;
    margin: 0;
    padding: 0;
`

const DetailsStyle = styled.p`
    opacity: 75%;
    font-size: 18px;
`

const Media = styled.img`
    width: 30%;
`

Keeb.getLayout = (page) => (
    <Layout layoutType='NoBgColor'>
        {page}
    </Layout>
)

export default Keeb
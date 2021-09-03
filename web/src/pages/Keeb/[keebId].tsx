import { NextLayoutComponentType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
// import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from 'recharts'
import styled from 'styled-components'
import { useHighestBidQuery, useKeebQuery, useLastSaleQuery, useLowestAskQuery } from '../../generated/graphql'
import Layout from '../../layouts/Layout'
import { useGetIntId } from '../../utils/useGetIntId'

interface KeebProps {
}

const Keeb: NextLayoutComponentType<KeebProps> = ({ }) => {
    const router = useRouter()
    const idForUrl = useGetIntId()

    const { data, loading } = useKeebQuery({
        variables: {
            id: useGetIntId()
        }
    })

    const { data: lastSale } = useLastSaleQuery({ variables: { keebId: useGetIntId() } })
    const { data: highestBid } = useHighestBidQuery({ variables: { keebId: useGetIntId() } })
    const { data: lowestAsk } = useLowestAskQuery({ variables: { keebId: useGetIntId() } })
    // const { data: sales } = useSalesQuery({ variables: { keebId: useGetIntId() } })

    if (loading) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <Container>
            <RouteStyle>Home / keebs / #{data?.keeb?.ticker}</RouteStyle>
            <h1>{data?.keeb?.title}</h1>
            <DetailsContainer>
                <DetailsStyle>Condition: {data?.keeb?.condition}</DetailsStyle>
                <DetailsStyle>ticker: #{data?.keeb?.ticker}</DetailsStyle>
                <DetailsStyle>authenticity: {data?.keeb?.authenticity}%</DetailsStyle>
            </DetailsContainer>
            <BidAskMediaContainer>
                <PriceContainer>
                    <BidLowestAskContainer>
                        <LowestAsk>Lowest Ask: ${lowestAsk?.lowestAsk?.askPrice || 0}</LowestAsk>
                        <BidContainer
                            onClick={() => {
                                router.push(`/buy/${idForUrl}`)
                            }}
                        >
                            <BidBoldText>Buy or Bid</BidBoldText>
                        </BidContainer>
                    </BidLowestAskContainer>
                    <AskHighestBidContainer>
                        <HighestBid>Highest Bid: ${highestBid?.highestBid?.bidPrice || 0}</HighestBid>
                        <AskContainer
                            onClick={() => {
                                router.push(`/sell/${idForUrl}`)
                            }}
                        >
                            <AskBoldText>Sell or Ask</AskBoldText>
                        </AskContainer>
                    </AskHighestBidContainer>
                    <DetailContainer>
                        <LastSaleStyle>Last Sale: </LastSaleStyle>
                        <DetailsBoldStyle>${lastSale?.lastSale?.salePrice}</DetailsBoldStyle>
                    </DetailContainer>
                </PriceContainer>
                <Media src={data?.keeb?.imageUrl} />
            </BidAskMediaContainer>
            {/* <DetailsBoldStyle>Sales history</DetailsBoldStyle>
            <LineChart
                width={400}
                height={400}
                data={sales?.sales!}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="name" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
            </LineChart> */}
        </Container>
    )
}

const Container = styled.div`
    font-family: 'Segoe UI';
    width: 80%;
    margin: auto;
    padding: 0;
`

const DetailsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 26%;
    margin-top: -20px;
    padding: 0;
`

const DetailContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 24%;
`

const DetailsStyle = styled.p`
    opacity: 60%;
    font-size: 13px;
    border: 1px solid #8B8B8B; 
    padding: 5px;
    border-radius: 12px;
`

const LastSaleStyle = styled.p`
    opacity: 60%;
    font-size: 18px;
`

const DetailsBoldStyle = styled.p`
    font-size: 25px;
    margin-left: 7px;
    font-weight: 600;
`

const RouteStyle = styled.p`
    opacity: 75%;
    font-size: 15px;
`

const PriceContainer = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
`

const BidAskMediaContainer = styled.div`
    display: flex;
`

const BidLowestAskContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 75%;
    margin-bottom: 20px;
`

const LowestAsk = styled.div`
    font-weight: 600;
    font-size: 20px;
`

const AskHighestBidContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 75%;
`

const HighestBid = styled.div`
    font-weight: 600;
    font-size: 20px;
`

const BidContainer = styled.button`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #006340;
    border-radius: 10px;
    border: 0.5px solid black;
    box-shadow: 5px 10px solid black;
    width: 11vw;
    height: 7vh;
    cursor: pointer;
`

const BidBoldText = styled.p`
    font-family: 'Segoe UI';
    font-size: 20px;
    font-weight: 700;
    color: white;
    text-shadow: 10px;
`

const AskContainer = styled.button`
    display: flex;
    padding: 7px;
    justify-content: space-evenly;
    align-items: center;
    background-color: #ff5a5f;
    border-radius: 10px;
    border: 0.5px solid black;
    box-shadow: 5px 10px solid black;
    width: 11vw;
    height: 7vh;
    cursor: pointer;
`

const AskBoldText = styled.p`
    font-family: 'Segoe UI';
    font-size: 20px;
    font-weight: 700;
    color: white;
    text-shadow: 10px;
`

const Media = styled.img`
    width: 50%;
`

Keeb.getLayout = (page) => (
    <Layout layoutType='NoBgColor'>
        {page}
    </Layout>
)

export default Keeb
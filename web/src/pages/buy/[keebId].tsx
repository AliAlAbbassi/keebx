import { Form, Formik } from "formik";
import { NextLayoutComponentType } from "next";
import { useState } from "react";
import styled from "styled-components";
import { InputField } from "../../components/InputField";
import { useAsksQuery, useLowestAskQuery } from "../../generated/graphql";
import Layout from "../../layouts/Layout";
import { useGetIntId } from "../../utils/useGetIntId";


interface BuyKeebProps { }

const BuyKeeb: NextLayoutComponentType<BuyKeebProps> = ({ }) => {
    const [BidTextDecoration, setBidTextDecoration] = useState('underline')
    const [BuyTextDecoration, setBuyTextDecoration] = useState('none')
    const [switchOption, setSwitchOption] = useState<'bid' | 'buy'>('bid')

    // data
    const { data: LowestAskData } = useLowestAskQuery({ variables: { keebId: useGetIntId() } })

    return (
        <Container>
            <SwitcherContainer>
                <Bid style={{ textDecoration: BidTextDecoration }} onClick={() => {
                    setBuyTextDecoration('none')
                    setBidTextDecoration('underline')
                    setSwitchOption('bid')
                }}>Bid</Bid>
                <Buy style={{ textDecoration: BuyTextDecoration }} onClick={() => {
                    setBuyTextDecoration('underline')
                    setBidTextDecoration('none')
                    setSwitchOption('buy')
                }}>Buy</Buy>
            </SwitcherContainer>
            {switchOption === 'bid' ? (
                <Formik initialValues={{ bidPrice: 0 }} onSubmit={(v) => console.log(v)}>
                    <Form>
                        <InputField
                            name='bid'
                            placeholder='Enter bid'
                        />
                    </Form>
                </Formik>
            ) : (
                <AsksContainer>
                    {LowestAskData?.lowestAsk?.askPrice ? (
                        <p>{LowestAskData?.lowestAsk?.askPrice}</p>
                    ) : (
                        <p>no asks available</p>
                    )}
                </AsksContainer>
            )
            }

        </Container >
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Segoe UI';
`

const SwitcherContainer = styled.div`
    display: flex;
    justify-content: center;
`

const Buy = styled.p`
    margin-left: 10px;
    font-size: 20px;
    cursor: pointer;
`

const Bid = styled.p`
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
`

const AsksContainer = styled.div``


BuyKeeb.getLayout = (page) => (
    <Layout layoutType='NoBgColor'>
        {page}
    </Layout>
)

export default BuyKeeb
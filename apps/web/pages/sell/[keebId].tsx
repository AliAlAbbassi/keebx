import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import { InputField } from '../../components/InputField';
import { useHighestBidQuery, useLowestAskQuery } from '../../generated/graphql';
import Layout from '../../layouts/Layout';
import { useGetIntId } from '../../utils/useGetIntId';
import { Fatoora } from '../../components/Fatoora';
import { NextLayoutComponentType } from '../_app';

const SellKeeb: NextLayoutComponentType = () => {
  const [AskTextDecoration, setAskTextDecoration] = useState('underline');
  const [SellTextDecoration, setSellTextDecoration] = useState('none');
  const [switchOption, setSwitchOption] = useState<'ask' | 'sell'>('ask');

  const [warning, setWarning] = useState('none');

  const [askPrice, setAskPrice] = useState(0);

  // data
  const { data: highestBidData } = useHighestBidQuery({
    variables: { keebId: useGetIntId() },
  });

  return (
    <Container>
      <SwitcherContainer>
        <Ask
          style={{ textDecoration: AskTextDecoration }}
          onClick={() => {
            setSellTextDecoration('none');
            setAskTextDecoration('underline');
            setSwitchOption('ask');
          }}
        >
          Ask
        </Ask>
        <Sell
          style={{ textDecoration: SellTextDecoration }}
          onClick={() => {
            setSellTextDecoration('underline');
            setAskTextDecoration('none');
            setSwitchOption('sell');
          }}
        >
          Sell
        </Sell>
      </SwitcherContainer>
      {switchOption === 'ask' ? (
        <>
          <Formik
            initialValues={{ askPrice: '' }}
            onSubmit={(v) => {
              if (parseFloat(v.askPrice) < 25) {
                setWarning('You must meet the minimum Ask of $25');
              } else {
                setWarning('lessgo');
                setAskPrice(parseFloat(v.askPrice)!);
              }
            }}
            enableReinitialize
          >
            <Form>
              <InputField name="askPrice" placeholder="Enter ask (in USD)" />
            </Form>
          </Formik>
          {warning === 'none' ? null : (
            <>
              {warning === 'lessgo' ? (
                <Fatoora askPrice={askPrice} bidPrice={0} />
              ) : (
                <p>{warning}</p>
              )}
            </>
          )}
        </>
      ) : (
        <AsksContainer>
          {highestBidData?.highestBid?.bidPrice ? (
            <div>
              <p>Highest Bid: ${highestBidData?.highestBid?.bidPrice}</p>
              <Fatoora
                bidPrice={highestBidData.highestBid.bidPrice}
                askPrice={0}
              />
            </div>
          ) : (
            <p>no asks available</p>
          )}
        </AsksContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI';
`;

const SwitcherContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Sell = styled.p`
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const Ask = styled.p`
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const AsksContainer = styled.div``;

SellKeeb.getLayout = (page) => <Layout layoutType="NoBgColor">{page}</Layout>;

export default SellKeeb;

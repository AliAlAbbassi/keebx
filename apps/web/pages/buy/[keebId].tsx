import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import { InputField } from '../../components/InputField';
import { useLowestAskQuery } from '../../generated/graphql';
import Layout from '../../layouts/Layout';
import { useGetIntId } from '../../utils/useGetIntId';
import { Fatoora } from '../../components/Fatoora';
import { NextLayoutComponentType } from '../_app';

const BuyKeeb: NextLayoutComponentType = () => {
  const [BidTextDecoration, setBidTextDecoration] = useState('underline');
  const [BuyTextDecoration, setBuyTextDecoration] = useState('none');
  const [switchOption, setSwitchOption] = useState<'bid' | 'buy'>('bid');

  const [warning, setWarning] = useState('none');

  const [bidPrice, setBidPrice] = useState(0);

  // data
  const { data: LowestAskData } = useLowestAskQuery({
    variables: { keebId: useGetIntId() },
  });

  return (
    <Container>
      <SwitcherContainer>
        <Bid
          style={{ textDecoration: BidTextDecoration }}
          onClick={() => {
            setBuyTextDecoration('none');
            setBidTextDecoration('underline');
            setSwitchOption('bid');
          }}
        >
          Bid
        </Bid>
        <Buy
          style={{ textDecoration: BuyTextDecoration }}
          onClick={() => {
            setBuyTextDecoration('underline');
            setBidTextDecoration('none');
            setSwitchOption('buy');
          }}
        >
          Buy
        </Buy>
      </SwitcherContainer>
      {switchOption === 'bid' ? (
        <>
          <Formik
            initialValues={{ bidPrice: '' }}
            onSubmit={(v) => {
              if (parseFloat(v.bidPrice) < 25) {
                setWarning('You must meet the minimum Bid of $25');
              } else {
                setWarning('lessgo');
                setBidPrice(parseFloat(v.bidPrice)!);
              }
            }}
            enableReinitialize
          >
            <Form>
              <InputField name="bidPrice" placeholder="Enter bid (in USD)" />
            </Form>
          </Formik>
          {warning === 'none' ? null : (
            <>
              {warning === 'lessgo' ? (
                <Fatoora bidPrice={bidPrice} askPrice={0} />
              ) : (
                <p>{warning}</p>
              )}
            </>
          )}
        </>
      ) : (
        <AsksContainer>
          {LowestAskData?.lowestAsk?.askPrice ? (
            <div>
              <p>{LowestAskData?.lowestAsk?.askPrice}</p>
              <Fatoora
                bidPrice={LowestAskData.lowestAsk.askPrice}
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

const Buy = styled.p`
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const Bid = styled.p`
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const AsksContainer = styled.div``;

const FatooraContainer = styled.div``;

BuyKeeb.getLayout = (page) => <Layout layoutType="NoBgColor">{page}</Layout>;

export default BuyKeeb;

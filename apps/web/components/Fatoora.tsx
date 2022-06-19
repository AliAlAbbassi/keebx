import React from 'react';
import styled from 'styled-components';

interface FatooraProps {
  bidPrice: number;
  askPrice: number;
}

export const Fatoora: React.FC<FatooraProps> = ({ bidPrice, askPrice }) => {
  const getProcessingFees = () => 2;

  const getTotal = (arr: number[]) => {
    console.log(arr);
    let s = 0;
    arr.map((v) => {
      s += v;
    });
    return s;
  };

  return (
    <Container>
      <FatooraField>
        <FatooraFieldTitle>Processing fees:</FatooraFieldTitle>
        <FatooraFieldPrice>${getProcessingFees()}</FatooraFieldPrice>
      </FatooraField>
      <FatooraField>
        <FatooraFieldTitle>Shipping fees:</FatooraFieldTitle>
        <FatooraFieldPrice>$30</FatooraFieldPrice>
      </FatooraField>
      <FatooraField>
        <FatooraFieldTitle>Total</FatooraFieldTitle>
        <FatooraFieldPrice style={{ fontWeight: 'bold', fontSize: '19px' }}>
          ${getTotal([getProcessingFees(), 30, bidPrice, askPrice])}
        </FatooraFieldPrice>
      </FatooraField>
    </Container>
  );
};

const Container = styled.div``;

const FatooraField = styled.div`
  display: flex;
  justify-content: space-between;
  width: 17vw;
  border-bottom: 0.1px dotted black;
`;

const FatooraFieldTitle = styled.p`
  font-size: 18px;
`;

const FatooraFieldPrice = styled.p`
  @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
  font-size: 18px;
  font-family: 'Lato', sans-serif;
`;

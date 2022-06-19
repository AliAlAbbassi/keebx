import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import styled from 'styled-components';

interface HomeNavProps {}

export const HomeNav: React.FC<HomeNavProps> = ({}) => {
  const [underlineFirst, setUnderlineFirst] = useState('3px solid black');
  const [underlineSecond, setUnderlineSecond] = useState('');
  const [underlineThird, setUnderlineThird] = useState('');
  const [underlineIV, setUnderlineIV] = useState('');
  const [underlineV, setUnderlineV] = useState('');

  const router = useRouter();

  const handleFirst = () => {
    setUnderlineFirst('3px solid black');
    setUnderlineSecond('');
    setUnderlineThird('');
    setUnderlineIV('');
    setUnderlineV('');
    router.push('/');
  };

  const handleSecond = () => {
    setUnderlineFirst('');
    setUnderlineSecond('3px solid black');
    setUnderlineThird('');
    setUnderlineIV('');
    setUnderlineV('');
    router.push('/keyboard');
  };

  const handleThird = () => {
    setUnderlineFirst('');
    setUnderlineSecond('');
    setUnderlineThird('3px solid black');
    setUnderlineIV('');
    setUnderlineV('');
    router.push('/keycaps');
  };

  const handleIV = () => {
    setUnderlineFirst('');
    setUnderlineSecond('');
    setUnderlineThird('');
    setUnderlineIV('3px solid black');
    setUnderlineV('');
    router.push('./switches');
  };
  const handleV = () => {
    setUnderlineFirst('');
    setUnderlineSecond('');
    setUnderlineThird('');
    setUnderlineIV('');
    setUnderlineV('3px solid black');
    router.push('./custom');
  };

  return (
    <Container>
      <Option style={{ borderBottom: underlineFirst }} onClick={handleFirst}>
        DISCOVER
      </Option>
      <Option style={{ borderBottom: underlineSecond }} onClick={handleSecond}>
        KEYBOARD
      </Option>
      <Option style={{ borderBottom: underlineThird }} onClick={handleThird}>
        KEYCAPS
      </Option>
      <Option onClick={handleIV} style={{ borderBottom: underlineIV }}>
        SWITCHES
      </Option>
      <Option style={{ borderBottom: underlineV }} onClick={handleV}>
        CUSTOM
      </Option>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 270px;
  font-weight: 600;
`;
const Option = styled.div`
  font-size: 25px;
  cursor: pointer;
`;

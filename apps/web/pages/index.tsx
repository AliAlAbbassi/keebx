import { NextLayoutComponentType } from './_app';
import React from 'react';
import styled from 'styled-components';
import { Discover } from '../components/Discover';
import { HomeNav } from '../components/HomeNav';
import Layout from '../layouts/Layout';
import { MainHeader } from '../components/MainHeader';
import { useKeebsQuery } from '../generated/graphql';

const Index: NextLayoutComponentType = () => {
  const { data, loading } = useKeebsQuery();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <MainHeader />
      <HomeNav />
      {data ? (
        <Discover keebs={data.keebs} />
      ) : (
        <>No keyboards listed on the exchange</>
      )}
    </Container>
  );
};

Index.getLayout = (page) => <Layout>{page}</Layout>;

const Container = styled.div`
  font-family: 'Segoe UI';
  height: 55vh;
`;
export default Index;

import { NextLayoutComponentType } from 'next';
import React from 'react'
import styled from 'styled-components';
import { Discover } from '../components/Discover';
import { HomeNav } from '../components/HomeNav';
import Layout from '../layouts/Layout';
import { MainHeader } from '../components/MainHeader';
import { useKeebsQuery } from '../generated/graphql';

interface indexProps {

}


const index: NextLayoutComponentType<indexProps> = ({ }) => {
  const { data, loading } = useKeebsQuery()

  if (loading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <Container>
      <MainHeader />
      <HomeNav />
      <Discover keebs={data?.keebs!} />
    </Container>
  )
}

index.getLayout = (page) => (
  <Layout layoutType='Default'>
    {page}
  </Layout>
)

const Container = styled.div`
  font-family: 'Segoe UI';
  height: 55vh;
`
export default index
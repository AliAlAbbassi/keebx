import { NextLayoutComponentType } from 'next';
import React from 'react'
import styled from 'styled-components';
import { Discover } from '../components/Discover';
import { HomeNav } from '../components/HomeNav';
import Layout from '../layouts/Layout';
import { MainHeader } from '../components/MainHeader';

interface indexProps {

}

const mockData = [
  {
    title: 'cyberboard',
    imageUrl: 'https://c1.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fill,w_695,g_auto,q_auto,dpr_2.6,f_auto,h_460/viq2avvzy7k98mrv8jsl',
    ticker: '',
    condition: 'New',
    authenticity: 100,
    switches: ['yeet'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: 'boring bad keys',
    imageUrl: 'https://icdn.digitaltrends.com/image/digitaltrends/razer-huntsman-quartz-edition-mechanical-gaming-keyboard-2.jpg',
    ticker: 'BADKEYS',
    condition: 'New',
    authenticity: 100,
    switches: ['yeet', 'nice yeet', 'cool yeet'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const index: NextLayoutComponentType<indexProps> = ({ }) => {
  return (
    <Container>
      <MainHeader />
      <HomeNav />
      <Discover keebs={mockData} />
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
import { NextLayoutComponentType } from 'next';
import React from 'react'
import Layout from '../layouts/Layout';

interface keycapsProps {

}

const keycaps: NextLayoutComponentType<keycapsProps> = ({ }) => {
    return (
        <div>keycaps page</div>
    );
}

keycaps.getLayout = (page) => (
    <Layout layoutType='Keyboard'>
        {page}
    </Layout>
)

export default keycaps
import { NextLayoutComponentType } from 'next';
import React from 'react'
import Layout from '../layouts/Layout';

interface switchesProps {

}

const switches: NextLayoutComponentType<switchesProps> = ({ }) => {
    return (
        <div>switches page</div>
    );
}

switches.getLayout = (page) => (
    <Layout layoutType='Keyboard'>
        {page}
    </Layout>
)

export default switches
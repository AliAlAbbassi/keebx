import { NextLayoutComponentType } from 'next';
import React from 'react';
import Layout from '../components/Layout';

interface keyboardProps {
}

const keyboard: NextLayoutComponentType<keyboardProps> = ({ }) => {
    return (
        <div>keyboard page</div>
    );
}


keyboard.getLayout = (page) => (
    <Layout layoutType='Keyboard'>
        {page}
    </Layout>
)
export default keyboard
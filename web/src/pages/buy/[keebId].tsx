import { NextLayoutComponentType } from "next";
import Layout from "../../layouts/Layout";
import { useGetIntId } from "../../utils/useGetIntId";

interface BuyKeebProps {
}

const BuyKeeb: NextLayoutComponentType<BuyKeebProps> = ({ }) => {
    return (
        <div>buy keeb: {useGetIntId()}</div>
    )
}

BuyKeeb.getLayout = (page) => (
    <Layout layoutType='NoBgColor'>
        {page}
    </Layout>
)

export default BuyKeeb
import { Box } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { NextLayoutComponentType } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';
import { InputField } from '../components/InputField';
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql';
import Layout from '../layouts/Layout';
import { toErrorMap } from '../utils/toErrorMap';

interface registerProps {

}

interface FormValues {
    email: string
    username: string
    password: string
}

const register: NextLayoutComponentType<registerProps> = ({ }) => {
    const router = useRouter()
    const initialValues: FormValues = { email: '', username: '', password: '' }
    const [register] = useRegisterMutation()

    return (
        <Container>
            <Formik initialValues={initialValues} onSubmit={async (value, { setErrors }) => {
                const response = await register({
                    variables: { options: value },
                    update: (cache, { data }) => {
                        cache.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                                __typename: 'Query',
                                me: data?.register.user
                            }
                        })
                        if (response.data?.register.errors) {
                            setErrors(toErrorMap(response.data.register.errors));
                        } else if (response.data?.register.user) {
                            // worked
                            router.push("/");
                        }
                    }
                })
            }}>
                <FormContainer>
                    <Box mb={5}>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                            fontsize={23}
                        />
                    </Box>
                    <Box mb={5}>
                        <InputField
                            name="email"
                            placeholder="email"
                            label="Email"
                            fontsize={23}
                        />
                    </Box>
                    <InputField
                        name="password"
                        placeholder="password"
                        label="Password"
                        fontsize={23}
                    />
                    <ButtonStyle type='submit'>register</ButtonStyle>
                </FormContainer>
            </Formik>
        </Container>
    )
}

const FormContainer = styled(Form)`
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: 100px;
            padding: 0px 600px;
            `
const ButtonStyle = styled.button`
            font-size: 17px;
            padding: 5px;
            background-color:#00f7ff;
            width: 100px;
            margin-top: 20px;
            `

register.getLayout = (page) => (
    <Layout layoutType='NoBgColor'>
        {page}
    </Layout>
)

const Container = styled.div`
            font-family: 'Segoe UI';
            height: 55vh;
            `
export default register
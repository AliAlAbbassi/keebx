import { Box } from '@chakra-ui/layout';
import { Form, Formik } from 'formik';
import { NextLayoutComponentType } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';
import { InputField } from '../components/InputField';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import Layout from '../layouts/Layout';
import { toErrorMap } from '../utils/toErrorMap';

interface loginProps {

}

const login: NextLayoutComponentType<loginProps> = ({ }) => {
    const router = useRouter();
    const [login] = useLoginMutation();

    return (
        <Container>
            <Formik
                initialValues={{ usernameOrEmail: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login({
                        variables: values,
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: "Query",
                                    me: data?.login.user,
                                },
                            });
                            cache.evict({ fieldName: "posts:{}" });
                        },
                    });
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
                        if (typeof router.query.next === "string") {
                            router.push(router.query.next);
                        } else {
                            // worked
                            router.push("/");
                        }
                    }
                }
                }
            >
                <FormContainer>
                    <InnerForm>
                        <Box mb={10}>
                            <InputFieldStyle
                                name="usernameOrEmail"
                                placeholder="username or email"
                                label="Username or Email"
                                fontsize={23}
                            />
                        </Box>
                        <InputFieldStyle
                            name="password"
                            placeholder="password"
                            label='Password'
                            fontsize={23}
                        />
                        <ButtonsContainer>
                            <ButtonStyle type='submit'>login</ButtonStyle>
                            <ButtonStyle onClick={() => router.push('/forgot-password')}>forgot password</ButtonStyle>
                        </ButtonsContainer>
                    </InnerForm>
                </FormContainer>
            </Formik>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    font-family: 'Segoe UI';
`

const FormContainer = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 100px;
`

const ButtonStyle = styled.button`
    font-size: 17px;
    padding: 5px;
    background-color:#00f7ff;
`

const ButtonsContainer = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
`

const InnerForm = styled.div`
    margin: auto auto;
`

const InputFieldStyle = styled(InputField)`
    font-size: 25px;
`

login.getLayout = (page) => (
    <Layout layoutType='NoBgColor'>
        {page}
    </Layout>
)

export default login
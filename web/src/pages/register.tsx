import { Field, Form, Formik } from 'formik';
import { NextLayoutComponentType } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';
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
                <Form>
                    <Field id='email' name='email' placeholder='email' />
                    <Field id='username' name='username' placeholder='username' />
                    <Field id='password' name='password' placeholder='password' />
                    <button type='submit'>submit</button>
                </Form>
            </Formik>
        </Container>
    )
}

register.getLayout = (page) => (
    <Layout layoutType='Default'>
        {page}
    </Layout>
)

const Container = styled.div`
  font-family: 'Segoe UI';
  height: 55vh;
`
export default register
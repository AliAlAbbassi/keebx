import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react'
import styled from 'styled-components';
import { MeDocument, MeQuery, useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

interface loginProps {

}

export const login: React.FC<loginProps> = ({ }) => {
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
                <Form>
                    <Field id='usernameOrEmail' placeholder='username or email' label='Username or Email' />
                    <Field id='password' placeholder='password' label='password' />
                    <button onClick={() => router.push('/forgot-password')}>forgot password</button>
                    <button type='submit'>login</button>
                </Form>
            </Formik>
        </Container>
    );
}

const Container = styled.div`
    
`
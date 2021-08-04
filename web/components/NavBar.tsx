import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react'
import styled from 'styled-components'

interface NavBarProps {
    withSpaceBar: boolean
}

interface FormValues {
    searchQuery: string
}

const NavBar: React.FC<NavBarProps> = ({ withSpaceBar = false }) => {
    const initialValues: FormValues = { searchQuery: '' }
    const router = useRouter()

    if (withSpaceBar) {
        return (
            <NavContainer>
                <Logo onClick={() => router.push('/')}>KeebX</Logo>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        console.log({ values, actions })
                        actions.resetForm()
                    }}
                >
                    <Form>
                        {/* <Field id='searchQuery' name='searchQuery' placeholder='search' /> */}
                        <SearchBar id='searchQuery' name='searchQuery' placeholder='search' />
                    </Form>
                </Formik>
                <SecondContainer>
                    <Option>Browse</Option>
                    <Option>Login</Option>
                    <Option>Sign Up</Option>
                    <LastOption>Sell</LastOption>
                </SecondContainer>
            </NavContainer>
        );
    }

    return (
        <NavContainer>
            <Logo onClick={() => router.push('/')}>KeebX</Logo>
            <SecondContainer>
                <Option>Browse</Option>
                <Option>Login</Option>
                <Option>Sign Up</Option>
                <LastOption>Sell</LastOption>
            </SecondContainer>
        </NavContainer>
    );
}

const NavContainer = styled.div({
    display: 'flex',
    fontFamily: 'Segoe UI',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0px 25px',
    height: '60px'
})

const Logo = styled.p({
    fontSize: '45px',
    color: 'black',
    fontWeight: 'bold',
    textShadow: '0px 2px 2px white',
    textDecoration: 'none',
    cursor: 'pointer'
})

const SecondContainer = styled.div({
    display: 'flex',
})

const Option = styled.p`
    margin-right: 20px;
    font-size: 20px;
    color: #242424;
    text-decoration: none;
    cursor: pointer;
`

const LastOption = styled.p`
    font-size: 20px;
    color: #242424;
`
const SearchBar = styled(Field)`
    font-size: 30px;
    border: 1px solid black;
    padding: 7px;
    width: 500px;
    color: black;
    background-color: white;
    ::placeholder {
        color: black;
    }
`

export default NavBar
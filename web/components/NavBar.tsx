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
            <NavContainerWithColor>
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
            </NavContainerWithColor>
        )
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
    )
}

const NavContainer = styled.div({
    display: 'flex',
    fontFamily: 'Segoe UI',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0px 25px',
    height: '60px'
})

const NavContainerWithColor = styled.div`
    display: flex;
    font-family: 'Segoe UI';
    justify-content: space-between;
    align-items: center;
    /* margin: 0px 25px; */
    padding: 10px 25px;
    height: 60px;
    background: rgb(0,139,246);
    background: linear-gradient(0deg, rgba(0,139,246,1) 0%, rgba(0,245,255,1) 50%, rgba(0,255,136,1) 100%);
`

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
    font-size: 15px;
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
import React from 'react'
import styled from 'styled-components';
import { Field, Form, Formik } from 'formik'

interface MainHeaderProps {

}

interface FormValues {
    searchQuery: string
}

export const MainHeader: React.FC<MainHeaderProps> = ({ }) => {
    const initialValues: FormValues = { searchQuery: '' }
    return (
        <MainHeaderContainer>
            <MainHeading>Trading Keebs</MainHeading>
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
        </MainHeaderContainer >
    );
}

const MainHeaderContainer = styled.div`
  width : 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const MainHeading = styled.p`
  font-size: 50px;
  font-weight: bold;
  color: white;
  background-color: black;
  text-align: center;
  width: fit-content;
  height: fit-content;
  padding: 5px; 
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
import { Field, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';

interface SideBarProps {
    Links: {
        title: string
        url: string
    }[]

    Options: {
        title: string
        options: string[]
    }[]
}

interface FormValues {
    fieldOption: string
}

export const SideBar: React.FC<SideBarProps> = ({ Links, Options }) => {
    const router = useRouter()
    const initialValues: FormValues = { fieldOption: '' }
    const handleSubmit = (e: any) => {
        console.log('submit event', e)
    }
    return (
        <Container>
            <SideBarContainer>
                <LinksContainer>
                    {Links.map(({ title, url }) => (
                        <LinksText key={url} onClick={() => router.push(url)}>{title}</LinksText>
                    ))}
                </LinksContainer>
                <OptionsContainer>
                    {Options.map(({ options, title }) => (
                        <Formik key={title} initialValues={initialValues} onSubmit={handleSubmit}>
                            <OptionContainer key={title}>
                                <OptionsTitle key={title}>{title}</OptionsTitle>
                                <OptionForm key={title}>
                                    {
                                        options.map((option: string) => (
                                            <label key={option}>
                                                <OptionsText key={option} type='checkbox' name={option} value={option} />
                                                {option}
                                            </label>
                                        ))
                                    }
                                </OptionForm>
                            </OptionContainer>
                        </Formik>
                    ))}
                </OptionsContainer>
            </SideBarContainer>
        </Container >
    )
}

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const SideBarContainer = styled.div`

`

const LinksText = styled.p`
    font-weight: 600;
    font-size: 20px;
    max-height: 0px;
    text-decoration: none;
    cursor: pointer;
`
const LinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const OptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 15px;
`
const OptionsTitle = styled.p`
    font-weight: 600;
    font-size: 20px;
    max-height: 0px;
    text-decoration: none;
    cursor: default;
`
const OptionsText = styled(Field)`
    font-weight: 600;
    font-size: 15px;
    max-height: 0px;
    text-decoration: none;
    cursor: pointer;
    opacity: 80%;
`

const OptionForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
`
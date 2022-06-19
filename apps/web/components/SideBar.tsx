import { Field, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setPriceFilter } from '../redux/actions';
import { AppDispatch } from '../redux/store';

interface SideBarProps {
    Links: {
        title: string
        url: string
    }[]

    Options: {
        title: string
        options: {
            id: number
            price: number
            greaterThan: boolean
        }[]
    }[]
}

interface FormValues {
    fieldOption: string
}

export const SideBar: React.FC<SideBarProps> = ({ Links, Options }) => {
    const dispatch: AppDispatch = useDispatch()

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
                                        options.map(({ greaterThan, id, price }) => {
                                            if (greaterThan) {
                                                return (
                                                    <label key={id}>
                                                        <OptionsText key={id} type='checkbox' name={'' + id} value={'' + id} onClick={() => {
                                                            dispatch(setPriceFilter('Keeb', 300, true))
                                                        }} />
                                                        ${price}+
                                                    </label>
                                                )
                                            }
                                            return (
                                                <label key={id}>
                                                    <OptionsText key={id} type='checkbox' name={'' + id} value={'' + id} onClick={() => {
                                                        switch (id) {
                                                            case 0:
                                                                dispatch(setPriceFilter('Keeb', 50, false))
                                                                break
                                                            case 1:
                                                                dispatch(setPriceFilter('Keeb', 100, false))
                                                            case 2:
                                                                dispatch(setPriceFilter('Keeb', 200, false))
                                                                break
                                                        }
                                                    }} />
                                                    ${price}
                                                </label>
                                            )
                                        })
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
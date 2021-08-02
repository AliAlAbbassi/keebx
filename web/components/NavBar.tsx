import React from 'react'
import styled from 'styled-components'

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({ }) => {
    return (
        <NavContainer>
            <Logo>KeebX</Logo>
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
    textShadow: '0px 2px 2px white'
})

const SecondContainer = styled.div({
    display: 'flex',
})

const Option = styled.p`
    margin-right: 20px;
    font-size: 20px;
    color: #242424;
`

const LastOption = styled.p`
    font-size: 20px;
    color: #242424;
`

export default NavBar
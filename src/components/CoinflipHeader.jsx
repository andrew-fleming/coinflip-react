import React, { Component } from 'react'
import logo from '../logo.png'
import styled from 'styled-components'

const Header = styled.div`
    background-color: #a9a9a9;
    min-height: 15vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const H1 = styled.h1`
    font-size: 3rem;
    fold-weight: bold;
    color: #f5f5f5;
    text-shadow: 2px 2px pink;
`;

const Img = styled.img`
    height: 4rem;
    width: 3.4rem;
    pointer-events: none;
`;


export default class CoinflipHeader extends Component {
    render() {
        return (
            <Header>
                <Img src={logo} alt='ethereum logo' />
                <H1>Coinflip Dapp</H1>
            </Header>
        )
    }
}
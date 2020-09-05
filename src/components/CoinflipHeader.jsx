import React, { Component } from 'react'
import styled from 'styled-components'

const Header = styled.div`
    background-color: #a9a9a9;
    min-height: 15vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const H1 = styled.h1`
    font-size: 3rem;
    fold-weight: bold;
    color: white;
    text-shadow: 2px 2px pink;
`;



export default class CoinflipHeader extends Component {
    render() {
        return (
            <Header>
                <H1>Coinflip Dapp</H1>
            </Header>
        )
    }
}
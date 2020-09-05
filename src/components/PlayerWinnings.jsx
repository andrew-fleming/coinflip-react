import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Div = styled.div`
    margin-top: 1rem;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    `;

export default class PlayerWinnings extends Component {
    render() {

        const winningsMessage = "Your Winnings:"

        return (
            <Container>
                <Div>
                {winningsMessage}
                <div>Insert Balance</div>
                </Div>
            </Container>
        )
    }
}
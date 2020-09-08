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

const Button = styled.button`
    background-color: green;
    height: 3rem;
    width: 9rem;
`;

export default class PlayerWinnings extends Component {


    render() {

        const winningsMessage = "Your Winnings: "
        const withdrawMessage = "Withdraw All!"

        return (
            <Container>
                <Div>
                {winningsMessage}
                 <div>{this.props.winningsBalance}</div>
                <Button>{withdrawMessage}</Button>
                </Div>
            </Container>
        )
    }
}
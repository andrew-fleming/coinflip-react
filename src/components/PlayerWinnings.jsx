import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    color: #a9a9a9;
    text-shadow: 1.2px 1.2px #35281B;
`;

const Div = styled.div`
    margin-top: 1rem;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center
    `;

const Button = styled.button`
    font-size: 1rem;
    font-weight: bolder;
    background-color: green;
    height: 3rem;
    width: 9rem;
    cursor: pointer;
`;

export default function PlayerWinnings(props) {

        const winningsMessage = "Your ETH Winnings: "
        const withdrawMessage = "Withdraw All!"

        return (
            <Container>
                <Div>
                {winningsMessage}
                 <div>{props.winningsBalance}</div>
                <Button onClick={props.userWithdrawal} >{withdrawMessage}</Button>
                </Div>
            </Container>
        )
}
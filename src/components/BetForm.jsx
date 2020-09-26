import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    color: #a9a9a9;
    text-shadow: 1.2px 1.2px #35281B;
`;

const SpanText = styled.span`
    font-size: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export default function BetForm(props) {
        const betText = "Place Your Bet"

        return (
            <Container>
                <SpanText>{betText}</SpanText>
                
            </Container>
        )
    }
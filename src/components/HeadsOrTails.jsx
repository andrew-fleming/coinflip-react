import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin-top: 8rem;
`;

const HeadsButton = styled.button`
    padding: .5rem;
    font-size: 1rem;
    margin-right: .5rem;
`;

const TailsButton = styled.button`
    padding: .5rem;
    font-size: 1rem;
`;

export default class HeadsOrTails extends Component {

    render() {
        return (
            <Container>
                <HeadsButton>Heads</HeadsButton>
                <TailsButton>Tails</TailsButton>
            </Container>
        )
    }
}
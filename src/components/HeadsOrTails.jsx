import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin-top: 1rem;
`;

const HeadsButton = styled.button`
    padding: .5rem;
    font-size: 1rem;
    margin-right: .5rem;
    color: #35281B;
    text-shadow: 1px 1px pink;
    background-color: #a9a9a9;
    font-weight: bolder;
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
`;

const TailsButton = styled.button`
    padding: .5rem;
    font-size: 1rem;
    color: #35281B;
    text-shadow: 1px 1px #a9a9a9;
    background-color: pink;
    font-weight: bolder;
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
`;

export default class HeadsOrTails extends Component {

    render() {

        return (
            <Container>
                <HeadsButton onClick={(event) => {
                    event.preventDefault()
                    
                    this.props.inputHeads()
                }}>Heads</HeadsButton>

                <TailsButton
                    onClick={(event) => {
                        event.preventDefault()

                        this.props.inputTails()
                    }}
                >Tails</TailsButton>
            </Container>
        )
    }
}
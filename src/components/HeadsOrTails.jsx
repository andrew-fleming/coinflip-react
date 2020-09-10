import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin-top: .5rem;
`;

const HeadsButton = styled.button`
    font-family: brush-script-mt,cursive;
    padding: .7rem;
    font-size: 2rem;
    margin-right: .5rem;
    color: #35281B;
    text-shadow: 1px 1px pink;
    background-color: #a9a9a9;
    font-weight: bolder;
    border-radius: 50%;
    width: 7rem;
    height: 7rem;
    box-shadow: 2px 2px black;
`;

const TailsButton = styled.button`
    font-family: brush-script-mt,cursive;
    padding: .7rem;
    font-size: 2rem;
    color: #35281B;
    text-shadow: 1px 1px #a9a9a9;
    background-color: pink;
    font-weight: bolder;
    border-radius: 50%;
    width: 7rem;
    height: 7rem;
    box-shadow: 2px 2px black;
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
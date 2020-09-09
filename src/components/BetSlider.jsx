import React, { Component } from 'react'
import styled from 'styled-components'

const SlideContainer = styled.div`
`;

const SpanText = styled.span`
    font-size: 2rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Slider = styled.div`
    margin-top: 1rem;
    display: flex;
    }
    
`;


export default class BetSlider extends Component {
    

    render() {

        const betText = "Place Your Bet"

        return (
            <SlideContainer>
                <SpanText>{betText}</SpanText>
                <Slider>
                
                </Slider>
                
            </SlideContainer>
        )
    }
}
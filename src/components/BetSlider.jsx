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

    & .slider {
        width: 15rem;
    }
`;

const DivAmount = styled.div`
    margin-top: 1rem;
    display: flex;
`;

export default class BetSlider extends Component {
    state = {
        value: 5
    }

    handleOnChange = (event) => {
        this.setState({value: event.target.value})
    }

    render() {

        const betText = "Place Your Bet"

        return (
            <SlideContainer>
                <SpanText>{betText}</SpanText>
                <Slider>
                    <input type="range" min={0} max={10} step=".001" value={this.state.value}
                    className="slider" onChange={this.handleOnChange} />
                </Slider>
                
                <DivAmount className="value">{this.state.value} ETH</DivAmount>
            </SlideContainer>
        )
    }
}
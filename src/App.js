import React, { Component } from 'react'
import Web3 from 'web3'
import styled from 'styled-components'
import './App.css'
import Navbar from './components/Navbar'
import CoinflipHeader from './components/CoinflipHeader'
import BetSlider from './components/BetSlider'
import HeadsOrTails from './components/HeadsOrTails'
import PlayerWinnings from './components/PlayerWinnings'


const Triangle = styled.div`
  position: relative;
  background: #35281B;
  height: 40vh;
  color: #a9a9a9;
  text-align: center;
  text-shadow: 1px 1px pink;
  font-size: 2rem;
`;

const TriangleBefore = styled.div`
content: '';
position: absolute;
bottom: 0;
width: 0;
height: 0;
border-style: solid;
border-width: 99px 99px 0 99px;
border-color: #35281B transparent transparent transparent;
left: 50%;
transform: translateX(-50%) translateY(100%);
`;

const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const accountBalanceText = 'Available ETH to win: -';

export default class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      isLoading: true,
    }
  }

  render() {
    let content;
    if(this.state.loading){
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = 
      <div>
        <CoinflipHeader/>
        <Triangle>{accountBalanceText}
          <TriangleBefore/>
        </Triangle>
        <Div>
          < BetSlider />
          < HeadsOrTails />
          < PlayerWinnings />
        </Div>
      </div>
    }

    return (
        <div>
          <Navbar account={this.state.account} />
          <>
            { content }
          </>
        </div>
      )
    }
  }
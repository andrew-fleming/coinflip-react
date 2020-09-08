import React, { Component } from 'react'
import Web3 from 'web3'
import Coinflip from './abis/Coinflip.json'
import styled from 'styled-components'
import './App.css'
import Navbar from './components/Navbar'
import CoinflipHeader from './components/CoinflipHeader'
import BetSlider from './components/BetSlider'
import HeadsOrTails from './components/HeadsOrTails'
import PlayerWinnings from './components/PlayerWinnings'


const Triangle = styled.div`
padding: 3.5rem;
  position: relative;
  background: #35281B;
  height: 10vh;
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
  justify-content: space-around;
`;

const CoinDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const accountBalanceText = 'Available ETH to win: ';

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

    //convert to ETH
    function tokens(n) {
      return web3.utils.fromWei(n);
    }

    //contract funds data
    const coinflipData = Coinflip.networks[networkId]
    if(coinflipData){
      const coinflip = new web3.eth.Contract(Coinflip.abi, coinflipData.address)
      this.setState({ coinflip })
      let contractBalance = await coinflip.methods.contractBalance().call()
      this.setState({ contractBalance: tokens(contractBalance.toString()) })
    } else {
      window.alert('Coinflip contract not deployed to detected network.')
    }

    const userFundsData = Coinflip.networks[networkId]
    if(userFundsData){
      const coinflip = new web3.eth.Contract(Coinflip.abi, userFundsData.address)
      this.setState({ coinflip })
      let winningsBalance = await coinflip.methods.winningsBalance().call()
      this.setState({ winningsBalance: tokens(winningsBalance.toString()) })
    } else {
      window.alert('User winnings not deployed on the network')
    }
    this.setState({ loading: false })
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

  /*instantiateContract() {
    const contract = require('truffle-contract')
    const coinflip = contract(Coinflip)
    let coinflipInstance
    coinflip.setProvider(this.state.web3.currentProvider)

    coinflip.deployed().then((instance) => {
      coinflipInstance = instance
      this.setState( {coinflip} )
    })
  }
  */

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      contractBalance: '0',
      winningsBalance: '0',
      //change loading once function to switch is up
      loading: true,
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
        <Triangle> {accountBalanceText} {this.state.contractBalance}
          <TriangleBefore/>
        </Triangle>
        <Div>
          < BetSlider />
          < PlayerWinnings winningsBalance={this.state.winningsBalance}/>
        </Div>
        <CoinDiv>
          < HeadsOrTails />
        </CoinDiv>
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
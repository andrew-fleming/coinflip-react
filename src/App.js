import React, { Component } from 'react'
import Web3 from 'web3'
import Coinflip from './abis/Coinflip.json'
import styled from 'styled-components'
import './App.css'
import Navbar from './components/Navbar'
import CoinflipHeader from './components/CoinflipHeader'
import BetForm from './components/BetForm'
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
  font-size: 2.3rem;
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

const BetCol = styled.div`
  display: flex;
  flex-direction: column; 
`;

const Input = styled.input`
  height: 2rem;
  width: 12rem;
  font-size: 1.5rem;
`;

const BottomDiv = styled.div`
  background: #f5f5f5;
  height: 47.6vh;
`;

const accountBalanceText = 'Available ETH to Win: ';

export default class App extends Component {

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    console.log(accounts)

    const networkId = await web3.eth.net.getId()

    //convert to ETH
    function tokens(n) {
      return web3.utils.fromWei(n);
    }

    //setting smart contract state
    const coinflipData = Coinflip.networks[networkId]
    if(coinflipData){
      const coinflip = new web3.eth.Contract(Coinflip.abi, coinflipData.address)
      this.setState({ coinflip })

      //fetching the contract balance and setting the state
      let contractBalance = await coinflip.methods.contractBalance().call()
      this.setState({ contractBalance: tokens(contractBalance.toString()) })
      
      //load userWinnings balance
      let winningsBalance = await coinflip.methods.winningsBalance().call()
      this.setState({ winningsBalance: tokens(winningsBalance.toString()) })
    } else {
      window.alert('Coinflip contract not deployed to detected network.')
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

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      contractBalance: '0',
      winningsBalance: '0',
      betAmount: '.01',
      loading: true,
    }

    this.flipTheCoin = this.flipTheCoin.bind(this)
    this.userWithdrawal = this.userWithdrawal.bind(this)
    this.inputHeads = this.inputHeads.bind(this)
    this.inputTails = this.inputTails.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  flipTheCoin(guess){
    this.setState({ loading: true })
    var web3 = new Web3(Web3.givenProvider)
    let bet = this.state.betAmount
    let config = {
      value: web3.utils.toWei(bet, 'ether'),
      from: this.state.account
    }
    this.state.coinflip.methods.flip(guess).send(config)
      .once('receipt', (receipt) => {
        this.handleRefresh()
        this.setState({ loading: false })
    })
  }

  inputHeads(){
    let guess = 0

    this.flipTheCoin(guess)
  }

  inputTails(){
    let guess = 1

    this.flipTheCoin(guess)
  }

  handleChange(event){
    this.setState({ betAmount: event.target.value })
  }

  handleRefresh(){
    this.componentDidMount()
  }

  userWithdrawal(){
    this.setState({ loading: true })
    var balance = this.state.winningsBalance
    this.state.coinflip.methods.withdrawWinnings().send(balance, { from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      this.componentDidMount()
    })
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
        <BottomDiv>
        <Div>
          <BetCol>
          < BetForm 
            />
            <Input type="text" placeholder="0-10 ETH"
            value = {this.state.value} onChange={this.handleChange}
            >
            </Input>
            
            </BetCol>
          < PlayerWinnings 
            winningsBalance={this.state.winningsBalance}
            userWithdrawal={this.userWithdrawal}
            />
        </Div>
        <CoinDiv>
          < HeadsOrTails 
            flipTheCoin={this.flipTheCoin}
            inputHeads={this.inputHeads}
            inputTails={this.inputTails}
            />
        </CoinDiv>
        </BottomDiv>
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
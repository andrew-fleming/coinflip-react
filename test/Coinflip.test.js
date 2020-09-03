const { default: Web3 } = require('web3')
const { assert } = require('chai')

const Coinflip = artifacts.require('Coinflip')
const truffleAssert = require('truffle-assertions')

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n){
    return web3.utils.toWei(n, 'ether')
}

contract('Coinflip', (accounts) => {

    let instance;

    before(async () => {
        instance = await Coinflip.deployed()
    })

    describe('Coinflip deployment', async () => {
        it('should fund the smart contract upon deployment', async () => {
           let balance = await instance.contractBalance();
           assert(balance == tokens('1'), 'contract did not receive funds upon deployment')
        })
    })

    describe('Adding funds function', async () => {
        it('should add funds to the contract', async () => {
            let balance = await instance.contractBalance();
            //add funds
            await instance.addFunds({value: tokens('.5'), from: accounts[0]});
            let newBalance = await instance.contractBalance();
            assert(newBalance == tokens('1.5'), 'addFunds function did not work');
        })
    })

    describe('Coinflip bets', async () => {
        it('should take funds from user', async () => {
            //before bet
            let userBalance = await web3.eth.getBalance(accounts[0]);
            await instance.flip(0, {value: tokens('.1')});
            //after bet
            let newUserBalance = await web3.eth.getBalance(accounts[0]);
            //userBalance is greater than bet b/c of gas fees
            assert(userBalance > newUserBalance + .1, 'funds were not taken from user account')            
        })
    
        it('should fund the player winnings balance', async () => {
            await instance.fundWinnings({value: tokens('.5')});
            let userBal = await instance.playerWinnings(accounts[0]);
            assert(userBal > 0, 'user winnings balance did not receive funds');
        })

        //test withdrawing from user winnings balance
        it('should withdraw user funds back to user address', async () => {
            await instance.fundWinnings({value: tokens('.5')});
            let oldUserBal = await web3.eth.getBalance(accounts[0]);
            await instance.withdrawWinnings();
            let newUserBal = await web3.eth.getBalance(accounts[0]);
            assert(oldUserBal < newUserBal, 'funds were not withdrawn properly');
        })
    })




})
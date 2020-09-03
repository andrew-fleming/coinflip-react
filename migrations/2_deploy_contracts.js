const { default: Web3 } = require("web3");

const Coinflip = artifacts.require("Coinflip");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Coinflip,{value: web3.utils.toWei("1", "ether")});
};
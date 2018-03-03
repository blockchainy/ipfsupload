import React, { Component } from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';

import CoinFlip from '../build/contracts/CoinFlipOracle.json';

var CoinFlipContract;

class CoinFlipComp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contractAddress: '',
    };
    this.initWeb3 = this.initWeb3.bind(this);
    this.deployContract = this.deployContract.bind(this);
    this.flipCoin = this.flipCoin.bind(this);
    this.getResult = this.getResult.bind(this);
    this.sendToContract = this.sendToContract.bind(this);
  }

  async initWeb3() {
    var web3;
    // var MyContract;
    if (typeof window.web3 !== 'undefined') {
      web3 = new Web3(window.web3.currentProvider);
      CoinFlipContract = contract(CoinFlip);

      // const account = await web3.eth.accounts;
      web3.eth.getAccounts((e, accounts) => {
        this.setState({ accounts })
        console.log(`Accounts ARE: ${accounts}`);

        CoinFlipContract.defaults({
          from: accounts[0],
          gas: 4476768,
          gasPrice: 1000000000
        })
      });

      CoinFlipContract.setProvider(web3.currentProvider);

      web3.version.getNetwork((e, result) => {
        console.log(`Web 3 version is: ${result}`);
      })
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  }

  async deployContract() {
    let contractInstance = await CoinFlipContract.new()
    let contractAddress = contractInstance.address;
    this.setState({ contractAddress })
  }

  async flipCoin() {
    let contractInstance = await CoinFlipContract.at(this.state.contractAddress);
    await contractInstance.flipCoin({ value: 10000000000000000 });
    var event = contractInstance.Log();
    event.watch(function (error, result) {
      if (!error) {
        console.log(result.args.text);
      } else {
        console.log(error);
      }
    })
  }

  async getResult() {
    let contractInstance = await CoinFlipContract.at(this.state.contractAddress);
    let thing = await contractInstance.getResult();
    console.log(`Result of coin flip is: ${thing.toString()}`);
    console.log(`Type is ${typeof thing}`);
  }

  async sendToContract() {
    let contractInstance = await CoinFlipContract.at(this.state.contractAddress);
    await contractInstance.sendIntoContract({ value: 11316492883057000 })
  }

  componentWillMount() {
    this.initWeb3();
  }

  render() {
    return (
      <div>
        <button onClick={this.deployContract}>
          Deploy
                </button>
        <button onClick={this.flipCoin}>
          Flip
                </button>
        <button onClick={this.getResult}>
          Get result
                </button>
        <button onClick={this.sendToContract}>
          Send to contract
                </button>
        <br />
        Contract address: {this.state.contractAddress}
        <br />
      </div>
    )
  }
}

export default CoinFlipComp;




import React, { Component } from 'react';
import Web3 from 'web3';
import contract from 'truffle-contract';

import HelloWorld from '../build/contracts/TicketSale.json';


var MyContract;

class Test extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '',
            contractAddress: '',
            message: '',
            value: 2000000000000000000
        };
        this.initWeb3 = this.initWeb3.bind(this);
        this.deployContract = this.deployContract.bind(this);
        this.sendShit = this.sendShit.bind(this);
    }

    async initWeb3() {
        var web3;
        // var MyContract;
        if (typeof window.web3 !== 'undefined') {
            web3 = new Web3(window.web3.currentProvider);
            MyContract = contract(HelloWorld);

            // const account = await web3.eth.accounts;
            web3.eth.getAccounts((e, accounts) => {
                this.setState({ accounts })
                console.log(`Accounts ARE: ${accounts}`);

                MyContract.defaults({
                    from: accounts[0],
                    gas: 4712388,
                    gasPrice: 1000000000
                })
            });

            MyContract.setProvider(web3.currentProvider);

            web3.version.getNetwork((e, result) => {
                console.log(`Web 3 version is: ${result}`);
            })
        } else {
            console.log('No web3? You should consider trying MetaMask!')
            web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            console.log(`Connected to localhost:8545 or testrpc`);
        }
    }

    async deployContract() {
       MyContract.new().then(instance => {
           console.log(instance.address);
       })

    }

    async sendShit() {
        let contractInstance = await MyContract.at(this.state.contractAddress)
        await contractInstance.sendMoney({value: this.state.value})        
    }

    componentWillMount() {
        this.initWeb3();
    }

    render() {
        return (
            <div>
                <button onClick={this.deployContract}>
                    boom
                </button>
                <button onClick={this.sendShit}>
                send
                </button>
                <br/>
                Contract address: {this.state.contractAddress} 
                <br/>
                Message: {this.state.message}
            </div>
        )
    }
}

export default Test;




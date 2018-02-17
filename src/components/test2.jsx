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
            message: ''
        };
        this.initWeb3 = this.initWeb3.bind(this);
        this.deployContract = this.deployContract.bind(this);
    }

    // async loads the accounts and networks
    async initWeb3() {
      var web3;
      
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

//   async deployContract() {
//     let contractInstance = await MyContract.new()
//     let contractAddress = await contractInstance.getContractAddress();
//     this.setState({ contractAddress })
//     let ownerAddress = await contractInstance.getOwner();
//     this.setState({ ownerAddress });
//     contractInstance.setSupply(this.state.supply)
//     contractInstance.setName(this.state.name)
//     contractInstance.setPrice(this.fromUsdToWei(this.state.price))
//     contractInstance.setTime(this.state.time)
//     contractInstance.setAfterMarket(this.state.afterMarket)
//     // store in wei for db
//     const price = this.fromUsdToWei(this.state.price);
//     this.setState({ price })
    
//     let res = await axios.post('http://localhost:1337/updateDB', {
//       // passing your url to your express server
//       address: this.state.contractAddress,
//       name: this.state.name,
//       price: this.state.price,
//       supply: this.state.supply,
//       time: this.state.time,
//       afterMarket: this.state.afterMarket
//     })

//     console.log(`RESPONSE SHIT SHOULD BE THIS: ${res}`);
// }

    async deployContract() {
        MyContract.new().then(async (i) => {
            console.log(await i.getCurrentAddress());
        });

        // let contractInstance = await MyContract.new();
        // let contractAddress = await contractInstance.getCurrentAddress();

        // let contractInstance = await MyContract.new();
        // const address = await contractInstance.getCurrentAddress()
        // const owner = await contractInstance.getOwner()
        // console.log(`address: ${address}`);
        // console.log(`owner: ${owner}`);
    }


    componentWillMount() {
        this.initWeb3();
    }

    componentWillUpdate() {

    }

    render() {
        return (
            <div>
                <button onClick={this.deployContract}>
                    boom
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




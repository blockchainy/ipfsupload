const Web3 = require('web3');
const contract = require('truffle-contract');

const TicketSale = require('../build/contracts/TicketSale.json');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var MyContract = contract(TicketSale);

MyContract.defaults({
    from: '0x6349bc081075f0d9dc8968d6c4098a8ff0856f4d',
    gas: 4712388,
    gasPrice: 100000000000
})

MyContract.setProvider(provider);


let contractInstance;
MyContract.at('0xef00959e0979f2341a83c444073838e80248c447')
    .then(instance => {
        contractInstance = instance;
        return contractInstance.numberOfTicketFromAddress('0x06ab63440bac2adb3ffbe072edd5dfd3e91a3759')    
    })
    .then(numberOfTickets => {
        console.log(`Number of tickets: ${numberOfTickets}`);
    })
    .catch(error => {
        console.log(`${error}`);
    })




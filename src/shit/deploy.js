const Web3 = require('web3');
const contract = require('truffle-contract');

const TicketSale = require('../build/contracts/HelloWorld.json');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var MyContract = contract(TicketSale);

MyContract.defaults({
    from: '0x6349bc081075f0d9dc8968d6c4098a8ff0856f4d',
    gas: 4712388,
    gasPrice: 100000000000
})

MyContract.setProvider(provider);


async function createContract() {
    let contractInstance = await MyContract.new()
    let creator = await contractInstance.getCreator();
    let message = await contractInstance.getMessage();
    console.log(`Old Message is ${message}`);    
    await contractInstance.setMessage('ASADFHSJ');
    message = await contractInstance.getMessage();
    console.log(`New Message is ${message}`);    
    console.log(`Creator is ${creator}`);
}

function createContract1() {
    let contractInstance;
    MyContract.new()
        .then(instance => {
            contractInstance = instance;
            return contractInstance.getCreator()
        })
        .then(creator => {
            console.log(`Creator is ${creator}`);
            return contractInstance.getMessage();
        })
        .then(oldMessage => {
            console.log(`Old message is: ${oldMessage}`);
            contractInstance.setMessage('ASDFGH')
            return contractInstance.getMessage();
        })
        .then(newMessage => {
            console.log(`New message is: ${newMessage}`);
        })
        .catch(error => console.log(error))

}

createContract();
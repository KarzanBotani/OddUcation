// const Web3 = require('web3'),
//       compiledFactory = require('./build/Factory.json');

// const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545'),
//       web3 = new Web3(provider);

// const deploy = async () => {

//   try {
//     const accounts = await web3.eth.getAccounts();

//     console.log('Attempting to deploy from account: ', accounts[0]);

//     const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
//       .deploy({ data: '0x' + compiledFactory.bytecode })
//       .send({ from: accounts[0], gas: '7183261' });

//     console.log('Contract deployed to: ', result.options.address);
//   } catch (error) {
//     console.log(error);
//   }
// };

// deploy();

const HDWalletProvider = require('truffle-hdwallet-provider'),
			Web3 = require('web3'),
			compiledFactory = require('./build/Factory.json');

let mnemonic = 'sea success hidden trophy scale flock surround ceiling mosquito ask bachelor tenant',
		network = 'https://rinkeby.infura.io/gjdTq0bMOY1RgmwUAci4';

const provider = new HDWalletProvider(mnemonic, network),
			web3 = new Web3(provider);

// write a function just to use async await
const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	// interface = aBI
	// result = instance of contract
	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ from: accounts[0], gas: '9999999999' });

	// record the address where the contract is deployed
	console.log('Contract deployed to: ', result.options.address);
	// console.log('Contract interface: ', compiledFactory.interface);
};

deploy();
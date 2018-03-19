const Web3 = require('web3'),
      compiledFactory = require('./build/Factory.json');

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545'),
      web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account: ', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '7183261' });

  console.log('Contract deployed to: ', result.options.address);
};

deploy();
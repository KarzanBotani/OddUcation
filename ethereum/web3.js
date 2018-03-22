// import Web3 from 'web3';

// let web3;

// if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//   web3 = new Web3(window.web3.currentProvider);
// } else {
//   const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
//   web3 = new Web3(provider);
// }

// export default web3;





import Web3 from 'web3'; // import constructor

// window is a global variable only available in the browser. Not on Node.js. When Next tries to handle the application, we don't have access to that variable.
// create an instance of the Web3 constructor

let web3;

// 1: check if window is defined
// 2:  check to see if metamask has already injected web3
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // we're now in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider); // we're hjiacking the provider and giving out our own version of web3.
}

else {
  // we are on the server, or the user does not have metamask
  // set up our own provider that works through Infura and give it to our.
  // create our own provider.
  const provider = new Web3.providers.HttpProvider(
    // pass in the URl to the Infura node we signed up for earlier
    // connect to the rinkeby network through infura
    // create our own provider that is rinkeby through Infura
    'https://rinkeby.infura.io/gjdTq0bMOY1RgmwUAci4'
  );
  web3 = new Web3(provider);
}

export default web3; // export the instance
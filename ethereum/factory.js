// instance of Factory
import web3 from './web3'; // get the instance
import Factory from './build/Factory.json';

// create instance of Factory
const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0xAf4Cb4eE4d38bad0ACeF7F6E37ab9EEFcd0DBEfe'
);

// export the instance
export default instance;
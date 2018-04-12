// instance of Factory
import web3 from './web3'; // get the instance
import Factory from './build/Factory.json';

// create instance of Factory
const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0xbCBBEA7f9896182800d7e2C03a167Dbce3aC40b2'
);

// export the instance
export default instance;
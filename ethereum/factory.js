// instance of Factory
import web3 from './web3'; // get the instance
import Factory from './build/Factory.json';

// create instance of Factory
const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0xcD4261541b617490848669b8B6BBC0eC60E739F9'
);

// export the instance
export default instance;
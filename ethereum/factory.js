// instance of Factory
import web3 from './web3'; // get the instance
import Factory from './build/Factory.json';

// create instance of Factory
const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0x5c6fa0ac31af82f4b98188de573abc37e597fb8f'
);

// export the instance
export default instance;
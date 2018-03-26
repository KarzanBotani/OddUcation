// instance of Factory
import web3 from './web3'; // get the instance
import Factory from './build/Factory.json';

// create instance of Factory
const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0xf255861ad4eaba3e79f7473d010157cae369e238'
);

// export the instance
export default instance;
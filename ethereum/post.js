import web3 from "./web3";
import Post from "./build/Post.json";

export default address => {
  return new web3.eth.Contract(
    JSON.parse(Post.interface),
    address
  );
};

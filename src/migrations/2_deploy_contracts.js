var CoinFlip = artifacts.require("./CoinFlipOracle.sol");

module.exports = function(deployer) {
  deployer.deploy(CoinFlip);
};

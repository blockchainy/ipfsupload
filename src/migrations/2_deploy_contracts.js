var HelloWorld = artifacts.require("./Test.sol");

module.exports = function(deployer) {
  deployer.deploy(HelloWorld);
};

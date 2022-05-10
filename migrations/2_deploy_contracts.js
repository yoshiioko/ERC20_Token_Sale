var MyToken = artifacts.require("MyToken.sol");

module.exports = async function (deployer) {
  await deployer.deploy(MyToken, 1_000_000_000);
};

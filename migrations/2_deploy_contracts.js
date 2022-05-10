var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");

module.exports = async function (deployer) {
  let addr = await web3.eth.getAccounts();

  await deployer.deploy(MyToken, 1_000_000_000);
  await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);

  let tokenInstance = await MyToken.deployed();

  await tokenInstance.transfer(MyTokenSale.address, 1_000_000_000);
};

const Token = artifacts.require("MyToken");

const chai = require("./chaisetup");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({ path: "../.env" });

contract("Token Test", async (accounts) => {
  const [initialHolder, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    this.instance = await Token.new(process.env.INITIAL_TOKENS);
  });

  it("All tokens should be in my account", async () => {
    let totalSupply = await this.instance.totalSupply();
    return expect(
      this.instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  it("I can send tokens from Account 1 to Account 2", async () => {
    const sendTokens = 1;
    let totalSupply = await this.instance.totalSupply();
    await expect(
      this.instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
    await expect(this.instance.transfer(recipient, sendTokens)).to.eventually.be
      .fulfilled;
    await expect(
      this.instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    return expect(
      this.instance.balanceOf(recipient)
    ).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });

  it("It's not possible to send more tokens than account 1 has", async () => {
    let balanceOfAccount = await this.instance.balanceOf(initialHolder);

    await expect(
      this.instance.transfer(recipient, new BN(balanceOfAccount + 1))
    ).to.eventually.be.rejected;

    return expect(
      this.instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  });
});

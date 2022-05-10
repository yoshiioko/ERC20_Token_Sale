pragma solidity ^0.6.0;

import "./Crowdsale.sol";

contract MyTokenSale is Crowdsale {
    KycContract kyc;

    constructor(uint256 rate, address payable wallet, IERC20 token) Crowdsale(rate, wallet, token) {}
}

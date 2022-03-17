//SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

interface IERC20 {

    /*
    * Returns the total token supply
    */
    function totalSupply() external view returns (uint256);

    /*
    * Returns the account balance of another account
    * @param _owner - address of the account whose balance we want to know
    */
    function balanceOf(address _owner) external view returns (uint256);

    /*
    * Transfers amount of tokens to specified address
    * MUST fire the Transfer event
    * SHOULD throw if the message caller’s account balance does not have enough tokens to spend
    * @param _to - address where we want to transfer tokens
    * @param _value - amount of tokens
    */
    function transfer(address _to, uint256 _value) external returns (bool);

    /*
    * Transfers amount of tokens from one address to another address
    * MUST fire the Transfer event
    * SHOULD throw unless the _from account has deliberately authorized the sender
    * @param _from - address from we want to transfer tokens
    * @param _to - address where we want to transfer tokens
    * @param _value - amount of transfer in Wei
    */
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool);

    /*
    * Allows to withdraw from your account multiple times
    * SHOULD make sure to create user interfaces in such a way that they set the allowance first to 0 before setting it to another value for the same spender
    * @param _spender - address that would be approved to withdraw from your account
    * @param _value - amount of tokens to approve
    */
    function approve(address _spender, uint256 _value) external returns (bool);

    /*
    * Returns the amount which is still allowed to withdraw from address
    * @param _owner - address that own contract
    * @param _spender - address that want to transfer tokens from contract
    */
    function allowance(address _owner, address _spender) external view returns (uint256);

    /*
    * MUST trigger when tokens are transferred, including zero value transfers
    * A token contract which creates new tokens SHOULD trigger a Transfer event with the address set to 0x0 when tokens are created
    * @param _from - address from which tokens are transfered
    * @param _to - address to which tokens are transfered
    * @param _value - amount of tokens
    */
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    /*
    * MUST trigger on any successful call to approve
    * @param _owner - address that own contract
    * @param _spender - address that would be approved to withdraw from your account
    * @param _value - amount of tokens to approve
    */
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);





}


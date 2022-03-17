//SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.13;

contract AccessControl {

    mapping (bytes32 => mapping(address => bool)) public roles;

    modifier onlyRole(bytes32 _role){
        require(roles[_role][msg.sender], "not authorized");
        _;
    }

    function _grantRole (bytes32 _role, address _account) internal {
        roles[_role][_account] = true;
        emit GrantRole(_role, _account);
    }

    function grantRole(bytes32 _role, address _account) external {
        require(roles[_role][msg.sender], "not authorized");
        _grantRole(_role, _account);
    }

    function revokeRole(bytes32 _role, address _account) external {
        require(roles[_role][msg.sender], "not authorized");
        roles[_role][_account] = false;
        emit RevokeRole(_role, _account);
    }

    event GrantRole(bytes32 indexed _role, address indexed _account);
    event RevokeRole(bytes32 indexed _role, address indexed _account); 

}
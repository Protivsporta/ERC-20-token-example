const { expect } = require("chai");
const { ethers } = require("hardhat");
const ADMIN = "0xdf8b4c520ffe197c5343c6f5aec59570151ef9a492f2c624fd45ddde6135ec42";

describe("ERC20", function() {
    let owner
    let sid
    let nancy
    let erc20

    beforeEach(async function() {
        [owner, sid, nancy] = await ethers.getSigners()
        const ERC20 = await ethers.getContractFactory("ERC20", owner)
        erc20 = await ERC20.deploy("CringeToken", "CRNG", 8, 1000000000)
        await erc20.deployed()
    })

    //ERC-20 contract Unit tests

    it("Should be deployed", async function() {
        expect(erc20.address).to.be.properAddress
    })

    it("Should return token name", async function() {
        expect(await erc20.name()).to.equal("CringeToken")
    })

    it("Should return token symbol", async function() {
        expect(await erc20.symbol()).to.equal("CRNG")
    })

    it("Should return token decimals", async function() {
        expect(await erc20.decimals()).to.equal(8)
    })

    it("Should return current balance of tokens by address and test that all initial tokens collected on owner address", async function() {
        expect(await erc20.balanceOf(owner.address)).to.equal(1000000000)
    })

    it("Should check that total supply of tokens equal initial amount", async function() {
        expect(await erc20.totalSupply()).to.equal(1000000000)
    })

    it("Should transfer 200 tokens to Sid and emit event Transfer", async function() {
        await expect(() => erc20.transfer(sid.address, 200))
        .to.changeTokenBalance(erc20, sid, 200)

        await expect(erc20.transfer(sid.address, 200))
        .to.emit(erc20, "Transfer")
        .withArgs(owner.address, sid.address, 200)

    })

    it("Should transfer 150 tokens from owner to Nancy and emit event Transfer", async function() {
        await erc20.approve(owner.address, 150)

        await expect(() => erc20.transferFrom(owner.address, nancy.address, 150))
        .to.changeTokenBalances(erc20, [owner, nancy], [-150, 150])

        await expect(erc20.transferFrom(owner.address, sid.address, 150))
        .to.emit(erc20, "Transfer")
        .withArgs(owner.address, sid.address, 150)

    })

    it("Should approve 250 tokens for Nancy from owner", async function() {
        await expect(erc20.approve(nancy.address, 250))
        .to.emit(erc20, "Approval")
        .withArgs(owner.address, nancy.address, 250)

        expect(await erc20.allowance(owner.address, nancy.address)).to.equal(250)
    })

    it("Should mint 300 tokens to Sid account and emit Mint event", async function() {
        await expect(() => erc20.mint(sid.address, 300))
        .to.changeTokenBalance(erc20, sid, 300)

        await expect(erc20.mint(sid.address, 300))
        .to.emit(erc20, "Mint")
        .withArgs(sid.address, 300)
    })

    it("Should burn 300 tokens from Nancy account and emit Burn event", async function() {
        await erc20.mint(nancy.address, 650)

        await expect(() => erc20.burn(nancy.address, 300))
        .to.changeTokenBalance(erc20, nancy, -300)

        await expect(erc20.burn(nancy.address, 300))
        .to.emit(erc20, "Burn")
        .withArgs(nancy.address, 300)        
    })

    it("Should return error message because balance of owner smaller then value of transfer", async function() {
        await expect(erc20.transfer(sid.address, 10000000000)).to.be.revertedWith("Amount of transaction is bigger then balance")
    })

    it("Should return error message because allowance of Sid is 0", async function() {
        await expect(erc20.transferFrom(sid.address, nancy.address, 200)).to.be.revertedWith("Amount of transaction is bigger then balance of allowance")
    })

    it("Should return error message because Sid don't have ADMIN role and can't mint tokens", async function() {
        await expect(erc20.connect(sid).mint(sid.address, 500)).to.be.revertedWith("not authorized")
    })

    it("Should return error message because Sid don't have ADMIN role and can't burn tokens", async function() {
        await expect(erc20.connect(sid).burn(sid.address, 500)).to.be.revertedWith("not authorized")
    })

    //Access control contract Unit tests

    it("Should return error message because Sid don't have ADMIN role and can't grant roles to another accounts", async function() {
        await expect(erc20.connect(sid).grantRole(ADMIN, sid.address)).to.be.revertedWith("not authorized")
    })

    it("Should return error message because Sid don't have ADMIN role and can't revoke roles from another accounts", async function() {
        await expect(erc20.connect(sid).revokeRole(ADMIN, sid.address)).to.be.revertedWith("not authorized")
    })

    it("Should grant ADMIN role to Sid account and emit GrantRole event", async function() {
        await expect(erc20.grantRole(ADMIN, sid.address))
        .to.emit(erc20, "GrantRole")
        .withArgs(ADMIN, sid.address)

        await expect(() => erc20.connect(sid).mint(sid.address, 300))
        .to.changeTokenBalance(erc20, sid, 300)
    })

    it("Should revoke ADMIN role from owner account and emit RevokeRole event", async function() {
        await expect(erc20.revokeRole(ADMIN, owner.address))
        .to.emit(erc20, "RevokeRole")
        .withArgs(ADMIN, owner.address)

        await expect(erc20.mint(owner.address, 300)).to.be.revertedWith("not authorized")
        
    })




})
task("mint", "Create amount of tokens on the address")
  .addParam("account", "Address to mint")
  .addParam("value", "Amount of tokens to mint")
  .setAction(async (taskArgs) => {
    const erc20 = await hre.ethers.getContractAt("ERC20", process.env.CONTRACT_ADDR);
    await erc20.mint(taskArgs.account, taskArgs.value);
    console.log(`${taskArgs.value} tokens minted to ${taskArgs.account}!`);
  });
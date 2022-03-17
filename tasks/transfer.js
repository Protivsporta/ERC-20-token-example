task("transfer", "Transfers amount of tokens to address")
  .addParam("to", "Address to transfer")
  .addParam("value", "Amount of tokens to transfer")
  .setAction(async (taskArgs) => {
    const erc20 = await hre.ethers.getContractAt("ERC20", process.env.CONTRACT_ADDR);
    await erc20.transfer(taskArgs.to, taskArgs.value);
    console.log(`${taskArgs.value} tokens transfered to ${to}!`);
  });
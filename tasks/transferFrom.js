task("transferFrom", "Transfers amount of tokens from one address to another address")
  .addParam("from", "Address from which we want to transfer tokens")
  .addParam("to", "Address to transfer")
  .addParam("value", "Amount of tokens to transfer")
  .setAction(async (taskArgs) => {
    const erc20 = await hre.ethers.getContractAt("ERC20", process.env.CONTRACT_ADDR);
    await erc20.transferFrom({
        _from: taskArgs.from,
        _to: taskArgs.to,
        _value: taskArgs.value
    });
    console.log(`${taskArgs.value} tokens transfered to ${to}!`);
  });
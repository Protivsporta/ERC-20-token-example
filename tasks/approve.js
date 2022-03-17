task("approve", "Allows address to withdraw from your account multiple times, up to the value amount")
  .addParam("spender", "Address that would be approved to withdraw from your account")
  .addParam("value", "Amount of tokens to approve")
  .setAction(async (taskArgs) => {
    const erc20 = await hre.ethers.getContractAt("ERC20", process.env.CONTRACT_ADDR);
    await erc20.approve({
        _spender: taskArgs.spender,
        _value: taskArgs.value
    });
    console.log(`${taskArgs.value} tokens was approved to ${spender}!`);
  });
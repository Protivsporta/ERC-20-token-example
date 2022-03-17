const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const [signer] = await ethers.getSigners();
  const ERC20 = await hre.ethers.getContractFactory("ERC20", signer);
  const erc20 = await ERC20.deploy("ValeryGorbunov", "VGCG", 8, 1000000000);

  await erc20.deployed();

  console.log("ERC20 deployed to:", erc20.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
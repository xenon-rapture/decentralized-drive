import { network } from "hardhat";

async function main() {
  console.log("Preparing to deploy to Sepolia...");

  // Hardhat 3 Magic: We pull 'ethers' directly from the active network connection!
  const { ethers } = await network.connect();

  const Upload = await ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.waitForDeployment();

  console.log(`SUCCESS! Contract deployed to: ${upload.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
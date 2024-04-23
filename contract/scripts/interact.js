const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// interact.js
const ethers = require("ethers");

// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  const message = await helloWorldContract.message();
  console.log("Message:", message);
  console.log("Updating message...");
  const tx = await helloWorldContract.update("well well well....");
  await tx.wait();

  const newMessage = await helloWorldContract.message();
  console.log("The new message is: " + newMessage);
}
main();

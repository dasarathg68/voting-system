const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const VOTING_CONTRACT_ADDRESS = process.env.VOTING_CONTRACT_ADDRESS;
const contract = require("../artifacts/contracts/Voting.sol/Voting.json");

const ethers = require("ethers");

// Provider
const alchemyProvider = new ethers.providers.JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const votingContract = new ethers.Contract(
  VOTING_CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  try {
    // Get list of candidates
    const candidates = await votingContract.getCandidateList();
    console.log("List of Candidates:", candidates);
    await votingContract.addNewCandidate("Malaika");
    const newCandidates = await votingContract.getCandidateList();
    console.log(newCandidates);
    // Check if "Johnny" is a valid candidate
    const johnnyIsValid = await votingContract.isValidCandidate("Johnny");
    if (!johnnyIsValid) {
      console.log("Error: 'Johnny' is not a valid candidate.");
      return;
    }

    // Get total votes for "Johnny"
    const votes = await votingContract.getVoteCount("Johnny");
    console.log("Total votes for Johnny:", votes.toNumber());

    // Update the vote count for "Johnny"
    console.log("Updating vote count...");
    const tx = await votingContract.vote("Johnny");
    await tx.wait();
    console.log("Vote count updated.");
  } catch (error) {
    console.error("Error: ", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

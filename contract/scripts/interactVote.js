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
    // Sample start time and end time (in Unix timestamp format)
    let startTime = Math.floor(Date.now() / 1000); // Current time
    let endTime = startTime + 24 * 60 * 60; // 24 hours from now
    // Sample candidates list
    let candidatesList = ["Alice", "Bob", "Charlie"];

    // Sample voters list (replace with actual Ethereum addresses)
    let votersList = [
      "0xaFeF48F7718c51fb7C6d1B314B3991D2e1d8421E",
      "0xc542BdA5EC1aC9b86fF470c04062D6a181e67928",
    ];

    // const tx = await votingContract.createBallot(
    //   "Sample Ballot", // Ballot name
    //   startTime,
    //   endTime,
    //   candidatesList,
    //   votersList
    // );
    // const receipt = await tx.wait(); // Wait for the transaction to be mined
    // console.log("Ballot created successfully");
    // const ballotIndex = 0;

    // await votingContract.vote("Sample Ballot", "Alice", votersList[0]);
    // console.log("Voted successfully");
    const voteCount = await votingContract.getVoteCount(
      "Sample Ballot",
      "Alice"
    );
    console.log("Total votes for Alice:", voteCount.toNumber());
    // Get list of candidates
    // const candidates = await votingContract.getCandidateList();
    // console.log("List of Candidates:", candidates);
    // // await votingContract.addNewCandidate("Malaika");
    // // const newCandidates = await votingContract.getCandidateList();
    // // console.log(newCandidates);
    // // Check if "Johnny" is a valid candidate
    // const johnnyIsValid = await votingContract.isValidCandidate("Johnny");
    // if (!johnnyIsValid) {
    //   console.log("Error: 'Johnny' is not a valid candidate.");
    //   return;
    // }

    // // Get total votes for "Johnny"
    // const votes = await votingContract.getVoteCount("Johnny");
    // console.log("Total votes for Johnny:", votes.toNumber());

    // // Update the vote count for "Johnny"

    // console.log("Updating vote count...");
    // const tx = await votingContract.vote(
    //   "Johnny",
    //   "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2"
    // );
    // await tx.wait();
    // console.log("Vote count updated.");
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

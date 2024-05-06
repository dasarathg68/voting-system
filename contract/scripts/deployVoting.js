async function main() {
  const VotingContractFactory = await ethers.getContractFactory("Voting");

  const listOfCandidates = ["Johnny", "Amber"];

  const Voting = await VotingContractFactory.deploy(listOfCandidates);
  console.log("Contract deployed to address:", Voting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

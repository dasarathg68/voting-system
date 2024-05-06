async function main() {
  const VotingContractFactory = await ethers.getContractFactory("Voting");

  const listOfCandidates = ["Johnny", "Amber"];
  const listOfVoters = [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
  ];

  const Voting = await VotingContractFactory.deploy();
  console.log("Contract deployed to address:", Voting.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

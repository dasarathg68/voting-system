# e-Voting Portal

The portal is built using Vue.js, Pinia, TypeScript, Vite, and Daisy UI, making it super smooth and easy to use. It is further supported by Firebase, SIWE and a Node.js backend running everything securely for managing users.

The system uses Solidity smart contracts on Ethereum/Polygon to handle voting.

In a nutshell, the portal aims to simplify voting and governance in organizations.

In the long run, this project further aims to integrate hardware devices and hope to create a scalable microcontroller-Web3 interface along the way.

## Voting Smart Contract

This is a Solidity smart contract for managing voting processes on the Ethereum blockchain.

### Overview

The contract allows for the creation of voting ballots, where users can create ballots with specified start and end times, candidate lists, and eligible voters. Once a ballot is created, voters can cast their votes for candidates within the specified time frame.

### Features

- Creation of voting ballots with customizable parameters.
- Addition of candidates and eligible voters to each ballot.
- Casting of votes by eligible voters.
- Retrieval of candidate lists, vote counts, and other ballot information.

### Installation

To use this contract, you will need:

- An Ethereum development environment such as Remix or Truffle.
- The Solidity compiler version ^0.8.0.

### Usage

1. Deploy the contract to an Ethereum network.
2. Use the `createBallot` function to create a new voting ballot, specifying the name, start time, end time, candidate list, and eligible voters.
3. Once the ballot is created, eligible voters can cast their votes using the `vote` function, providing the name of the ballot, the chosen candidate, and their address.
4. After the voting period ends, the results can be accessed using various functions such as `getCandidateList` and `getVoteCount`.

### Example

To interact with the contract use the scripts included in the contracts/scripts/ directory.

```solidity
// Deploy the contract
Voting voting = new Voting();

// Create a new ballot
voting.createBallot("Example Ballot", 1620960000, 1621046400, ["Candidate A", "Candidate B"], [0x123..., 0x456...]);

// Cast a vote
voting.vote("Example Ballot", "Candidate A", msg.sender);
```

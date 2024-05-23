// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./Types.sol";
import "hardhat/console.sol";

contract Voting {


    mapping(string => Types.Ballot) public ballots;
    string[] public ballotNames;
    constructor() {}

    function createBallot(string memory name, uint256 startTime, uint256 endTime, string[] memory candidatesList, address[] memory votersList) external {
        require(endTime > startTime, "End time must be after start time");

        Types.Ballot storage ballot = ballots[name];
        ballot.startTime = startTime;
        ballot.endTime = endTime;
        ballot.owner = msg.sender;
        ballot.name = name;

        for (uint256 i = 0; i < candidatesList.length; i++) {
            ballot.candidates.push(candidatesList[i]);
            ballot.votes[candidatesList[i]] = 0;
            console.log("Candidate added: %s", candidatesList[i]);
        }

        for (uint256 i = 0; i < votersList.length; i++) {
            ballot.voters[votersList[i]] = Types.Voter(false, true);
        }

        ballotNames.push(name);
    }

    function getBallots() public view returns (string[] memory) {
        return ballotNames;
    }

    function vote(string memory ballotName, string memory candidate, address voter) public {
        Types.Ballot storage ballot = ballots[ballotName];
        require(ballot.startTime != 0, "Ballot not found");
        require(isValidCandidate(ballot, candidate), "Invalid candidate");
        require(ballot.voters[voter].isEligible, "Voter not eligible");
        require(!ballot.voters[voter].isVoted, "Voter already voted");
        require(block.timestamp >= ballot.startTime && block.timestamp <= ballot.endTime, "Voting period has not started or has ended");

        ballot.votes[candidate] += 1;
        ballot.voters[voter].isVoted = true;
    }

    function getCandidateList(string memory ballotName) public view returns (string[] memory) {
        // require(ballots[ballotName].startTime != 0, "Invalid ballot name");
        return ballots[ballotName].candidates;
    }

    function getVoteCount(string memory ballotName, string memory candidate) public view returns (uint256 voteCount) {
        Types.Ballot storage ballot = ballots[ballotName];
        require(ballot.startTime != 0, "Ballot not found");
        voteCount = ballot.votes[candidate];
    }

    function isValidCandidate(Types.Ballot storage ballot, string memory candidate) private view returns (bool) {
        for (uint256 i = 0; i < ballot.candidates.length; i++) {
            if (keccak256(abi.encodePacked(ballot.candidates[i])) == keccak256(abi.encodePacked(candidate))) {
                return true;
            }
        }
        return false;
    }

    function getBallotCount() public view returns (uint256) {
        return ballotNames.length;
    }
}

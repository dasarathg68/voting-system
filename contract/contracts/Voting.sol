// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./Types.sol";

contract Voting {
   

    Types.Ballot[] public ballots;

    constructor() {}

    function createBallot(string memory name, uint256 startTime, uint256 endTime, string[] memory candidatesList, address[] memory votersList) external  {
    require(endTime > startTime, "End time must be after start time");

    // Add a new ballot to the ballots array
    ballots.push();
    Types.Ballot storage ballot = ballots[ballots.length - 1];

    ballot.startTime = startTime;
    ballot.endTime = endTime;

    for (uint256 i = 0; i < candidatesList.length; i++) {
        ballot.owner = msg.sender;
        ballot.name = name;
        ballot.candidates.push(candidatesList[i]);
        ballot.votes[candidatesList[i]] = 0;
    }

    for (uint256 i = 0; i < votersList.length; i++) {
        ballot.voters[votersList[i]] = Types.Voter(false, true);
    }
}
    function getBallots() public view returns (string[] memory) {
        string[] memory ballotNames;
       for (uint256 i = 0; i < ballots.length; i++) {
            ballotNames[i] = ballots[i].name;
        }
        return ballotNames;
    }
   
    function vote(string memory ballotName, string memory candidate, address voter) public {
       Types.Ballot storage ballot;
            bool found = false;

            // Iterate over the ballots array
            for (uint i = 0; i < ballots.length; i++) {
                // If the ballotName of the current Ballot is equal to the target ballotName
                if (keccak256(abi.encodePacked(ballots[i].name)) == keccak256(abi.encodePacked(ballotName))) {
                    // Set the ballot variable to the current Ballot and set found to true
                    ballot = ballots[i];
                    found = true;
                     require(found, "Ballot not found");
                    require(isValidCandidate(ballot, candidate), "Invalid candidate");
                    require(ballot.voters[voter].isEligible, "Voter not eligible");
                    require(!ballot.voters[voter].isVoted, "Voter already voted");
                    require(block.timestamp >= ballot.startTime && block.timestamp <= ballot.endTime, "Voting period has not started or has ended");

                    ballot.votes[candidate] += 1;
                    ballot.voters[voter].isVoted = true;
                    break;
                }
            }
            require(found, "Ballot not found");

       
    }

    function getCandidateList(uint256 ballotIndex) public view returns (string[] memory) {
        require(ballotIndex < ballots.length, "Invalid ballot index");
        return ballots[ballotIndex].candidates;
    }

    function getVoteCount(string memory ballotName, string memory candidate) public view returns (uint256 voteCount) {
       

         Types.Ballot storage ballot;
            bool found = false;

            // Iterate over the ballots array
            for (uint i = 0; i < ballots.length; i++) {
                // If the ballotName of the current Ballot is equal to the target ballotName
                if (keccak256(abi.encodePacked(ballots[i].name)) == keccak256(abi.encodePacked(ballotName))) {
                    // Set the ballot variable to the current Ballot and set found to true
                    ballot = ballots[i];
                    found = true;
                    voteCount = ballot.votes[candidate];
                    return voteCount;
                }
            }
            require(found, "Ballot not found");
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
        return ballots.length;
    }
}

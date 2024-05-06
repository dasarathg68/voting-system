// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;
import "./Types.sol";
contract Voting {
    // Mapping from candidate name to vote count
    
    string[] public candidates;
    mapping(address => Types.Voter) public voters;
    
    mapping(string => uint256) public votes;

    constructor(string[] memory candidatesList, address[] memory votersList) {
        for(uint i = 0; i < candidatesList.length; i++) {
            candidates.push(candidatesList[i]);
            votes[candidatesList[i]] = 0;
        }
        for(uint i = 0; i < votersList.length; i++) {
            voters[votersList[i]] = Types.Voter(false, true);
        }
    }
    function addNewCandidate(string memory candidate) public {
        candidates.push(candidate);
        votes[candidate] = 0;
    }

    function getVoteCount(string memory candidate) view public returns (uint256) {
        require(isValidCandidate(candidate));
        return votes[candidate];
    }
    function isValidCandidate(string memory candidate) view public returns (bool) {
        for(uint i = 0; i < candidates.length; i++) {

    if (keccak256(abi.encodePacked(candidates[i])) == keccak256(abi.encodePacked(candidate))){
        return true;
      }
    }
    return false;
    }
    function vote(string memory candidate, address voter) public {
        require(isValidCandidate(candidate));
        require(voters[voter].isEligible);
        require(voters[voter].isVoted == false);
        votes[candidate] += 1;
        voters[voter].isVoted = true;
    }
    function getCandidateList() public view returns (string[] memory){
	return candidates;
  }  

}
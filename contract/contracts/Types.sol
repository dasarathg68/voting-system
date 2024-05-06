// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

library  Types {
    struct Voter{
        bool isVoted;
        bool isEligible;
    }
   struct Candidate{
        string name;        
    }
     struct Ballot {
        address owner;
        string name;
        string[] candidates;
        uint256 startTime;
        uint256 endTime;
        mapping(string => uint256) votes;
        mapping(address => Voter) voters;
    }
}
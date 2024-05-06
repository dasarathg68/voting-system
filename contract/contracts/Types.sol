// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

library  Types {
    struct Voter{
        bool isVoted;
        bool isEligible;
    }
   struct Candidate{
        string name;
        uint256 voteCount;
        
    }
}
const { string } = require("hardhat/internal/core/params/argumentTypes");

// IRV function with detailing after each round
export function instantRunoffVoting(votes, candidates) {
  let round = 1;
  let voteCount = {};
  let currentCandidates = candidates.slice();

  while (currentCandidates.length > 1) {
    console.log(`Round ${round}:`);

    // Initialize vote count for each candidate
    for (const candidate of currentCandidates) {
      voteCount[candidate] = 0;
    }

    // Count votes for each candidate
    for (const vote of votes) {
      voteCount[vote[0]] += 1;
    }

    console.log(`Vote count:`, voteCount);

    // Check if any candidate has more than 50% of the votes
    let winner = null;
    for (const candidate of currentCandidates) {
      if (voteCount[candidate] > votes.length / 2) {
        winner = candidate;
        break;
      }
    }

    if (winner) {
      console.log(`Winner: ${winner}`);
      return winner;
    }

    // Eliminate the candidate with the fewest votes
    let minVotes = Number.MAX_SAFE_INTEGER;
    let candidateToEliminate = null;
    for (const candidate of currentCandidates) {
      if (voteCount[candidate] < minVotes) {
        minVotes = voteCount[candidate];
        candidateToEliminate = candidate;
      }
    }

    console.log(`Eliminated: ${candidateToEliminate}`);

    // Remove the eliminated candidate from the list of current candidates
    currentCandidates = currentCandidates.filter(
      candidate => candidate !== candidateToEliminate
    );

    // Update the votes to remove the eliminated candidate
    for (let i = 0; i < votes.length; i++) {
      const vote = votes[i];
      if (vote[0] === candidateToEliminate) {
        for (let j = 1; j < vote.length; j++) {
          const alternativeCandidate = vote[j];
          if (currentCandidates.includes(alternativeCandidate)) {
            votes[i] = [alternativeCandidate];
            break;
          }
        }
      }
    }

    round++;
  }

  console.log(`Winner: ${currentCandidates[0]}`);
  return currentCandidates[0];
}

// ***** TEST CASE ***** //

// This array will have to be ethers view values
AKHH = [123, 123, 132, 213, 213, 213, 231, 231, 231, 231, 312, 312, 312, 321, 321, 321];
// This mapping has to be from the ProvenDB database
let candidateList = new Map();
candidateList.set('1', 'NA20B007')
candidateList.set('2', 'NA20B016')
candidateList.set('3', 'NA20B020')
let candidates = Array.from(candidateList.values())

// 123: 2, 132: 1, 213: 3, 231: 4, 312: 3, 321: 3 
// Since 1 has least 1st pref, 1 is removed, and then
// 23: 9, 32: 7, and hence 2, i.e. NA20B016 should win

// Input formatting to IRV function
let ballots = new Array();
for (i=0; i<AKHH.length; i++) {
    AKHH[i] = AKHH[i].toString();
    temp = AKHH[i].split("");
    for (j=0; j<temp.length; j++) {
      temp[j] = candidateList.get(temp[j])
    }
    ballots.push(temp);
}

instantRunoffVoting(ballots, candidates)
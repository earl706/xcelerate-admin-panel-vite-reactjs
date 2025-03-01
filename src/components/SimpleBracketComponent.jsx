import React, { useEffect, useState } from "react";
import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";
import _ from "lodash"; // For shuffling teams and pairing

export default function SimpleBracketComponent({ teams, type }) {
  const [rounds, setRounds] = useState(generateInitialRounds(teams, type));

  function generateInitialRounds(teams, type) {
    const shuffledTeams = _.shuffle(teams);
    let roundMatches = [];

    for (let i = 0; i < shuffledTeams.length; i += 2) {
      if (i + 1 < shuffledTeams.length) {
        roundMatches.push({
          id: `match-${i}`,
          teams: [shuffledTeams[i], shuffledTeams[i + 1]],
          winner: null,
        });
      }
    }

    let initialRounds = [{ title: "Round 1", seeds: roundMatches }];

    if (type === "double") {
      initialRounds.push({ title: "Losers Round 1", seeds: [] });
    }

    return initialRounds;
  }

  const handleWinnerClick = (matchId, winner) => {
    setRounds((prevRounds) => {
      let updatedRounds = [...prevRounds];
      let currentRoundIndex = updatedRounds.findIndex((r) =>
        r.seeds.some((m) => m.id === matchId)
      );

      if (currentRoundIndex === -1) return prevRounds;

      updatedRounds[currentRoundIndex].seeds = updatedRounds[
        currentRoundIndex
      ].seeds.map((match) =>
        match.id === matchId ? { ...match, winner } : match
      );

      const nextRoundIndex = currentRoundIndex + 1;
      if (!updatedRounds[nextRoundIndex]) {
        updatedRounds.push({ title: `Round ${nextRoundIndex + 1}`, seeds: [] });
      }

      let nextRoundMatches = updatedRounds[nextRoundIndex].seeds;
      let winners = updatedRounds[currentRoundIndex].seeds
        .filter((m) => m.winner)
        .map((m) => m.winner);

      while (winners.length >= 2) {
        nextRoundMatches.push({
          id: `next-${nextRoundMatches.length}`,
          teams: [winners.shift(), winners.shift()],
          winner: null,
        });
      }

      if (type === "double") {
        let losers = updatedRounds[currentRoundIndex].seeds
          .filter((m) => m.winner)
          .map((m) => m.teams.find((t) => t !== m.winner));

        if (losers.length > 0) {
          if (!updatedRounds[nextRoundIndex + 1]) {
            updatedRounds.push({
              title: `Losers Round ${nextRoundIndex}`,
              seeds: [],
            });
          }

          let losersRound = updatedRounds[nextRoundIndex + 1].seeds;
          while (losers.length >= 2) {
            losersRound.push({
              id: `losers-${losersRound.length}`,
              teams: [losers.shift(), losers.shift()],
              winner: null,
            });
          }
        }
      }

      updatedRounds[nextRoundIndex].seeds = nextRoundMatches;
      return updatedRounds;
    });
  };

  useEffect(() => {}, [rounds]);

  return (
    <div style={{ overflowX: "auto", padding: "20px" }}>
      <Bracket
        rounds={rounds.map((round) => ({
          ...round,
          seeds: round.seeds.map((match) => ({
            ...match,
            renderSeed: ({ seed }) => (
              <Seed mobileBreakpoint={600} style={{ fontSize: 16 }}>
                <SeedItem>
                  <SeedTeam
                    onClick={() => {
                      console.log("sad");
                      handleWinnerClick(match.id, match.teams[0]);
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        match.winner === match.teams[0] ? "green" : "lightgray",
                      color:
                        match.winner === match.teams[0] ? "white" : "black",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    {match.teams[0].name}
                  </SeedTeam>
                  <SeedTeam
                    onClick={() => handleWinnerClick(match.id, match.teams[1])}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        match.winner === match.teams[1] ? "green" : "lightgray",
                      color:
                        match.winner === match.teams[1] ? "white" : "black",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    {match.teams[1].name}
                  </SeedTeam>
                </SeedItem>
              </Seed>
            ),
          })),
        }))}
      />
    </div>
  );
}

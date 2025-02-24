import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Loading from "../components/Loading";

export default function TournamentDetailPage() {
  const { getTournament } = useContext(AuthContext);

  const [numParticipants, setNumParticipants] = useState(8);
  const [bracketType, setBracketType] = useState("double");
  const [winnerBracket, setWinnerBracket] = useState([]);
  const [loserBracket, setLoserBracket] = useState([]);

  const generateBracket = () => {
    let participants = Array.from(
      { length: numParticipants },
      (_, i) => `Player ${i + 1}`
    );
    participants = shuffleArray(participants);

    let matchCounter = 1;
    let winnerRounds = [];
    let loserRounds = [];

    if (bracketType === "single") {
      winnerRounds = createSingleElimination(participants, matchCounter);
    } else if (bracketType === "double") {
      winnerRounds = createSingleElimination(participants, matchCounter);
      loserRounds = createLoserBracket(
        participants,
        winnerRounds,
        matchCounter
      );
    } else if (bracketType === "roundRobin") {
      winnerRounds = createRoundRobin(participants);
    }

    setWinnerBracket(winnerRounds);
    setLoserBracket(loserRounds);
  };

  // Single Elimination Bracket Generator with Match Numbers
  const createSingleElimination = (players, matchCounter) => {
    let rounds = [];
    while (players.length > 1) {
      let newRound = [];
      for (let i = 0; i < players.length; i += 2) {
        newRound.push([players[i], players[i + 1] || "BYE", matchCounter++]);
      }
      rounds.push(newRound);
      players = newRound.map((match) => match[0]);
    }
    return rounds;
  };

  // Double Elimination - Loser's Bracket Generator with Match Numbers
  const createLoserBracket = (players, winnerRounds, matchCounter) => {
    let loserRounds = [];
    let totalRounds = winnerRounds.length * 2 - 1;

    for (let i = 0; i < totalRounds - 1; i++) {
      let round = [];
      for (let j = 0; j < Math.ceil(players.length / 2); j++) {
        round.push([
          `Loser of Match ${j + 1}`,
          `Loser of Match ${j + 2}`,
          matchCounter++,
        ]);
      }
      loserRounds.push(round);
    }

    return [
      ...loserRounds,
      [["Grand Final (Loser's Bracket)", "", matchCounter]],
    ];
  };

  // Round Robin Bracket Generator
  const createRoundRobin = (players) => {
    let matches = [];
    let matchNumber = 1;
    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        matches.push([players[i], players[j], matchNumber++]);
      }
    }
    return [matches];
  };

  // Randomly shuffle the participants
  const shuffleArray = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const [loading, setLoading] = useState(false);
  const [tournamentData, setTournamentData] = useState({
    requirements: [],
    tournament_banner: "",
    tournament_name: "",
    description: "",
    sport: "",
    date_created: "",
    tournament_start: "",
    tournament_end: "",
    bracketing_system: "",
  });
  const url_parameters = useParams();

  const getTournamentData = async () => {
    try {
      const response = await getTournament(url_parameters.id);
      console.log(response);
      setTournamentData(response.data);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTournamentData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-start items-center mb-6">
        <div className="mr-3 font-bold text-[20px]">
          <NavLink to="/tournaments">←</NavLink>
        </div>
        <div className="">
          <h2 className="text-2xl font-semibold">Tournament detail</h2>
        </div>
      </div>

      <div className="bg-white  flex flex-col drop-shadow-lg rounded-[10px] px-2 py-4 mb-4">
        <div className="flex flex-col py-4 px-4">
          <span className="font-bold mb-2 text-[13px] text-center">
            Tournament Banner
          </span>
          <span className=" text-[14px]">
            {loading ? (
              <div className="flex justify-center align-center">
                <Loading size={5} light={true} />
              </div>
            ) : (
              <img
                src={`http://127.0.0.1:8000/api/tournaments${tournamentData.tournament_banner}`}
                alt=""
                className="w-full rounded-[5%]"
              />
            )}
          </span>
        </div>
        <div className="grid grid-cols-2 justify-around">
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">Tournament Name</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                tournamentData.tournament_name
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">Description</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                tournamentData.description
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">Sport</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                tournamentData.sport
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">Date Created</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                tournamentData.date_created
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">Duration</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                `from ${tournamentData.tournament_start} to ${tournamentData.tournament_end}`
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">
              Bracketing System
            </span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                tournamentData.bracketing_system
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">Requirements</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                tournamentData.requirements
              )}
            </span>
          </div>
        </div>

        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">
            🏆 Tournament Bracket Maker
          </h1>

          <div className="flex gap-4 mb-4">
            <input
              type="number"
              min="2"
              value={numParticipants}
              onChange={(e) => setNumParticipants(Number(e.target.value))}
              className="p-2 border rounded"
            />

            <select
              value={bracketType}
              onChange={(e) => setBracketType(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="single">Single Elimination</option>
              <option value="double">Double Elimination</option>
              <option value="roundRobin">Round Robin</option>
            </select>

            <button
              onClick={generateBracket}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Generate Bracket
            </button>
          </div>

          {winnerBracket.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-center mb-4">
                🏅 Winner's Bracket
              </h2>
              <div className="flex overflow-x-auto space-x-8 p-4">
                {winnerBracket.map((round, roundIndex) => (
                  <div key={roundIndex} className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-2">
                      Round {roundIndex + 1}
                    </h2>
                    <div className="flex flex-col gap-4">
                      {round.map(([player1, player2, matchNum], matchIndex) => (
                        <div
                          key={matchIndex}
                          className="relative w-56 text-center"
                        >
                          <div className="text-sm font-semibold text-gray-600">
                            Match {matchNum}
                          </div>
                          <div className="flex flex-col justify-between border border-gray-400 p-2 rounded bg-white shadow-md">
                            <span className="font-medium">{player1}</span>
                            <span className="text-sm text-gray-500">vs</span>
                            <span className="font-medium">{player2}</span>
                          </div>
                          {roundIndex < winnerBracket.length - 1 && (
                            <div className="absolute right-[-20px] top-1/2 w-6 border-t-2 border-gray-400"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loserBracket.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-center mb-4">
                🥈 Loser's Bracket
              </h2>
              <div className="flex overflow-x-auto space-x-8 p-4">
                {loserBracket.map((round, roundIndex) => (
                  <div key={roundIndex} className="flex flex-col items-center">
                    <h2 className="text-lg font-semibold mb-2">
                      Round {roundIndex + 1}
                    </h2>
                    <div className="flex flex-col gap-4">
                      {round.map(([player1, player2, matchNum], matchIndex) => (
                        <div
                          key={matchIndex}
                          className="relative w-56 text-center"
                        >
                          <div className="text-sm font-semibold text-gray-600">
                            Match {matchNum}
                          </div>
                          <div className="flex flex-col justify-between border border-gray-400 p-2 rounded bg-gray-100 shadow-md">
                            <span className="font-medium">{player1}</span>
                            <span className="text-sm text-gray-500">vs</span>
                            <span className="font-medium">{player2}</span>
                          </div>
                          {roundIndex < loserBracket.length - 1 && (
                            <div className="absolute right-[-20px] top-1/2 w-6 border-t-2 border-gray-400"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

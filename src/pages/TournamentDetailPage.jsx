import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SimpleBracketComponent from "../components/SimpleBracketComponent";
import DynamicBracketComponent from "../components/DynamicBracketComponent";

import Loading from "../components/Loading";

export default function TournamentDetailPage() {
  const { getTournament } = useContext(AuthContext);

  const [type, setType] = useState("single"); // "single" or "double"

  const teams = [
    { name: "Team A" },
    { name: "Team B" },
    { name: "Team C" },
    { name: "Team D" },
    { name: "Team E" },
    { name: "Team F" },
    // { name: "Team G" },
    // { name: "Team H" },
  ];

  const [numParticipants, setNumParticipants] = useState(8);
  const [bracketType, setBracketType] = useState("single");
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
        {/* <SimpleBracketComponent teams={teams} type={type} /> */}
        <DynamicBracketComponent teams={teams} />
      </div>
    </>
  );
}

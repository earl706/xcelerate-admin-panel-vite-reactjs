import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Loading from "../components/Loading";

export default function TournamentDetailPage() {
  const { getTournament } = useContext(AuthContext);
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
      </div>
    </>
  );
}

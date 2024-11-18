import React, { useContext, useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function CreateTournament() {
  const { createTournament } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [tournamentBanner, setTournamentBanner] = useState(null);
  const [tournamentCreated, setTournamentCreated] = useState(false);
  const [tournamentCreatedData, setTournamentCreatedData] = useState({
    tournament_name: "",
    description: "",
    sport: "",
    date_created: "",
    tournament_start: "",
    tournament_end: "",
    bracketing_system: "",
    requirements: "",
  });
  const [tournamentError, setTournamentError] = useState(false);
  const [tournamentErrorMessage, setTournamentErrorMessage] = useState("");

  const [tournamentName, setTournamentName] = useState("");
  const [description, setDescription] = useState("");
  const [sport, setSport] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [tournamentStart, setTournamentStart] = useState("");
  const [tournamentEnd, setTournamentEnd] = useState("");
  const [bracketingSystem, setBracketingSystem] = useState("");
  const [requirements, setRequirements] = useState("");

  const handleTournamentBannerChange = (e) => {
    setTournamentBanner(e.target.files[0]);
  };

  const handleCreateTournamentSubmit = async (event) => {
    event.preventDefault();
    console.log("Submit triggered");

    const data = {
      tournament_name: tournamentName,
      description: description,
      sport: sport,
      date_created: dateCreated,
      tournament_start: tournamentStart,
      tournament_end: tournamentEnd,
      bracketing_system: bracketingSystem,
      requirements: requirements,
    };
    console.log(data);
    if (
      tournamentName != "" &&
      description != "" &&
      sport != "" &&
      tournamentStart != "" &&
      tournamentEnd != "" &&
      bracketingSystem != "" &&
      requirements != ""
    ) {
      console.log("Submit triggered valid data");
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("tournament_banner", tournamentBanner);
        formData.append("tournament_name", tournamentName);
        formData.append("description", description);
        formData.append("sport", sport);
        formData.append("date_created", dateCreated);
        formData.append("tournament_start", tournamentStart);
        formData.append("tournament_end", tournamentEnd);
        formData.append("bracketing_system", bracketingSystem);
        formData.append("requirements", requirements.split(","));
        requirements.split(",").forEach((requirement, index) => {
          formData.append(`requirements[${index}]`, requirement);
        });
        const register_response = await createTournament(formData);
        setTournamentCreatedData(register_response.data);
        if (register_response.statusText == "OK") {
          setTournamentCreated(true);
          setTournamentError(false);
          setTournamentName("");
          setDescription("");
          setSport("");
          setTournamentStart("");
          setTournamentEnd("");
          setBracketingSystem("");
          setRequirements("");
        } else {
          setTournamentError(true);
        }
        setLoading(false);
        return register_response;
      } catch (err) {
        setLoading(false);
        setTournamentError(true);
        console.log(err);
        return err;
      }
    }
  };

  useEffect(() => {
    console.log(tournamentBanner);
  }, [tournamentBanner]);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Tournament
      </h2>
      <form
        onSubmit={handleCreateTournamentSubmit}
        className="flex flex-col justify-center"
      >
        <div className="bg-white rounded-[10px] drop-shadow-lg px-4 pt-8 pb-4">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Tournament Banner
            </label>
            <input
              type="file"
              onChange={(e) => {
                setTournamentCreated(false);
                setTournamentError(false);
                handleTournamentBannerChange(e);
              }}
              placeholder="Username"
              className={
                tournamentError &&
                tournamentErrorMessage.tournament_name != undefined
                  ? "transition w-full p-2 border-b border-red-600 focus:border-black focus:outline-none"
                  : "transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              }
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Tournament Name
            </label>
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => {
                setTournamentCreated(false);
                setTournamentError(false);
                setTournamentName(e.target.value);
              }}
              placeholder="Tournament Name"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setTournamentCreated(false);
                setTournamentError(false);
                setDescription(e.target.value);
              }}
              placeholder="Description"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Sport
            </label>
            <input
              type="text"
              value={sport}
              onChange={(e) => {
                setTournamentCreated(false);
                setTournamentError(false);
                setSport(e.target.value);
              }}
              placeholder="Sport"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Tournament Start
            </label>
            <input
              type="datetime-local"
              value={tournamentStart}
              onChange={(e) => {
                setTournamentCreated(false);
                setTournamentError(false);
                setTournamentStart(e.target.value);
              }}
              placeholder="Tournament Start"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Tournament End
            </label>
            <input
              type="datetime-local"
              value={tournamentEnd}
              onChange={(e) => {
                setTournamentCreated(false);
                setTournamentError(false);
                setTournamentEnd(e.target.value);
              }}
              placeholder="Tournament End"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Bracketing System
            </label>
            <input
              type="text"
              value={bracketingSystem}
              onChange={(e) => {
                setTournamentCreated(false);
                setTournamentError(false);
                setBracketingSystem(e.target.value);
              }}
              placeholder="Bracketing System"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Requirements
            </label>
            <input
              type="text"
              value={requirements}
              onChange={(e) => {
                setTournamentCreated(false);
                setTournamentError(false);
                setRequirements(e.target.value);
              }}
              placeholder="Requirements"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>

          <div className="flex flex-row">
            <button
              type="submit"
              className="transition py-2 mt-4 w-full text-white bg-blue-600 rounded-[6px] hover:bg-blue-700"
              disabled={loading}
            >
              <div className="flex flex-row items-center justify-center">
                <div className={loading ? "mr-2" : "hidden"}>
                  <Loading size={5} light={false} />
                </div>
                <span>Create User</span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function CreateTournament() {
  const { createTournament } = useContext(AuthContext);
  const sports_suggestions = [
    "Soccer",
    "Football",
    "Basketball",
    "Cricket",
    "Tennis",
    "Baseball",
    "Golf",
    "American Football",
    "Rugby",
    "Hockey",
    "Table Tennis",
    "Badminton",
    "Volleyball",
    "Swimming",
    "Cycling",
    "Athletics",
    "Boxing",
    "MMA",
    "Wrestling",
    "Judo",
    "Karate",
    "Taekwondo",
    "Fencing",
    "Archery",
    "Gymnastics",
    "Rowing",
    "Canoeing",
    "Diving",
    "Water Polo",
    "Surfing",
    "Skiing",
    "Snowboarding",
    "Ice Hockey",
    "Figure Skating",
    "Equestrian",
    "Lacrosse",
    "Handball",
    "Squash",
    "Racquetball",
    "Bowling",
    "Chess",
    "Darts",
    "Billiards",
    "Motorsport",
    "Skateboarding",
    "Rock Climbing",
    "Triathlon",
    "Powerlifting",
    "Weightlifting",
    "Snooker",
    "Ultimate Frisbee",
  ];

  const [loading, setLoading] = useState(false);

  const [tournamentBanner, setTournamentBanner] = useState(null);
  const [tournamentCreated, setTournamentCreated] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
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

  const handleChange = (e) => {
    const value = e.target.value;
    setSport(value);

    // Filter suggestions
    if (value.length > 0) {
      const filtered = sports_suggestions.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setSport(suggestion);
    setFilteredSuggestions([]);
  };

  const handleCreateTournamentSubmit = async (event) => {
    event.preventDefault();

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
        console.log(register_response);
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

  const bracketing_systems = [
    {
      name: "Single Elimination",
      system: "single_elimination",
    },
    {
      name: "Double Elimination",
      system: "double_elimination",
    },
    {
      name: "Round Robin",
      system: "round_robin",
    },
    {
      name: "Swiss",
      system: "swiss",
    },
    {
      name: "Free For All",
      system: "free_for_all",
    },
    {
      name: "Leaderboard",
      system: "leaderboard",
    },
  ];

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
              onChange={handleChange}
              placeholder="Sport"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
            {filteredSuggestions.length > 0 && (
              <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(suggestion)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
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
            <div className="grid grid-cols-3 gap-2">
              {bracketing_systems.map((bracket, index) => (
                <span
                  className={`transition px-4 py-2 text-center font-bold rounded-lg text-white cursor-pointer  ${
                    bracketingSystem == bracket.system
                      ? "bg-blue-600 hover:bg-blue-400 hover:text-black"
                      : "bg-gray-600 hover:bg-gray-400 hover:text-black"
                  }`}
                  key={index}
                  onClick={() => {
                    setBracketingSystem(bracket.system);
                    setTournamentCreated(false);
                    setTournamentError(false);
                  }}
                >
                  {bracket.name}
                </span>
              ))}
            </div>
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
                <span>Create Tournament</span>
              </div>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

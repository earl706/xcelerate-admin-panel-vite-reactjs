import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function CreateTournament() {
  const { createTournament } = useContext(AuthContext);
  const commonRequirements = [
    "PSA Birth Certificate",
    "Medical Certificate",
    "Valid ID (School ID, Government-issued ID)",
    "Signed Waiver or Parental Consent",
    "Official Team Roster",
    "Uniform Compliance ",
    "Registration Fee Payment",
    "Tournament Code of Conduct Agreement",
    "Proof of Residency ",
    "Pre-tournament Meeting Attendance",
  ];
  const sportsTournaments = [
    "Palarong Pambansa",
    "Philippine National Games",
    "Philippine Basketball Association (PBA) Season",
    "University Athletic Association of the Philippines (UAAP) Season",
    "National Collegiate Athletic Association (NCAA) Philippines Season",
    "Shakey's V-League",
    "Philippine Super Liga (PSL)",
    "Premier Volleyball League (PVL)",
    "Philippine Football League (PFL)",
    "Metropolitan Basketball Association (MBA)",
    "ASEAN Basketball League (ABL)",
    "Maharlika Pilipinas Basketball League (MPBL)",
    "Philippine Cup",
    "Commissioner's Cup",
    "Governors' Cup",
    "Filoil Flying V Preseason Cup",
    "FilOil EcoOil Preseason Cup",
    "Smart City Hoops Summer Classic",
    "PBA D-League Aspirants' Cup",
    "PBA D-League Foundation Cup",
    "PBA 3x3",
    "Chooks-to-Go Pilipinas 3x3",
    "National Basketball Training Center (NBTC) League",
    "National Basketball League (NBL) Philippines",
    "Women's National Basketball League (WNBL) Philippines",
    "Philippine Collegiate Champions League (PCCL)",
    "Philippine Secondary Schools Basketball Championship (PSSBC)",
    "Philippine Intercollegiate Basketball Championship",
    "Philippine Inter-Scholastic Basketball Championship",
    "Philippine Inter-Secondary Basketball Championship",
    "Philippine Inter-High School Basketball Championship",
    "Philippine Inter-Elementary Basketball Championship",
    "Philippine Inter-Barangay Basketball Tournament",
    "Philippine Inter-Town Basketball Tournament",
    "Philippine Inter-City Basketball Tournament",
    "Philippine Inter-Province Basketball Tournament",
    "Philippine Inter-Regional Basketball Tournament",
    "Philippine Inter-Island Basketball Tournament",
    "Philippine Inter-Zonal Basketball Tournament",
    "Philippine Inter-District Basketball Tournament",
    "Philippine Inter-Municipality Basketball Tournament",
    "Philippine Inter-Department Basketball Tournament",
    "Philippine Inter-Agency Basketball Tournament",
    "Philippine Inter-Company Basketball Tournament",
    "Philippine Inter-Organization Basketball Tournament",
    "Philippine Inter-Association Basketball Tournament",
    "Philippine Inter-League Basketball Tournament",
    "Philippine Inter-Club Basketball Tournament",
    "Philippine Inter-School Basketball Tournament",
    "Philippine Inter-University Basketball Tournament",
    "Philippine Inter-College Basketball Tournament",
    "Philippine Inter-Institution Basketball Tournament",
    "Philippine Inter-Office Basketball Tournament",
    "Philippine Inter-Branch Basketball Tournament",
    "Philippine Inter-Division Basketball Tournament",
    "Philippine Inter-Section Basketball Tournament",
    "Philippine Inter-Unit Basketball Tournament",
    "Philippine Inter-Group Basketball Tournament",
    "Philippine Inter-Team Basketball Tournament",
    "Philippine Inter-Squad Basketball Tournament",
    "Philippine Inter-Platoon Basketball Tournament",
    "Philippine Inter-Company Volleyball Tournament",
    "Philippine Inter-Organization Volleyball Tournament",
    "Philippine Inter-Association Volleyball Tournament",
    "Philippine Inter-League Volleyball Tournament",
    "Philippine Inter-Club Volleyball Tournament",
    "Philippine Inter-School Volleyball Tournament",
    "Philippine Inter-University Volleyball Tournament",
    "Philippine Inter-College Volleyball Tournament",
    "Philippine Inter-Institution Volleyball Tournament",
    "Philippine Inter-Office Volleyball Tournament",
    "Philippine Inter-Branch Volleyball Tournament",
    "Philippine Inter-Division Volleyball Tournament",
    "Philippine Inter-Section Volleyball Tournament",
    "Philippine Inter-Unit Volleyball Tournament",
    "Philippine Inter-Group Volleyball Tournament",
    "Philippine Inter-Team Volleyball Tournament",
    "Philippine Inter-Squad Volleyball Tournament",
    "Philippine Inter-Platoon Volleyball Tournament",
    "Philippine Inter-Company Football Tournament",
    "Philippine Inter-Organization Football Tournament",
    "Philippine Inter-Association Football Tournament",
    "Philippine Inter-League Football Tournament",
    "Philippine Inter-Club Football Tournament",
    "Philippine Inter-School Football Tournament",
    "Philippine Inter-University Football Tournament",
    "Philippine Inter-College Football Tournament",
    "Philippine Inter-Institution Football Tournament",
    "Philippine Inter-Office Football Tournament",
    "Philippine Inter-Branch Football Tournament",
    "Philippine Inter-Division Football Tournament",
    "Philippine Inter-Section Football Tournament",
    "Philippine Inter-Unit Football Tournament",
    "Philippine Inter-Group Football Tournament",
    "Philippine Inter-Team Football Tournament",
    "Philippine Inter-Squad Football Tournament",
    "Philippine Inter-Platoon Football Tournament",
  ];

  const sports_suggestions = [
    "Soccer",
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
    "Sepak Takraw",
    "Polo",
    "Kabaddi",
    "Muay Thai",
    "Parkour",
    "Freediving",
    "Base Jumping",
    "Bobsleigh",
    "Curling",
    "Biathlon",
    "Speed Skating",
    "Nordic Combined",
    "Luge",
    "Synchronized Swimming",
    "BMX Racing",
    "Mountain Biking",
    "Enduro Racing",
    "Trail Running",
    "Orienteering",
    "Dodgeball",
    "Kickball",
    "Inline Skating",
    "Street Hockey",
    "Field Hockey",
    "Inline Hockey",
    "Australian Rules Football",
    "Gaelic Football",
    "Hurling",
    "Underwater Hockey",
    "Underwater Rugby",
    "Strongman",
    "Arm Wrestling",
    "Sumo Wrestling",
    "Tug of War",
    "Kendo",
    "Petanque",
    "Bocce",
    "Pickleball",
    "Speedcubing",
    "Football",
    "Paintball",
    "Airsoft",
    "Drone Racing",
    "Esports",
    "Bodybuilding",
    "CrossFit",
    "Frisbee Golf",
    "High Diving",
    "Pole Vault",
    "Shot Put",
    "Discus Throw",
    "Hammer Throw",
    "Javelin Throw",
    "Steeplechase",
    "Marathon",
    "Decathlon",
  ];

  const [loading, setLoading] = useState(false);

  const [tournamentBanner, setTournamentBanner] = useState(null);
  const [tournamentCreated, setTournamentCreated] = useState(false);
  const [filteredSportsSuggestions, setFilteredSportsSuggestions] = useState(
    []
  );
  const [filteredTournamentsSuggestions, setFilteredTournamentsSuggestions] =
    useState([]);
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
  const [requirements, setRequirements] = useState([]);

  const handleTournamentBannerChange = (e) => {
    setTournamentBanner(e.target.files[0]);
  };

  const handleChange = (e, suggestions, setState, setFilteredSuggestions) => {
    const value = e.target.value;
    setState(value);

    if (value.length > 0) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelect = (suggestion, setState, setFilteredSuggestions) => {
    setState(suggestion);
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
        formData.append("requirements", requirements);
        // requirements.split(",").forEach((requirement, index) => {
        //   formData.append(`requirements[${index}]`, requirement);
        // });
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
          setRequirements([]);
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

  useEffect(() => {
    console.log(requirements);
  }, [requirements]);

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
              onChange={(e) =>
                handleChange(
                  e,
                  sportsTournaments,
                  setTournamentName,
                  setFilteredTournamentsSuggestions
                )
              }
              placeholder="Tournament Name"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
            {filteredTournamentsSuggestions.length > 0 && (
              <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
                {filteredTournamentsSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSelect(
                        suggestion,
                        setTournamentName,
                        setFilteredTournamentsSuggestions
                      )
                    }
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
              onChange={(e) =>
                handleChange(
                  e,
                  sports_suggestions,
                  setSport,
                  setFilteredSportsSuggestions
                )
              }
              placeholder="Sport"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
            {filteredSportsSuggestions.length > 0 && (
              <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
                {filteredSportsSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSelect(
                        suggestion,
                        setSport,
                        setFilteredSportsSuggestions
                      )
                    }
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
            <div className="grid grid-cols-3 gap-2">
              {commonRequirements.map((requirement, index) => (
                <div className="flex items-center justify">
                  <input
                    type="checkbox"
                    name={`${index}-${requirement}`}
                    id={`${index}-${requirement}`}
                    value={requirements}
                    onChange={(e) => {
                      setTournamentCreated(false);
                      setTournamentError(false);
                      setRequirements(e.target.value);
                      if (requirements.includes(requirement)) {
                        const updatedRequirements = requirements.filter(
                          (requirement_) => requirement_ != requirement
                        );
                        setRequirements(updatedRequirements);
                      } else {
                        setRequirements([...requirements, requirement]);
                      }
                    }}
                    placeholder="Requirements"
                    className="transition mr-2 border-b border-gray-300 focus:border-black focus:outline-none"
                  />
                  <label htmlFor={`${index}-${requirement}`}>
                    {requirement}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-row">
            <button
              type="submit"
              className="transition py-2 mt-4 w-full text-white bg-blue-600 rounded-lg hover:bg-blue-700"
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

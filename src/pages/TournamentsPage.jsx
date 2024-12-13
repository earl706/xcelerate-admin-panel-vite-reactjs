import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import BatchDeleteConfirmationModal from "../components/BatchDeleteConfirmationModal";

import { AuthContext } from "../context/AuthContext";

export default function TournamentsPage() {
  const productionAPIURL = import.meta.env.VITE_PRODUCTION_API_URL;
  const developmentAPIURL = import.meta.env.VITE_DEVELOPMENT_API_URL;
  const inProduction = import.meta.env.VITE_IN_PRODUCTION;

  const { getTournaments } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [confirmBatchDeleteTournaments, setConfirmBatchDeleteTournaments] =
    useState(false);
  const [tournamentEdit, setTournamentEdit] = useState(false);
  const [selectAllTournaments, setSelectAllTournaments] = useState(false);
  const [filters, setFilters] = useState({
    tournament_name: "",
    description: "",
    sport: "",
    date_created__date: "",
    tournament_start__date: "",
    tournament_end__date: "",
    id: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedTournaments, setSelectedTournaments] = useState([]);

  const [tournaments, setTournaments] = useState([]);

  const [loadingTournaments, setLoadingTournaments] = useState(false);

  const initializeTournaments = async () => {
    try {
      setLoadingTournaments(true);
      const params = {
        tournament_name: filters.tournament_name,
        description: filters.description,
        sport: filters.sport,
        date_created__date: filters.date_created__date,
        tournament_start__date: filters.tournament_start__date,
        tournament_end__date: filters.tournament_end__date,
        id: filters.id,
      };

      const urlParams = new URLSearchParams({
        page,
        ...params,
      });
      const tournaments_list = await getTournaments(urlParams);
      console.log(tournaments_list);
      if (
        tournaments_list.status == 200 ||
        tournaments_list.statusText == "OK"
      ) {
        setTournaments(Array.from(tournaments_list.data.results));
      } else {
        setError(true);
        setLoadingTournaments(false);
      }
      setLoadingTournaments(false);
      return tournaments_list;
    } catch (err) {
      console.log(err);
      setLoadingTournaments(false);
    }
  };

  const handleSelectAllTournaments = () => {
    if (!selectAllTournaments) {
      const currentTournaments = tournaments.map((tournament) => tournament.id);
      setSelectedTournaments(currentTournaments);
    } else {
      setSelectedTournaments([]);
    }
  };
  const handleSelectedTournaments = (tournamentID) => {
    if (selectedTournaments.includes(tournamentID)) {
      setSelectedTournaments(
        selectedTournaments.filter((id) => id != tournamentID)
      );
    } else {
      setSelectedTournaments([...selectedTournaments, tournamentID]);
    }
  };

  const closeDeleteTournamentConfirmation = () => {
    setDeleteConfirm(false);
    setConfirmBatchDeleteTournaments(false);
  };

  const applyFilters = () => {
    initializeTournaments();
  };

  const handleFilterChange = (event) => {
    setError(false);
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    if (!confirmBatchDeleteTournaments) {
      initializeTournaments();
      setSelectedTournaments([]);
      setSelectAllTournaments(false);
    }
  }, [confirmBatchDeleteTournaments]);

  useEffect(() => {
    initializeTournaments();
  }, []);

  return (
    <>
      <div className={confirmBatchDeleteTournaments ? "relative " : "hidden"}>
        <div className="inset-0 flex justify-center absolute z-10">
          <div className="w-full">
            {confirmBatchDeleteTournaments ? (
              <BatchDeleteConfirmationModal
                dataIDs={selectedTournaments}
                closeDeleteConfirmation={closeDeleteTournamentConfirmation}
                message={"Are you sure you want to delete these tournaments?"}
                dataType={"tournament"}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div
        className={
          tournamentEdit || deleteConfirm || confirmBatchDeleteTournaments
            ? "blur-lg min-h-[1000px] pointer-events-none"
            : ""
        }
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Tournaments</h2>
        <div className="grid grid-cols-2 gap-x-4 mb-8 p-4 rounded-[10px] bg-white drop-shadow-lg">
          <h3 className="font-semibold mb-2 col-span-2">Filter by</h3>
          <div className="">
            <label htmlFor="" className="text-[12px] font-bold">
              Tournament Name
            </label>
            <input
              type="text"
              name="tournament_name"
              value={filters.tournament_name}
              onChange={handleFilterChange}
              className="transition w-full mb-4 p-2 border-b outline-none border-gray-300 text-[12px] focus:border-black"
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-[12px] font-bold">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={filters.description}
              onChange={handleFilterChange}
              className="transition w-full mb-4 p-2 border-b outline-none border-gray-300 text-[12px] focus:border-black"
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-[12px] font-bold">
              ID
            </label>
            <input
              type="text"
              name="id"
              value={filters.id}
              onChange={handleFilterChange}
              className="transition w-full mb-4 p-2 border-b outline-none border-gray-300 text-[12px] focus:border-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="text-[12px] font-bold">
              Sport
            </label>
            <input
              type="text"
              name="sport"
              value={filters.sport}
              onChange={handleFilterChange}
              className="transition w-full mb-4 p-2 border-b outline-none border-gray-300 text-[12px] focus:border-black"
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-[12px] font-bold">
              Date Created
            </label>
            <input
              type="date"
              name="date_created__date"
              value={filters.date_created__date}
              onChange={handleFilterChange}
              className="transition w-full mb-4 p-2 border-b outline-none border-gray-300 text-[12px] focus:border-black"
            />
          </div>
          <div className="">
            <label htmlFor="" className="text-[12px] font-bold">
              Date Start
            </label>
            <input
              type="date"
              name="date_start__date"
              value={filters.date_start__date}
              onChange={handleFilterChange}
              className="transition w-full mb-4 p-2 border-b outline-none border-gray-300 text-[12px] focus:border-black"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="" className="text-[12px] font-bold">
              Date End
            </label>
            <input
              type="date"
              name="date_end__date"
              value={filters.date_end__date}
              onChange={handleFilterChange}
              className="transition w-full mb-4 p-2 border-b outline-none border-gray-300 text-[12px] focus:border-black"
            />
          </div>

          <div className="flex flex-row col-span-2 mb-4 text-[12px]">
            <button
              onClick={applyFilters}
              className="transition w-full bg-blue-600 text-white px-4 py-2 rounded-[5px] outline outline-blue-700 hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>

          <div className="flex flex-row col-span-2 mb-2 text-[12px]">
            <button
              onClick={() => {
                setError(false);
                setFilters({
                  id: "",
                  date_joined: "",
                  full_name: "",
                  email: "",
                  phone_number: "",
                  gender: "",
                  birthday: "",
                });
              }}
              className="transition w-full bg-transparent px-4 py-2 rounded-[5px] outline outline-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mb-4 p-4 rounded-[10px] bg-white drop-shadow-lg">
        <div className="">
          <span className="text-[12px]">
            {selectedTournaments.length} selected tournaments
          </span>
        </div>
        <div className="">
          <button
            onClick={() => {
              setConfirmBatchDeleteTournaments(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="transition bg-transparent outline outline-red-700 text-red-700 text-[12px] font-bold hover:bg-red-700 hover:text-white px-4 py-1 rounded-[5px]"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-[10px] drop-shadow-lg">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="">
            <tr className="text-left py-6 text-[10px]">
              <th className="py-4 px-4 border-b">
                <input
                  type="checkbox"
                  checked={selectAllTournaments}
                  onChange={() => {
                    setSelectAllTournaments(!selectAllTournaments);
                    handleSelectAllTournaments();
                  }}
                />
              </th>
              <th className="py-4 px-4 border-b">ID</th>
              <th className="py-4 px-4 border-b">BANNER</th>
              <th className="py-4 px-4 border-b">NAME</th>
              <th className="py-4 px-4 border-b">DESCRIPTION</th>
              <th className="py-4 px-4 border-b">SPORT</th>
              <th className="py-4 px-4 border-b">DATE CREATED</th>
              <th className="py-4 px-4 border-b">DATE START/END</th>
              <th className="py-4 px-4 border-b">SYSTEM</th>
              <th className="py-4 px-4 border-b">REQUIREMENTS</th>
              <th className="py-4 px-4 border-b">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {loadingTournaments ? (
              <tr className="hover:bg-gray-100 text-left text-[12px] border-b">
                <td colSpan={99} className="py-2">
                  <div
                    className={
                      loadingTournaments
                        ? "flex justify-center w-full my-5"
                        : "hidden"
                    }
                    style={{ display: loadingTournaments ? "flex" : "none" }}
                  >
                    <Loading size={5} light={true} />
                  </div>
                </td>
              </tr>
            ) : (
              tournaments.map((tournament) => (
                <tr
                  key={tournament.id}
                  className="hover:bg-gray-100 text-left text-[12px] border-b"
                  onClick={() => handleSelectedTournaments(tournament.id)}
                >
                  <td className="px-4 py-2">
                    <input
                      onChange={() => handleSelectedTournaments(tournament.id)}
                      checked={selectedTournaments.includes(tournament.id)}
                      type="checkbox"
                      className="bg-blue-700 text-blue-700"
                    />
                  </td>
                  <td className="px-4 py-2">{tournament.id}</td>
                  <td className="px-4 py-2">
                    <img
                      src={`${
                        inProduction == "true"
                          ? productionAPIURL
                          : developmentAPIURL
                      }api/tournaments${tournament.tournament_banner}`}
                      alt=""
                      className="w-12 h-12 rounded-[50%]"
                    />
                  </td>
                  <td className="px-4 py-2">{tournament.tournament_name}</td>
                  <td className="px-4 py-2">{tournament.description}</td>
                  <td className="px-4 py-2">{tournament.sport}</td>
                  <td className="px-4 py-2">
                    {" "}
                    {new Date(tournament.date_created).toDateString()}{" "}
                    {new Date(tournament.date_created).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2">
                    {`${new Date(
                      tournament.tournament_start
                    ).getDate()}-${new Date(
                      tournament.tournament_start
                    ).getMonth()}-${new Date(
                      tournament.tournament_start
                    ).getFullYear()}`}
                    {" to "}
                    {`${new Date(
                      tournament.tournament_end
                    ).getDate()}-${new Date(
                      tournament.tournament_end
                    ).getMonth()}-${new Date(
                      tournament.tournament_end
                    ).getFullYear()}`}
                  </td>
                  <td className="px-4 py-2">{tournament.bracketing_system}</td>
                  <td className="px-4 py-2">
                    <ul className="list-disc">
                      {tournament.requirements[0]
                        .split(",")
                        .map((requirement, index) => (
                          <li key={index}>{requirement}</li>
                        ))}
                    </ul>
                  </td>

                  <td className="px-4 py-2">
                    <div className="flex flex-row justify-evenly align-center">
                      <button
                        onClick={() => {
                          // handleEditUser(tournament);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="transition bg-transparent outline outline-blue-700 text-blue-700 text-[12px] font-bold hover:bg-blue-700 hover:text-white px-4 py-1 rounded-[5px]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteConfirm(true);
                          // setUserDeleteID(tournament.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={
                          tournament.is_staff
                            ? "hidden"
                            : "transition bg-transparent outline outline-red-700 text-red-700 text-[12px] font-bold hover:bg-red-700 hover:text-white px-4 py-1 rounded-[5px]"
                        }
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`${tournament.id}`)}
                        className="transition bg-transparent outline outline-green-700 text-green-700 text-[12px] font-bold hover:bg-green-700 hover:text-white px-4 py-1 rounded-[5px]"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            {!loadingTournaments && tournaments.length == 0 && !error ? (
              <tr>
                <td colSpan={99} className="py-4 text-[12px] font-bold">
                  <div className="text-center">No Tournaments</div>
                </td>
              </tr>
            ) : (
              ""
            )}
            {!loadingTournaments && error ? (
              <tr>
                <td colSpan={99} className="py-4 text-[12px] font-bold">
                  <div className="text-center">
                    Server error. Try refreshing the page.
                  </div>
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
        <div className="w-full flex flex-row justify-center my-4">
          {[...Array(totalPages)].map((p, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={
                index + 1 == page
                  ? "transition px-3 py-2 text-[12px] font-bold bg-blue-700 outline outline-blue-700 text-white rounded-[5px] mx-2 hover:bg-transparent hover:text-blue-700"
                  : "transition px-3 py-2 text-[12px] font-bold bg-transparent outline outline-blue-700 text-blue-700 rounded-[5px] mx-2 hover:bg-blue-700 hover:text-white"
              }
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

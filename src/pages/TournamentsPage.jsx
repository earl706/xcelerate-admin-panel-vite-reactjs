import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";

export default function TournamentsPage() {
  const { getTournaments } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [confirmBatchDeleteTournaments, setConfirmBatchDeleteTournaments] =
    useState(false);
  const [tournamentEdit, setTournamentEdit] = useState(false);
  const [selectAllTournaments, setSelectAllTournaments] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedTournaments, setSelectedTournaments] = useState([]);

  const [tournaments, setTournaments] = useState([]);

  const [loadingTournaments, setLoadingTournaments] = useState(false);

  const initializeTournaments = async () => {
    try {
      const tournaments_list = await getTournaments();
      console.log(tournaments_list);
      if (
        tournaments_list.status == 200 ||
        tournaments_list.statusText == "OK"
      ) {
        setTournaments(Array.from(tournaments_list.data));
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    initializeTournaments();
  }, []);

  return (
    <>
      <div
        className={
          tournamentEdit || deleteConfirm || confirmBatchDeleteTournaments
            ? "blur-lg min-h-[1000px] pointer-events-none"
            : ""
        }
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Tournaments</h2>
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
                    <LoadingComponent size={5} light={true} />
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
                      src={`http://127.0.0.1:8000/api/tournaments${tournament.tournament_banner}`}
                      alt=""
                      className="w-12 h-12 rounded-[50%]"
                    />
                  </td>
                  <td className="px-4 py-2">{tournament.tournament_name}</td>
                  <td className="px-4 py-2">{tournament.description}</td>
                  <td className="px-4 py-2">{tournament.sport}</td>
                  <td className="px-4 py-2">{tournament.date_created}</td>
                  <td className="px-4 py-2">
                    {tournament.tournament_start} {tournament.tournament_end}
                  </td>
                  <td className="px-4 py-2">{tournament.bracketing_system}</td>
                  <td className="px-4 py-2">{tournament.requirements}</td>

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
                <td colSpan={7} className="py-4 text-[12px] font-bold">
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

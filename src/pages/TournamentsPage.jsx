import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function TournamentsPage() {
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
              <th className="py-4 px-4 border-b">DATE CREATED</th>
              <th className="py-4 px-4 border-b">NAME</th>
              <th className="py-4 px-4 border-b">PHONE #</th>
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
                    <LoadingComponent size={5} light={true} />
                  </div>
                </td>
              </tr>
            ) : (
              tournaments.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 text-left text-[12px] border-b"
                  onClick={() => handleSelectedTournaments(user.id)}
                >
                  <td className="px-4 py-2">
                    <input
                      onChange={() => handleSelectedTournaments(user.id)}
                      checked={selectedTournaments.includes(user.id)}
                      type="checkbox"
                      className={
                        user.is_staff ? "hidden" : "bg-blue-700 text-blue-700"
                      }
                    />
                  </td>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">
                    {new Date(user.date_joined).toDateString()}{" "}
                    {new Date(user.date_joined).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={
                        user.is_staff
                          ? "px-2 py-1 rounded bg-blue-600 font-bold mr-2 text-white"
                          : "hidden"
                      }
                    >
                      Admin
                    </span>
                    {user.full_name}
                  </td>
                  <td className="px-4 py-2">{user.transactions.length}</td>
                  <td className="px-4 py-2">{user.phone_number}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row justify-evenly align-center">
                      <button
                        onClick={() => {
                          handleEditUser(user);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="transition bg-transparent outline outline-blue-700 text-blue-700 text-[12px] font-bold hover:bg-blue-700 hover:text-white px-4 py-1 rounded-[5px]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteConfirm(true);
                          setUserDeleteID(user.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className={
                          user.is_staff
                            ? "hidden"
                            : "transition bg-transparent outline outline-red-700 text-red-700 text-[12px] font-bold hover:bg-red-700 hover:text-white px-4 py-1 rounded-[5px]"
                        }
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`${user.id}`)}
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
                <td colSpan={7} className="py-4 text-[12px] font-bold">
                  <div className="text-center">No Users</div>
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

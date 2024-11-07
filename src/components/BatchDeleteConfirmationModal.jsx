import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";

export default function BatchDeleteConfirmationModal({
  dataIDs,
  dataType,
  message,
  closeDeleteConfirmation,
}) {
  const { deleteUsers, deleteTournaments } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const confirmDeleteData = async () => {
    setLoading(true);
    try {
      if (dataType == "user") {
        if (dataIDs.length > 0) {
          const confirm_delete_response = await deleteUsers(dataIDs);
        }
      } else if (dataType == "tournament") {
        if (dataIDs.length > 0) {
          const confirm_delete_response = await deleteTournaments(dataIDs);
          console.log(confirm_delete_response);
        }
      }
    } catch (err) {
      console.log(err);
    }

    closeDeleteConfirmation();
    setLoading(false);
  };

  useEffect(() => {
    console.log(dataIDs);
  }, []);

  return (
    <>
      <div className="bg-transparent p-5 rounded-[10px] shadow-2xl">
        <div className="w-[400px] mb-3 ">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Confirm Batch Delete
          </label>
          <span className="w-full p-2 rounded focus:outline-none focus:ring focus:ring-blue-200">
            {message}
          </span>
        </div>

        <div className="flex flex-row justify-evenly items-center">
          <button
            className="w-full transition px-4 py-2 mt-4 text-white outline outline-red-500 bg-red-500 rounded hover:bg-red-300  hover:outline hover:outline-red-300 mr-5"
            onClick={confirmDeleteData}
            disabled={loading}
          >
            <div className="flex flex-row items-center justify-center">
              <div className={loading ? "block mr-3" : "hidden"}>
                <Loading size={4} light={false} />
              </div>
              <span>Delete</span>
            </div>
          </button>
          <button
            className="w-full transition px-4 py-2 mt-4 text-black outline outline-[1px] bg-transparent rounded hover:bg-black hover:text-white mr-5"
            onClick={closeDeleteConfirmation}
          >
            <div className="flex flex-row items-center justify-center">
              <span>Close</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

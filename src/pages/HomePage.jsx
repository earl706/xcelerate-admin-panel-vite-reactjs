import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { getAdminSummary } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [summaryData, setSummaryData] = useState({
    tournaments_length: "",
    tournaments_forecast: "",
    tournaments_forecast_list: "",
    users_length: "",
    users_forecast: "",
    users_forecast_list: "",
  });

  const initializeSummaryData = async () => {
    try {
      const adminSummaryResponse = await getAdminSummary();
      setSummaryData(adminSummaryResponse.data.data);
      console.log(adminSummaryResponse);
      return adminSummaryResponse;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initializeSummaryData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">Home</h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col bg-white drop-shadow-lg rounded-[10px] py-2 px-4">
          <span className="text-center w-full font-bold text-[40px]">
            Tournaments
          </span>
          <div className="flex justify-around py-2 font-semibold">
            <span className="text-[50px] font-bold">
              {summaryData.tournaments_length}
            </span>
            <div className="flex flex-col">
              <span>
                1 Day:{" "}
                <b>
                  <span className="text-red-600">
                    {summaryData.tournaments_forecast_list[1] -
                      summaryData.tournaments_forecast_list[0]}
                    %
                  </span>
                </b>
              </span>
              <span>
                5 Days:{" "}
                <b>
                  <span className="text-green-600">+12%</span>
                </b>
              </span>
              <span>
                20 Days:{" "}
                <b>
                  <span className="text-red-600">-52%</span>
                </b>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-white drop-shadow-lg rounded-[10px] py-2 px-4">
          <span className="text-center w-full font-bold text-[40px]">
            Users
          </span>
          <div className="flex justify-around py-2 font-semibold">
            <span className="text-[50px] font-bold">
              {summaryData.users_length}
            </span>
            <div className="flex flex-col">
              <span>
                1 Day:{" "}
                <b>
                  <span className="text-red-600">-52%</span>
                </b>
              </span>
              <span>
                5 Days:{" "}
                <b>
                  <span className="text-green-600">+52%</span>
                </b>
              </span>
              <span>
                20 Days:{" "}
                <b>
                  <span className="text-red-600">-52%</span>
                </b>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-white drop-shadow-lg rounded-[10px] py-2 px-4">
          <span className="text-center w-full font-bold text-[40px]">
            Traffic
          </span>
          <div className="flex justify-around py-2 font-semibold">
            <span className="text-[50px] font-bold">12</span>
            <div className="flex flex-col">
              <span>
                1 Day:{" "}
                <b>
                  <span className="text-red-600">-52%</span>
                </b>
              </span>
              <span>
                5 Days:{" "}
                <b>
                  <span className="text-green-600">+52%</span>
                </b>
              </span>
              <span>
                20 Days:{" "}
                <b>
                  <span className="text-red-600">-52%</span>
                </b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

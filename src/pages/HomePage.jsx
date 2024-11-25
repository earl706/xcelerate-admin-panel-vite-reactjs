import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import Loading from "../components/Loading";

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
    users_growth: {
      one_day: 0,
      five_days: 0,
      twenty_days: 0,
    },
    tournaments_growth: {
      one_day: 0,
      five_days: 0,
      twenty_days: 0,
    },
  });

  const initializeSummaryData = async () => {
    try {
      setLoading(true);
      const adminSummaryResponse = await getAdminSummary();
      setSummaryData(adminSummaryResponse.data.data);
      setLoading(false);
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
              {loading ? (
                <div
                  className={
                    loading
                      ? "flex justify-center items-center h-full w-full"
                      : "hidden"
                  }
                  style={{ display: loading ? "flex" : "none" }}
                >
                  <Loading size={5} light={true} />
                </div>
              ) : (
                summaryData.tournaments_length
              )}
            </span>
            <div className="flex flex-col">
              <span className="flex flex-row items-center">
                <span>1 Day:</span>
                {loading ? (
                  <div className="ml-[5px]">
                    <Loading
                      size={5}
                      light={true}
                      style={{ marginLeft: "4px" }}
                    />
                  </div>
                ) : (
                  <b className="ml-[5px]">
                    <span
                      className={
                        summaryData.tournaments_growth.one_day == 0
                          ? ""
                          : summaryData.tournaments_growth.one_day > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {` ${
                        summaryData.tournaments_growth.one_day > 0 ? "+" : ""
                      }${summaryData.tournaments_growth.one_day}%`}
                    </span>
                  </b>
                )}
              </span>
              <span className="flex flex-row items-center">
                <span>5 Days:</span>
                {loading ? (
                  <div className="ml-[5px]">
                    <Loading
                      size={5}
                      light={true}
                      style={{ marginLeft: "4px" }}
                    />
                  </div>
                ) : (
                  <b className="ml-[5px]">
                    <span
                      className={
                        summaryData.tournaments_growth.five_days == 0
                          ? ""
                          : summaryData.tournaments_growth.five_days > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {` ${
                        summaryData.tournaments_growth.five_days > 0 ? "+" : ""
                      }${summaryData.tournaments_growth.five_days}%`}
                    </span>
                  </b>
                )}
              </span>
              <span className="flex flex-row items-center">
                <span>20 Days:</span>
                {loading ? (
                  <div className="ml-[5px]">
                    <Loading
                      size={5}
                      light={true}
                      style={{ marginLeft: "4px" }}
                    />
                  </div>
                ) : (
                  <b className="ml-[5px]">
                    <span
                      className={
                        summaryData.tournaments_growth.twenty_days == 0
                          ? ""
                          : summaryData.tournaments_growth.twenty_days > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {` ${
                        summaryData.tournaments_growth.twenty_days > 0
                          ? "+"
                          : ""
                      }${summaryData.tournaments_growth.twenty_days}%`}
                    </span>
                  </b>
                )}
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
              {loading ? (
                <div
                  className={
                    loading
                      ? "flex justify-center items-center h-full w-full"
                      : "hidden"
                  }
                  style={{ display: loading ? "flex" : "none" }}
                >
                  <Loading size={5} light={true} />
                </div>
              ) : (
                summaryData.users_length
              )}
            </span>
            <div className="flex flex-col">
              <span>
                1 Day:{" "}
                <b>
                  <span
                    className={
                      summaryData.users_growth.one_day == 0
                        ? ""
                        : summaryData.users_growth.one_day > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {summaryData.users_growth.one_day > 0 ? "+" : ""}
                    {summaryData.users_growth.one_day}%
                  </span>
                </b>
              </span>
              <span>
                5 Days:{" "}
                <b>
                  <span
                    className={
                      summaryData.users_growth.five_days == 0
                        ? ""
                        : summaryData.users_growth.five_days > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {summaryData.users_growth.five_days > 0 ? "+" : ""}
                    {summaryData.users_growth.five_days}%
                  </span>
                </b>
              </span>
              <span>
                20 Days:{" "}
                <b>
                  <span
                    className={
                      summaryData.users_growth.twenty_days == 0
                        ? ""
                        : summaryData.users_growth.twenty_days > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {summaryData.users_growth.twenty_days > 0 ? "+" : ""}
                    {summaryData.users_growth.twenty_days}%
                  </span>
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

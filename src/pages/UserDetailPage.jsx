import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Loading from "../components/Loading";

export default function UserDetailPage() {
  const { getUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    profile_picture: "",
    profile_banner: "",
    email: "",
    full_name: "",
    phone_number: "",
    gender: "",
    birthday: "",
    date_joined: "",
  });

  const getUserData = async () => {
    try {
      const user_response = await getUser(url_params.id);
      setUserData(user_response.data);
      return user_response;
    } catch (err) {
      return err;
    }
  };

  const url_params = useParams();

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-start items-center mb-6">
        <div className="mr-3 font-bold text-[20px]">
          <NavLink to="/users">←</NavLink>
        </div>
        <div className="">
          <h2 className="text-2xl font-semibold">User detail</h2>
        </div>
      </div>

      <div className="bg-white flex flex-col drop-shadow-lg rounded-[10px] px-2 py-4 mb-4">
        <div className="flex flex-col py-4 px-4">
          <span className="font-bold mb-2 text-[13px] text-center">
            Profile Picture
          </span>
          <span className="flex justify-center text-[14px]">
            {loading ? (
              <div className="flex justify-center align-center">
                <Loading size={5} light={true} />
              </div>
            ) : (
              <img
                src={`http://127.0.0.1:8000/api/users${userData.profile_picture}`}
                alt=""
                className="w-480px h-[480px] rounded-[5%]"
              />
            )}
          </span>
        </div>
        <div className="grid grid-cols-2 justify-around">
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">User Email</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                userData.email
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">User Full Name</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                userData.full_name
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">
              User Phone Number
            </span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                userData.phone_number
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">User Gender</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                userData.gender
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">User Birthday</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                userData.birthday
              )}
            </span>
          </div>
          <div className="flex flex-col py-4 px-4">
            <span className="font-bold mb-2 text-[13px]">User Created</span>
            <span className=" text-[14px]">
              {loading ? (
                <div className="flex justify-center align-center">
                  <Loading size={5} light={true} />
                </div>
              ) : (
                `${new Date(
                  userData.date_joined
                ).toLocaleDateString()} ${new Date(
                  userData.date_joined
                ).toLocaleTimeString()}`
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

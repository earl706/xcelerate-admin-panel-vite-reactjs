import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmailActivation() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center align-center w-full h-full">
        <div className="flex flex-col my-[25%] bg-indigo-50 rounded-md shadow-lg px-20 py-10">
          <span className="text-center text-lg font-bold">
            Waiting for Email verification...
          </span>
          <span className="text-center mb-5">
            Please verify your email before logging in...
          </span>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="text-center bg-blue-950 w-full hover:bg-blue-900 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline"
          >
            Back to Log In Page
          </button>
        </div>
      </div>
    </div>
  );
}

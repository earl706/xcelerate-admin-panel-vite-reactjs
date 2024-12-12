import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Activation() {
  const { uId, token } = useParams();
  const [activationResponse, setActivationResponse] = useState({
    data: "",
    status: 0,
  });

  const { activateUser } = useContext(AuthContext);

  const triggerUserActivation = async () => {
    try {
      const response = await activateUser(uId, token);
      setActivationResponse({
        data: response.data.detail ? null : response.data.token[0],
        status: response.status,
      });
      return response;
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    triggerUserActivation();
  }, []);

  return (
    <div className="flex justify-center align-center w-full h-full">
      <div className="flex flex-col my-[25%] bg-indigo-50 rounded-md shadow-lg p-10">
        <span
          className="text-center"
          style={{ display: loading ? "none" : "block" }}
        >
          ACCOUNT ACTIVATION ATTEMPTED! TRY LOGGING IN!
        </span>
      </div>
    </div>
  );
}

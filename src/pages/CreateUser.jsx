import React, { useContext, useState } from "react";
import PhoneInput from "react-phone-number-input/input";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function CreateUser() {
  const { register } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [profilePicture, setProfilePicture] = useState(null);
  const [userCreated, setUserCreated] = useState(false);
  const [userCreatedData, setUserCreatedData] = useState({
    phone_number: "",
    full_name: "",
  });
  const [userError, setUserError] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleCreateUserSubmit = async (event) => {
    event.preventDefault();

    if (
      username != "" &&
      phoneNumber != "" &&
      password != "" &&
      passwordConfirmation != "" &&
      password == passwordConfirmation
    ) {
      try {
        setLoading(true);
        const data = {
          full_name: username,
          password: password,
          phone_number: phoneNumber,
          profile_picture: profilePicture,
        };
        const register_response = await register(data);
        setUserCreatedData(register_response.data);
        if (register_response.statusText == "Created") {
          setUserCreated(true);
          setUserError(false);
          setUsername("");
          setPassword("");
          setPasswordConfirmation("");
          setPhoneNumber("");
        } else {
          setUserError(true);
          setUserErrorMessage(register_response.response.data);
        }
        setLoading(false);
        return register_response;
      } catch (err) {
        setLoading(false);
        setUserError(true);
        return err;
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Create User</h2>

      <form
        onSubmit={handleCreateUserSubmit}
        className="flex flex-col justify-center"
      >
        <div className="bg-white rounded-[10px] drop-shadow-lg px-4 pt-8 pb-4">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={(e) => {
                setUserCreated(false);
                setUserError(false);
                handleProfilePictureChange(e);
              }}
              placeholder="Username"
              className={
                userError && userErrorMessage.full_name != undefined
                  ? "transition w-full p-2 border-b border-red-600 focus:border-black focus:outline-none"
                  : "transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              }
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUserCreated(false);
                setUserError(false);
                setUsername(e.target.value);
              }}
              placeholder="Username"
              className={
                userError && userErrorMessage.full_name != undefined
                  ? "transition w-full p-2 border-b border-red-600 focus:border-black focus:outline-none"
                  : "transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              }
              required
            />
            <span
              className={
                userError ? "text-red-600 text-[15px] text-left" : "hidden"
              }
            >
              {userErrorMessage.full_name != undefined
                ? "User with this name already exists!"
                : ""}
            </span>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setUserCreated(false);
                setUserError(false);
                setPassword(e.target.value);
              }}
              placeholder="Password"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => {
                setUserCreated(false);
                setUserError(false);
                setPasswordConfirmation(e.target.value);
              }}
              placeholder="Confirm Password"
              className="transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <PhoneInput
              country="PH"
              value={phoneNumber}
              onChange={(event) => {
                setUserCreated(false);
                setUserError(false);
                setPhoneNumber(event);
              }}
              placeholder="Phone Number"
              className={
                userError && userErrorMessage.phone_number != undefined
                  ? "transition w-full p-2 border-b border-red-600 focus:border-black focus:outline-none"
                  : "transition w-full p-2 border-b border-gray-300 focus:border-black focus:outline-none"
              }
            />
            <span
              className={
                userError ? "text-red-600 text-[15px] text-left" : "hidden"
              }
            >
              {userErrorMessage.phone_number != undefined
                ? "User with this phone number already exists!"
                : ""}
            </span>
          </div>
        </div>

        <div className="flex flex-row">
          <button
            type="submit"
            className="transition py-2 mt-4 w-full text-white bg-blue-600 rounded-[6px] hover:bg-blue-700"
            disabled={loading}
          >
            <div className="flex flex-row items-center justify-center">
              <div className={loading ? "mr-2" : "hidden"}>
                <Loading size={5} light={false} />
              </div>
              <span>Create User</span>
            </div>
          </button>
        </div>
      </form>
      <div
        className={
          userCreated
            ? "flex flex-col rounded-[10px] py-6 px-10 my-4 bg-transparent bg-white drop-shadow-lg"
            : "hidden"
        }
      >
        <span className="text-green-600 text-center font-bold">
          Created User Successfully!
        </span>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col w-full">
            <ul className="list-disc text-green-600">
              <li>
                Full name:{" "}
                <span className="font-bold">
                  {userCreated ? userCreatedData.full_name : ""}
                </span>
              </li>
              <li>
                Phone number:{" "}
                <span className="font-bold">
                  {userCreated ? userCreatedData.phone_number : ""}
                </span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setUserCreated(false)}
            className="bg-transparent outline-none"
          >
            ✖
          </button>
        </div>
      </div>
    </>
  );
}

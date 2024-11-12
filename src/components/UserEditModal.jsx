import React, { useState } from "react";
import PhoneInput from "react-phone-number-input/input";

export default function UserEditModal({ user, closeUserEdit }) {
  const [loading, setLoading] = useState(false);

  const [userCreated, setUserCreated] = useState(false);
  const [userError, setUserError] = useState(false);

  const [profilePicture, setProfilePicture] = useState(user.profile_picture);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState(user.email);
  const [fullName, setFullName] = useState(user.full_name);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number);
  const [gender, setGender] = useState(user.gender);
  const [birthday, setBirthday] = useState(user.birthday);

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("User edit");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-transparent p-5 rounded-[10px] shadow-2xl">
        <div className="flex flex-row justify-between items-center mb-5">
          <div className="">
            <h2 className="text-2xl font-semibold ">Edit User</h2>
          </div>
          <div className="mt-3 mr-3">
            <button onClick={closeUserEdit}>
              <span>✖</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleEditUserSubmit}>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <PhoneInput
              country="PH"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event)}
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Enter Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-3">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Current password is required (Leave blank to retain current password)"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Current password is required (Leave blank to retain current password)"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Gender
            </label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Gender"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Birthday
            </label>
            <input
              type="text"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-row justify-center">
            <button
              type="submit"
              className="px-4 py-2 mt-4 w-1/2 text-white mx-2 bg-blue-600 rounded hover:bg-blue-700"
              disabled={loading}
            >
              <div className="flex flex-row items-center justify-center">
                <div
                  className={
                    loading
                      ? "border-gray-300 h-5 w-5 animate-spin rounded-full border-4 border-t-transparent"
                      : "border-transparent h-5 w-5 animate-spin rounded-full border-4"
                  }
                />
                <span className="ml-3">Edit User</span>
              </div>
            </button>
            <button
              className="w-1/2 transition px-4 py-2 mt-4 mx-2 text-black outline outline-[1px] bg-transparent rounded hover:bg-black hover:text-white mr-5"
              disabled={loading}
              onClick={closeUserEdit}
            >
              <div className="flex flex-row items-center justify-center">
                <span>Cancel</span>
              </div>
            </button>
          </div>
        </form>
        <div
          className={
            userCreated
              ? "flex flex-row justify-between items-center rounded-[5px] w-full py-2 px-4 my-4 bg-transparent outline outline-green-400"
              : "hidden"
          }
        >
          <span className="text-green-600 text-center">
            Updated User Successfully!
          </span>
          <button
            onClick={() => setUserCreated(false)}
            className="bg-transparent outline-none"
          >
            ✖
          </button>
        </div>
        <div
          className={
            userError
              ? "flex flex-row justify-between items-center rounded-[5px] w-[40%] py-2 px-4 my-4 bg-transparent outline outline-red-400"
              : "hidden"
          }
        >
          <span className="text-red-600 text-center">User Edit Error!</span>
          <button
            onClick={() => setUserError(false)}
            className="bg-transparent outline-none text-red-600"
          >
            <span className="text-red-600">✖</span>
          </button>
        </div>
      </div>
    </>
  );
}

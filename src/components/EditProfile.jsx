import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ToastContainer, toast } from 'react-toastify';

const EditProfile = ({ user }) => {
  console.log("my name", user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender);
  const _id = user._id;
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data))
      toast("Profile edited successfully!!");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex justify-center gap-5 my-10">
      <div className="flex justify-center">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name:</legend>
                <input
                  value={firstName}
                  type="text"
                  className="input"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  value={lastName}
                  type="text"
                  className="input"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About:</legend>
                <input
                  value={about}
                  type="text"
                  className="input"
                  placeholder="About"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender:</legend>
                <input
                  value={gender}
                  type="text"
                  className="input"
                  placeholder="About"
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
            </div>
            <div className="card-actions justify-end">
              <button onClick={saveProfile} className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, gender, _id }} />
      <ToastContainer/>
    </div>
  );
};

export default EditProfile;

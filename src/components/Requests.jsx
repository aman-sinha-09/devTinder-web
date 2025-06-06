import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      // Handle error
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center font-bold text-xl">No Requests found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, about } = request.fromUserId;
        return (
          <div
            key={_id}
            className="bg-base-300 m-4 p-4 text-left rounded-lg flex justify-around"
          >
            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
            <h3>{about}</h3>
            <button
              onClick={() => reviewRequest("rejected", request._id)}
              className="btn btn-primary"
            >
              Reject
            </button>
            <button
              onClick={() => reviewRequest("accepted", request._id)}
              className="btn btn-secondary"
            >
              Accept
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

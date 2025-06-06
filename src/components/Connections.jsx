import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Connections</h1>
      {
        connections.map((connection)=>{
            const {_id, firstName, lastName, about} = connection
            return(
                <div key={_id} className="bg-base-300 m-4 p-4 text-left rounded-lg flex justify-around">
                <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                <h3>{about}</h3>
            </div>
            )
            
        })
      }
    </div>
  );
};

export default Connections;

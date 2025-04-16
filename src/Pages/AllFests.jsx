import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { FestContext } from "../Contexts/FestContext";
import { Link } from "react-router-dom";

export const AllFests = () => {
  const { fest, handleDeleteFest } = useContext(FestContext);
  console.log(fest);

  return (
    <>
      <h2>All Festivals</h2>
      {fest.map((oneFest) => {
        return (
          <div key={oneFest._id} className="one-fest-card">
            <button onClick={() => handleDeleteFest(oneFest._id)}>
              Delete
            </button>
            <h3>FestName: {oneFest.festName}</h3>
            <h3>Location: {oneFest.location}</h3>
            <h3>Duration: {oneFest.duration}</h3>
            <Link to={`/update/${oneFest._id}`}>
              <button>Update</button>
            </Link>
          </div>
        );
      })}
    </>
  );
};

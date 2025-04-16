import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { FestContext } from "../Contexts/FestContext";

export const AllFests = () => {
  const { fest } = useContext(FestContext);
  console.log(fest);

  return (
    <>
      <h2>all festivals</h2>
      {fest.map((oneFest) => {
        return (
          <div key={oneFest._id} className="one-fest-card">
            <h3>festName: {oneFest.festName}</h3>
            <h3>Location: {oneFest.location}</h3>
            <h3>duration: {oneFest.duration}</h3>
          </div>
        );
      })}
    </>
  );
};

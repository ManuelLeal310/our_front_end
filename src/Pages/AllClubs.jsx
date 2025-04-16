import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { ClubContext } from "../Contexts/ClubContext";
import { Link } from "react-router-dom";

export const AllClubs = () => {
  const { club, handleDeleteClub } = useContext(ClubContext);
  console.log(club);

  return (
    <>
      <h2>All Clubs</h2>
      {club.map((oneClub) => {
        return (
          <div key={oneClub._id} className="one-club-card">
            <button onClick={() => handleDeleteClub(oneClub._id)}>
              Delete
            </button>
            <h3>ClubName: {oneClub.clubName}</h3>
            <h3>Location: {oneClub.location}</h3>
            <h3>Style: {oneClub.style}</h3>
            <h3>Date: {oneClub.date}</h3>

            <Link to={`/club/update/${oneClub._id}`}>
              <button>Update</button>
            </Link>
          </div>
        );
      })}
    </>
  );
};

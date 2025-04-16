import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClubContext = createContext();

const ClubContextWrapper = ({ children }) => {
  const [club, setClub] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getAllClub();
  }, []);

  function getAllClub() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/club/read`)
      .then((res) => {
        console.log("All the clubs:", res.data);
        setClub(res.data);
      })
      .catch((err) => {
        console.log("Error fetching clubs:", err);
      });
  }

  async function handleCreateClub(event, aClub) {
    event.preventDefault();

    const clubToCreate = {
      clubName: aClub.clubName,

      location: aClub.location,
      date: aClub.date,
      duration: aClub.duration,
      style: aClub.style,

      lineUp: aClub.lineUp,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/club/create`,
        clubToCreate
      );
      console.log("Club created:", data);
      setClub([data, ...club]);
      nav("/club");
    } catch (error) {
      console.log("Error creating club:", error);
    }
  }

  function handleDeleteClub(clubId) {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/club/delete/${clubId}`)
      .then((res) => {
        console.log("Club removed from DB:", res);
        const filteredClub = club.filter((f) => f._id !== clubId);
        setClub(filteredClub);
      })
      .catch((err) => {
        console.log("Error deleting club:", err);
      });
  }
  function handleUpdateClub(clubId, clubToUpdate) {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/club/update/${clubId}`,
        clubToUpdate
      )
      .then((res) => {
        console.log("Club updated:", res.data);
        const updatedClub = club.map((f) =>
          c._id === clubId ? { ...club, ...res.data } : f
        );
        setClub(updatedClub);
      })
      .catch((err) => {
        console.log("Error updating club:", err);
      });
  }

  return (
    <ClubContext.Provider
      value={{
        club,
        setClub,
        handleCreateClub,
        handleDeleteClub,
        handleUpdateClub,
      }}
    >
      {children}
    </ClubContext.Provider>
  );
};

export { ClubContext, ClubContextWrapper };

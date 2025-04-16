import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FestContext = createContext();

const FestContextWrapper = ({ children }) => {
  const [fest, setFest] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getAllFest();
  }, []);

  function getAllFest() {
    axios
      .get(`${import.meta.env.VITE_API_URL}/fest/read`)
      .then((res) => {
        console.log("All the festivals:", res.data);
        setFest(res.data);
      })
      .catch((err) => {
        console.log("Error fetching festivals:", err);
      });
  }

  async function handleCreateFest(event, aFest) {
    event.preventDefault();

    const festToCreate = {
      festName: aFest.festName,

      location: aFest.location,
      date: aFest.date,
      duration: aFest.duration,
      style: aFest.style,

      lineUp: aFest.lineUp,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/fest/create`,
        festToCreate
      );
      console.log("Festival created:", data);
      setFest([data, ...fest]);
      nav("/fest");
    } catch (error) {
      console.log("Error creating festival:", error);
    }
  }

  function handleDeleteFest(festId) {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/delete/${festId}`)
      .then((res) => {
        console.log("Festival removed from DB:", res);
        const filteredFest = fest.filter((f) => f._id !== festId);
        setFest(filteredFest);
      })
      .catch((err) => {
        console.log("Error deleting festival:", err);
      });
  }
  function handleUpdateFest(festId, festToUpdate) {
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/fest/update/${festId}`,
        festToUpdate
      )
      .then((res) => {
        console.log("Festival updated:", res.data);
        const updatedFest = fest.map((f) =>
          f._id === festId ? { ...fest, ...res.data } : f
        );
        setFest(updatedFest);
      })
      .catch((err) => {
        console.log("Error updating festival:", err);
      });
  }

  return (
    <FestContext.Provider
      value={{
        fest,
        setFest,
        handleCreateFest,
        handleDeleteFest,
      }}
    >
      {children}
    </FestContext.Provider>
  );
};

export { FestContext, FestContextWrapper };

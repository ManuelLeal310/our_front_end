import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const FestContext = createContext();

export const FestProvider = ({ children }) => {
  const [fest, setFest] = useState([]);

  const fetchFests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/festivals/read");
      setFest(res.data);
    } catch (err) {
      console.error("Error fetching festivals:", err);
    }
  };

  const handleDeleteFest = async (festId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(
        `http://localhost:5000/api/festivals/delete/${festId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFest((prev) => prev.filter((filter) => filter._id !== festId));
    } catch (err) {
      console.error("Error deleting fest:", err.response?.data || err.message);
      alert("You are not authorized to delete this festival.");
    }
  };

  useEffect(() => {
    fetchFests();
  }, []);

  return (
    <FestContext.Provider value={{ fest, handleDeleteFest }}>
      {children}
    </FestContext.Provider>
  );
};
export default FestContext;

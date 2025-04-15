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
        console.log("all the festivals", res);
        setFest(res.data.allFest);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function handleCreateFest(event, aFest) {
    aFest.festName = aFest.festName.split(",");

    const myFormData = new FormData();
    myFormData.append("festName", aFest.festName);
    myFormData.append("location", aFest.location);
    myFormData.append("date", aFest.date);
    myFormData.append("duration", aFest.duration);
    myFormData.append("style", aFest.style);
    myFormData.append("lineUp", aFest.lineUp);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/fest/create`,
        myFormData
      );
      console.log("festival created", data);
      setFest([data, ...fest]);
      nav("/all-fest");
    } catch (error) {
      console.log(error);
    }
  }
  function handleDeleteFest(festId) {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/delete/${festId}`)
      .then((res) => {
        console.log("fest removed from DB", res);
        const filteredFest = fest.filter((fest) => {
          if (fest._id !== festId) {
            return true;
          }
        });
        setFest(filteredFest);
      })
      .catch((err) => {
        console.log(err);
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

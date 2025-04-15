import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FestContext } from "../Contexts/FestContext";

export const EditFest = () => {
  const [festName, setFestName] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [style, setStyle] = useState("");
  const [lineUp, setLineUp] = useState("");
  const { festId } = useParams();
  const { fest, setFest } = useContext(FestContext);
  const nav = useNavigate();

  useEffect(() => {
    function getOneFest() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/fest/read/${festId}`)
        .then((res) => {
          console.log("here is one fest", res.data);
          setFestName(res.data.title);
          setLocation(res.data.location);
          setDuration(res.data.duration);
          setStyle(res.data.style);
          setLineUp(res.data.lineUp);
        })
        .catch((err) => console.log(err));
    }
    getOneFest();
  }, [festId]);

  function handleUpdateFest(event) {
    event.preventDefault();
    const updatedFest = {
      festName,
      location,
      duration,
      style,
      lineUp: lineUp.split(","),
    };
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/fest/update/${festId}`,
        updatedFest
      )
      .then((res) => {
        const newFestArray = fest.map((oneFest) => {
          if (oneFest._id === festId) {
            return res.data;
          } else {
            return oneFest;
          }
        });
        console.log("new fest array");
        setFest(newFestArray);
        nav("/update");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h3>Edit Fest</h3>
      <form onSubmit={handleUpdateFest}>
        <label>
          festName:
          <input
            type="text"
            value={festName}
            onChange={(e) => setFestName(e.target.value)}
          />
        </label>
        <label>
          location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          duration:
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <label>
          style:
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
        </label>
        <label>
          lineUp: (separate each artist with comma)
          <input
            type="text"
            value={lineUp}
            onChange={(e) => setLineUp(e.target.value)}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
};

export default EditFest;

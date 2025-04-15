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

  // Fetch the festival details when the page loads
  useEffect(() => {
    function getOneFest() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/fest/read/${festId}`)
        .then((res) => {
          console.log("Fetched festival data:", res.data);
          setFestName(res.data.festName); // Ensure this matches the backend field names
          setLocation(res.data.location);
          setDuration(res.data.duration);
          setStyle(res.data.style);
          setLineUp(res.data.lineUp.join(",")); // If lineUp is an array, join it with commas
        })
        .catch((err) => console.log("Error fetching festival:", err));
    }
    getOneFest();
  }, [festId]);

  // Handle the form submission for updating the festival
  function handleUpdateFest(event) {
    event.preventDefault();

    const updatedFest = {
      festName,
      location,
      duration,
      style,
      lineUp: lineUp.split(","), // Split back into an array on submission
    };

    axios
      .put(`${import.meta.env.VITE_API_URL}/fest/update/${festId}`, updatedFest)
      .then((res) => {
        // Update the festival in the context state after successful update
        const updatedFestivals = fest.map((oneFest) =>
          oneFest._id === festId ? res.data : oneFest
        );
        setFest(updatedFestivals);
        nav("/fests"); // Navigate to all festivals page after update
      })
      .catch((err) => {
        console.error("Error updating festival:", err);
      });
  }

  return (
    <div>
      <h3>Edit Festival</h3>
      <form onSubmit={handleUpdateFest}>
        <label>
          Fest Name:
          <input
            type="text"
            value={festName}
            onChange={(e) => setFestName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <br />
        <label>
          Style:
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Line-up (separate artists with commas):
          <input
            type="text"
            value={lineUp}
            onChange={(e) => setLineUp(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update Festival</button>
      </form>
    </div>
  );
};

export default EditFest;

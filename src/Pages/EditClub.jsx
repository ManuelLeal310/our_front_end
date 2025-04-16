import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ClubContext } from "../Contexts/ClubContext";

export const EditClub = () => {
  const [clubName, setClubName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [style, setStyle] = useState("");
  const [lineUp, setLineUp] = useState("");
  const { clubId } = useParams();
  const { club, setClub } = useContext(ClubContext);
  const nav = useNavigate();

  useEffect(() => {
    function getOneClub() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/club/read/${clubId}`)
        .then((res) => {
          console.log("Fetched club data:", res.data);
          setClubName(res.data.clubName);
          setLocation(res.data.location);
          setDate(res.data.date);
          setStyle(res.data.style);
          setLineUp(res.data.lineUp);
        })
        .catch((err) => console.log("Error fetching club:", err));
    }
    getOneClub();
  }, [clubId]);

  function handleUpdateClub(event) {
    event.preventDefault();

    const updatedClub = {
      clubName,
      location,
      date,
      style,
      lineUp,
    };

    axios
      .put(`${import.meta.env.VITE_API_URL}/club/update/${clubId}`, updatedClub)
      .then((res) => {
        const updatedClub = club.map((oneClub) =>
          oneClub._id === clubId ? res.data : oneClub
        );
        setClub(updatedClub);
        nav("/club");
      })
      .catch((err) => {
        console.error("Error updating club:", err);
      });
  }

  return (
    <div>
      <h3>Edit Club</h3>
      <form onSubmit={handleUpdateClub}>
        <label>
          Club Name:
          <input
            type="text"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
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
          Date:
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

export default EditClub;

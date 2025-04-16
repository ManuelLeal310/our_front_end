import { useContext, useState } from "react";
import { ClubContext } from "../Contexts/ClubContext";
import { AuthContext } from "../Contexts/AuthContext";

export const CreateClub = () => {
  const [clubName, setClubName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [style, setStyle] = useState("");
  const [lineUp, setLineUp] = useState("");
  const { handleCreateClub } = useContext(ClubContext);
  const { currentAdmin } = useContext(AuthContext);

  const handleLineUpChange = (e) => {
    const value = e.target.value;
    setLineUp(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!clubName || !location || !date || !style || !lineUp) {
      alert("All fields are required!");
      return;
    }

    const lineUpArray = lineUp.split(",").map((artist) => artist.trim());

    const clubData = {
      clubName,
      location,
      date,
      style,
      lineUp,
      adminId: currentAdmin.id,
    };

    handleCreateClub(event, clubData);
  };

  return (
    <div>
      <h2>Create Club</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Club Name:
          <input
            type="text"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Style:
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Line-Up (separate each artist with a comma):
          <input
            type="text"
            value={lineUp}
            onChange={handleLineUpChange}
            required
          />
        </label>
        <br />
        <button type="submit">Create Club</button>
      </form>
    </div>
  );
};

export default CreateClub;

import { useContext, useState } from "react";
import { FestContext } from "../Contexts/FestContext";
import { AuthContext } from "../Contexts/AuthContext";

export const CreateFest = () => {
  const [festName, setFestName] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [style, setStyle] = useState("");
  const [lineUp, setLineUp] = useState("");
  const { handleCreateFest } = useContext(FestContext);
  const { currentAdmin } = useContext(AuthContext);

  const handleLineUpChange = (e) => {
    const value = e.target.value;
    setLineUp(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!festName || !location || !duration || !style || !lineUp) {
      alert("All fields are required!");
      return;
    }

    const lineUpArray = lineUp.split(",").map((artist) => artist.trim());

    const festData = {
      festName,
      location,
      duration,
      style,
      lineUp,
      adminId: currentAdmin.id,
    };

    handleCreateFest(event, festData);
  };

  return (
    <div>
      <h2>Create Festival</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Fest Name:
          <input
            type="text"
            value={festName}
            onChange={(e) => setFestName(e.target.value)}
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
          Duration:
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
        <button type="submit">Create Festival</button>
      </form>
    </div>
  );
};

export default CreateFest;

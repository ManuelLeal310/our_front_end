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
  return (
    <div>
      <h2>Create Fest</h2>
      <form
        onSubmit={(event) => {
          handleCreateFest(event, {
            festName,
            location,
            duration,
            style,
            lineUp,
          });
        }}
      />
      <label>
        festName:
        <input
          type="text"
          value={title}
          onChange={(e) => setFestName(e.target.value)}
        />
      </label>
      <label>
        location:
        <input type="text" onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        duration:
        <input type="text" onChange={(e) => setDuration(e.target.value)} />
      </label>
      <label>
        style:
        <input type="text" onChange={(e) => setStyle(e.target.value)} />
      </label>
      <label>
        lineUp: (separate each artist with comma)
        <input type="text" onChange={(e) => setLineUp(e.target.value)} />
      </label>
    </div>
  );
};

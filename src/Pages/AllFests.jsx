import { useContext } from "react";
import { FestContext } from "../Contexts/FestContext";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

export const AllFests = () => {
  const { fest, handleDeleteFest } = useContext(FestContext);
  const { currentAdmin } = useContext(AuthContext);

  return (
    <div className="admin-page">
      <h2>All our festivals</h2>
      {fest.map((oneFest) => {
        return (
          <div key={oneFest._id} className="fest-card">
            <h3>FestName: {oneFest.festName}</h3>
            <h3>Location: {oneFest.location}</h3>
            <h3>Duration: {oneFest.duration}</h3>
            <h3>Style: {oneFest.style}</h3>
            <h3>LineUp</h3>
            <ul>
              {oneFest.lineUp.map((oneLineUp, index) => {
                return <li key={index}>{oneLineUp}</li>;
              })}
            </ul>
            {oneFest.owner._id === currentAdmin?._id ? (
              <section>
                <Link to={`/edit/${oneFest._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteFest(oneFest._id)}>
                  Delete
                </button>
              </section>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

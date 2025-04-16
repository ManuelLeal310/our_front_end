import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Admin() {
  const { currentAdmin, isLoggedIn, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/admin/verify`, {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       navigate("/login");
  //     });
  // });

  // useEffect(() => {
  //   axios
  //   .get(`${import.meta.env.VITE_API_URL}/admin/verify ${currentAdmin._id}`)
  //   .then((res) => {
  //     console.log(res.data);
  //     setCurrentAdmin(res.data);
  //   })
  //   catch ((err)=>{
  //     console.log(err);
  //   });

  // },[currentAdmin]);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/verify/${currentAdmin._id}`
        );
        console.log(res.data);
        setCurrentAdmin(res.data);
      } catch (err) {
        console.error("Error verifying admin:", err);
      }
    };

    if (currentAdmin?._id) {
      verifyAdmin();
    }
  }, []);

  return (
    <div className="admin-page">
      <h2>{currentAdmin && currentAdmin.adminName}'s Profile</h2>

      <div className="admin-buttons">
        <Link to="/create">
          <button>Create Festival</button>
        </Link>

        <Link to="/read/:festId">
          <button>All Festivals</button>
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Admin;

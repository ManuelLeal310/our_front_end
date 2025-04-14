import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

function Admin() {
  // const { name } = useContext(AuthContext);
  console.log("Here is the name on the admin page from the context", name);
  return <div>Profile</div>;
}

export default Admin;

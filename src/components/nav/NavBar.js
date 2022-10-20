import { useNavigate } from "react-router-dom";
import { CustomerNav } from "./CustomerNav";
import { EmployeeNav } from "./EmployeeNav";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObj = JSON.parse(localHoneyUser);

  if (honeyUserObj.staff) {
    // Return employee navbar
    return <EmployeeNav />;
  } else {
    // Return customer navbar
    return <CustomerNav />;
  }
};

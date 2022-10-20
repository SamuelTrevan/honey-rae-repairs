import { CustomerForm } from "./CustomerForm";
import { EmployeeForm } from "./EmployeeForm";

export const Profile = () => {
  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObj = JSON.parse(localHoneyUser);

  if (honeyUserObj.staff) {
    return <EmployeeForm />;
  } else {
    return <CustomerForm />;
  }
};

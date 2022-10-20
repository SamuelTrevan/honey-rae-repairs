import { CustomerViews } from "./CustomerViews";
import { EmployeeViews } from "./EmployeeViews";

export const ApplicationViews = () => {
  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObj = JSON.parse(localHoneyUser);

  if (honeyUserObj.staff) {
    // Return employee views
    return <EmployeeViews />;
  } else {
    // Return customer views
    return <CustomerViews />;
  }
};

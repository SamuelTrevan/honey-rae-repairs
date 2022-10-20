import { Outlet, Route, Routes } from "react-router-dom";
import { EmployeeDetails } from "../employees/EmployeeDetails";
import { EmployeeList } from "../employees/employeeList";
import { TicketContainer } from "../tickets/TicketContainer";
import { CustomerDetails } from "../customers/CustomerDeatails";
import { TicketForm } from "../tickets/TicketForm";
import { CustomerList } from "../customers/CustomerList";

export const EmployeeViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>Honey Rae Repair Shop</h1>
            <div>Your one-stop-shop to get all your electronics fixed</div>

            <Outlet />
          </>
        }
      >
        <Route path="tickets" element={<TicketContainer />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/:employeeId" element={<EmployeeDetails />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/:customerId" element={<CustomerDetails />} />
      </Route>
    </Routes>
  );
};

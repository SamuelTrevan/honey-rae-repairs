import { useEffect, useState } from "react";
import { Customer } from "./customers";
import "./Customers.css";

export const CustomerList = () => {
  const [customers, setCustomer] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/users?isStaff=false`)
      .then((response) => response.json())
      .then((customerArray) => {
        setCustomer(customerArray);
      });
  }, []);

  return (
    <article className="customers">
      {customers.map((customer) => (
        <Customer
          key={`customer--${customer.id}`}
          id={customer.id}
          fullName={customer.fullName}
          email={customer.email}
        />
      ))}
    </article>
  );
};

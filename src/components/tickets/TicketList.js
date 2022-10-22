import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ticket } from "./Ticket";
import "./Tickets.css";

export const TicketList = ({ searchTermState }) => {
  const [tickets, setTickets] = useState([]);
  const [employees, setEmployee] = useState([]);
  const [filteredTickets, setFiltered] = useState([]);
  const [emergency, setEmergency] = useState(false);
  const [openOnly, updateOpenOnly] = useState(false);
  const navigate = useNavigate();

  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObj = JSON.parse(localHoneyUser);

  //Chapter nine
  useEffect(() => {
    const searchedTickets = tickets.filter((ticket) => {
      return ticket.description
        .toLowerCase()
        .startsWith(searchTermState.toLowerCase());
    });
    setFiltered(searchedTickets);
  }, [searchTermState]);

  useEffect(() => {
    if (emergency) {
      const emergencyTickets = tickets.filter(
        (ticket) => ticket.emergency === true
      );
      setFiltered(emergencyTickets);
    } else {
      setFiltered(tickets);
    }
  }, [emergency]);

  const getAllTickets = () => {
    fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`)
      .then((response) => response.json())
      .then((ticketArray) => {
        setTickets(ticketArray);
      });
  };

  useEffect(
    () => {
      getAllTickets();
      fetch(`http://localhost:8088/employees?_expand=user`)
        .then((response) => response.json())
        .then((employeeArray) => {
          setEmployee(employeeArray);
        });
    },
    [] // When this array is empty, you are observing initial component state
  );

  useEffect(() => {
    if (honeyUserObj.staff) {
      setFiltered(tickets);
    } else {
      const myTickets = tickets.filter(
        (ticket) => ticket.userId === honeyUserObj.id
      );
      setFiltered(myTickets);
    }
  }, [tickets]);

  useEffect(() => {
    if (openOnly) {
      const openTicketArray = tickets.filter((ticket) => {
        return ticket.userId === honeyUserObj.id && ticket.dateCompleted == "";
      });
      setFiltered(openTicketArray);
    } else {
      const myTickets = tickets.filter(
        (ticket) => ticket.userId === honeyUserObj.id
      );
      setFiltered(myTickets);
      // const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObj.id)
      // setFiltered(myTickets)
    }
  }, [openOnly]);
  return (
    <>
      {honeyUserObj.staff ? (
        <>
          <button onClick={() => setEmergency(true)}>Emergency Only</button>
          <button onClick={() => setEmergency(false)}>Show All</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/ticket/create")}>
            Create Ticket
          </button>
          <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
          <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
        </>
      )}
      <h2>List of Tickets</h2>

      <div className="tickets">
        {filteredTickets.map((ticket) => (
          <Ticket
            employees={employees}
            currentUser={honeyUserObj}
            ticketObject={ticket}
            getAllTickets={getAllTickets}
          />
        ))}
      </div>
    </>
  );
};

import { Link } from "react-router-dom";

export const Ticket = ({
  ticketObject,
  currentUser,
  employees,
  getAllTickets,
}) => {
  let assigneedEmployee = null;
  if (ticketObject.employeeTickets.length > 0) {
    const ticketEmployeeRelationship = ticketObject.employeeTickets[0];
    assigneedEmployee = employees.find(
      (employee) => employee.id === ticketEmployeeRelationship.employeeId
    );
  }

  const userEmployee = employees.find(
    (employee) => employee.userId === currentUser.id
  );

  const buttonOrNoButton = () => {
    if (currentUser.staff) {
      return (
        <button
          onClick={() => {
            fetch(`http://localhost:8088/employeeTickets`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                employeeId: userEmployee.id,
                serviceTicketId: ticketObject.id,
              }),
            })
              .then((response) => response.json())
              .then(() => {
                getAllTickets();
              });
          }}
        >
          claim
        </button>
      );
    } else {
      return "";
    }
  };

  return (
    <div key={ticketObject.id} className="ticket">
      <header>
        {currentUser.staff ? (
          `Ticket ${ticketObject.id}`
        ) : (
          <Link to={`/tickets/${ticketObject.id}/edit`}>
            Ticket {ticketObject.id}
          </Link>
        )}
      </header>
      <section>{ticketObject.description}</section>
      <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
      <footer>
        {ticketObject.employeeTickets.length
          ? `currently being worked on ${
              assigneedEmployee !== null
                ? assigneedEmployee?.user?.fullName
                : ""
            }`
          : buttonOrNoButton()}
      </footer>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const DepartmentEvent = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    department: "",
    date: "",
    images: "",
    description: "",
    type: "Other",
    status: "pending", // Default status for new events
  });

  useEffect(() => {
    // Fetch all events on component load
    axios
      .get("http://localhost:8088/events/allevent")
      .then((response) => setEvents(response.data))
      .catch((error) =>
        console.error("There was an error fetching the events!", error)
      );
  }, []);

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8088/events/addevent", newEvent)
      .then((response) => {
        setEvents([...events, response.data]);
        setNewEvent({
          name: "", 
          department: "",
          date: "",
          images: "",
          description: "",
          type: "Other",
          status: "pending", // Reset status to default after adding event
        });
      })
      .catch((error) =>
        console.error("There was an error adding the event!", error)
      );
  };

  const handleDeleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:8088/events/deleteevent/${eventId}`)
      .then(() => {
        setEvents(events.filter((event) => event._id !== eventId));
      })
      .catch((error) =>
        console.error("There was an error deleting the event!", error)
      );
  };

  const handleUpdateEvent = (eventId) => {
    const updatedEvent = events.find((event) => event._id === eventId);
    axios
      .patch(
        `http://localhost:8088/events/updateevent/${eventId}`,
        updatedEvent
      )
      .then((response) => {
        setEvents(
          events.map((event) => (event._id === eventId ? response.data : event))
        );
      })
      .catch((error) =>
        console.error("There was an error updating the event!", error)
      );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Department Events</h2>

      {/* Display Past Events */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h3 className="card-title mb-0">Past Events</h3>
        </div>
        <div className="card-body">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Event Name</th>
                <th scope="col">Department</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{event.department}</td>
                  <td>{event.date}</td>
                  <td>{event.description}</td>
                  <td>{event.type}</td>
                  <td>
                    <span
                      className={`badge ${
                        event.status === "approved"
                          ? "badge-success"
                          : event.status === "rejected"
                          ? "badge-danger"
                          : "badge-warning"
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => handleUpdateEvent(event._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteEvent(event._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Event */}
      <div className="card">
        <div className="card-header bg-success text-white">
          <h3 className="card-title mb-0">Add New Event</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleAddEvent}>
            <div className="form-group">
              <label htmlFor="name">Event Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newEvent.name}
                onChange={handleInputChange}
                placeholder="Enter event name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <input
                type="text"
                className="form-control"
                id="department"
                name="department"
                value={newEvent.department}
                onChange={handleInputChange}
                placeholder="Enter department name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="images">Image URL:</label>
              <input
                type="text"
                className="form-control"
                id="images"
                name="images"
                value={newEvent.images}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Enter event description"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Event Type:</label>
              <select
                className="form-control"
                id="type"
                name="type"
                value={newEvent.type}
                onChange={handleInputChange}
                required
              >
                <option value="Seminar">Seminar</option>
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepartmentEvent;

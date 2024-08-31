import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DepartmentEvent = () => {
  const [events, setEvents] = useState([
    { id: 1, name: 'Orientation Program', date: '2024-01-15', description: 'An orientation program for new students.' },
    { id: 2, name: 'Annual Tech Fest', date: '2024-03-10', description: 'The department\'s annual technical festival.' },
  ]);

  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '' });

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.name && newEvent.date && newEvent.description) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      setNewEvent({ name: '', date: '', description: '' });
    }
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
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.description}</td>
                  <td>
                    <button className="btn btn-warning btn-sm mr-2">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
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
            <button type="submit" className="btn btn-success">Add Event</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DepartmentEvent;

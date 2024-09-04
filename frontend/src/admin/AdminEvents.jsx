import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8088/events/allevent")
      .then((res) => {
        setEvents(res.data);
        setFilteredEvents(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const delEvent = (id) => {
    axios
      .delete(`http://localhost:8088/events/deleteevent/${id}`)
      .then((res) => {
        toast.success("Event deleted successfully");
        setEvents(events.filter((e) => e._id !== id));
        setFilteredEvents(filteredEvents.filter((e) => e._id !== id));
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting event");
      });
  };

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const CutContent = (content, maxLength) => {
    const strippedContent = content.replace(/<[^>]+>/g, "");
    if (strippedContent.length > maxLength) {
      return strippedContent.substring(0, maxLength) + "...";
    }
    return strippedContent;
  };

  const handleView = (event) => {
    navigate("/events/view", { state: { action: "view", data: event } });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = events.filter(
      (event) =>
        event.name.toLowerCase().includes(value) ||
        event.department.toLowerCase().includes(value) ||
        event.description.toLowerCase().includes(value) ||
        event.type.toLowerCase().includes(value)
    );
    setFilteredEvents(filtered);
  };

  const handleStatusChange = (id, newStatus) => {
    axios
      .patch(`http://localhost:8088/events/updateevent/${id}`, {
        status: newStatus,
      })
      .then((res) => {
        toast.success(`Event ${newStatus} successfully`);
        setEvents(
          events.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
        );
        setFilteredEvents(
          filteredEvents.map((e) =>
            e._id === id ? { ...e, status: newStatus } : e
          )
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Error updating event status to ${newStatus}`);
      });
  };

  return (
    <div className="container-fluid">
      <ToastContainer position="top-center" />
      <div className="col-lg-12">
        <div className="row mb-4 mt-4">
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title, Department, Description, or Type"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <b style={{ color: "#007BFF" }}>List of Events</b>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-condensed table-bordered table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Department</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvents.length > 0 ? (
                        <>
                          {filteredEvents.map((event, index) => (
                            <tr key={index}>
                              <td className="text-center">{index + 1}</td>
                              <td>
                                {event.images && event.images.length > 0 ? (
                                  <img
                                    src={event.images[0]}
                                    alt="Event"
                                    style={{ width: "100px", height: "auto" }}
                                  />
                                ) : (
                                  <span>No Image</span>
                                )}
                              </td>
                              <td>{formatDate(event.date)}</td>
                              <td>{event.name}</td>
                              <td>{CutContent(event.description, 50)}</td>
                              <td>{event.department}</td>
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
                              <td className="text-center justify-content-center border-0 d-flex gap-1">
                                <button
                                  onClick={() =>
                                    handleStatusChange(event._id, "approved")
                                  }
                                  className="btn btn-sm btn-outline-success"
                                  type="button"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusChange(event._id, "rejected")
                                  }
                                  className="btn btn-sm btn-outline-danger"
                                  type="button"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() => delEvent(event._id)}
                                  className="btn btn-sm btn-outline-danger"
                                  type="button"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={9} className="text-center">
                            No Events Available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;

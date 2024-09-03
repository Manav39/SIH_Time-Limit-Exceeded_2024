import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Signup = () => {
  //role, email, name, password, department
  const { t } = useTranslation();
  const signup = t("auth");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    department: "",
    type: "user",
  });
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    //role, email, name, password, department
    axios
      .post("http://localhost:8088/register", values)
      .then((res) => {
        toast.success("Course saved successfully");
        navigate("/login");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer position="top-center" hideProgressBar />
      <header className="masthead">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end mb-4 page-title">
              <h3 className="text-white">{signup["title"]}</h3>
              <hr className="divider my-4" />
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-3 pt-2">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="container col-lg-6 col-md-8 col-sm-10">
                  <form onSubmit={handleSubmit} id="create_account">
                    <div className="form-group">
                      <label htmlFor="name" className="control-label">
                        {signup["name"]}
                      </label>
                      <input
                        onChange={(e) =>
                          setValues({ ...values, name: e.target.value })
                        }
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="control-label">
                        {signup["email"]}
                      </label>
                      <input
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="control-label">
                        {signup["password"]}
                      </label>
                      <input
                        onChange={(e) =>
                          setValues({ ...values, password: e.target.value })
                        }
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="department" className="control-label">
                        {signup["dept"]}
                      </label>
                      <select
                        onChange={(e) =>
                          setValues({ ...values, department: e.target.value })
                        }
                        className="custom-select"
                        id="department"
                        name="department"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Please select
                        </option>
                        <option value="CS">Computer Science</option>
                        <option value="IT">Information Technology</option>
                        <option value="EXTC">
                          Electronics and Telecommunication
                        </option>
                        <option value="MECH">Mechanical</option>
                        <option value="CIVIL">Civil</option>
                        <option value="ET">Electrical</option>
                        <option value="PROD">Production</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="userType" className="control-label">
                        {signup["role"]}
                      </label>
                      <select
                        onChange={(e) =>
                          setValues({ ...values, role: e.target.value })
                        }
                        className="custom-select"
                        id="userType"
                        name="userType"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Please select
                        </option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="department_coordinator">
                          Department Coordinator
                        </option>
                      </select>
                    </div>

                    <hr className="divider" />
                    <div className="row justify-content-center">
                      <div className="col-md-6 text-center">
                        <button
                          type="submit"
                          className="btn btn-info btn-block"
                        >
                          {signup["createAcc"]}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

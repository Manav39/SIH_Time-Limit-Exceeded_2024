import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../AuthContext";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { login } = useAuth();
  const { t } = useTranslation();
  const log = t("auth");
  const [values, setValues] = useState({
    User: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.action === "navtologin") {
      toast.info("Please Login Now");
    }
    return () => {
      location;
    };
  }, [location.state]);

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8088/login", values)
      .then((res) => {
        if (res.data.status === "ok") {
          console.log(res);
          localStorage.setItem("role", values.User);
          localStorage.setItem("userId", res.data.user._id);
          localStorage.setItem("dept", res.data.user.department);
          localStorage.setItem("name", res.data.user.name);
          navigate("/");
          window.location.reload();
          toast.success("Login Successfull");
        }
      })
      .catch((err) => {
        toast.error("Invalid Email or Password or User");
        console.error(err);
        setErrors(err.response.data.message);
      });
  };

  return (
    <>
      <ToastContainer position="top-center" />

      <header className="masthead">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end mb-4 page-title">
              <h3 className="text-white">{log["loginTitle"]}</h3>
              <hr className="divider my-4" />
              <div className="col-md-12 mb-2 justify-content-center"></div>
            </div>
          </div>
        </div>
      </header>
      <div className="container mt-3 pt-2">
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="container-fluid col-lg-6 col-md-8 col-sm-10">
                  <form onSubmit={handleSubmit} id="login-frm">
                    <div className="form-group">
                      <label htmlFor="userType" className="control-label">
                        {log["role"]}
                      </label>
                      <select
                        onChange={(e) =>
                          setValues({ ...values, User: e.target.value })
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
                    <div className="form-group">
                      <label htmlFor="email" className="control-label">
                        {log["email"]}
                      </label>
                      <input
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        type="email"
                        id="email"
                        name="username"
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="control-label">
                        {log["password"]}
                      </label>
                      <input
                        onChange={(e) =>
                          setValues({ ...values, password: e.target.value })
                        }
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="form-control"
                      />
                      <div className="text-danger mt-2">{errors && errors}</div>
                      <small className="mt-2 text-muted ">
                        {log["donthaveaccount"]}{" "}
                        <Link to="/signup">{log["here"]}</Link>
                      </small>
                    </div>
                    <hr className="divider" />
                    <div className="row justify-content-center">
                      <div className="col-md-6 text-center">
                        <button
                          type="submit"
                          className="btn btn-info btn-block"
                        >
                          {log["login"]}
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

export default Login;

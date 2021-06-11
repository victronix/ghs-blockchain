import React, { useContext, createContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../../src/images/child.png";
import Cookies from 'universal-cookie';
import swal from 'sweetalert';


const authContext = createContext();

function useAuth() {
  return useContext(authContext);
}

export default function LoginPage() {

  let user_credentials = {
    username: "",
    password: ""
  }
  const [user, setUser] = useState({
    ...user_credentials
  });

  function handleInputChange(event) {
    var node = document.getElementsByName(event.target.name)[0]; 
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = (e) => {
    e.preventDefault()

    axios.post("http://localhost:3005/authenticate-user",{
      username: user.username,
      password: user.password
    })
    .then(res => {
      const cookies = new Cookies();
      cookies.set('current_user', res.data.data, { path: '/' });
      if(res.data.data.position == 'HOSPITAL'){
        window.location =  "/approved-certs"  
      }else{
        window.location =  "/index"  
      }
    })
    .catch(err => {
      swal({
        title: "Birth Registration",
        text: "Invalid login credentials",
        icon: "error",
      })
    })
  };
  return (
    <div>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>Majestic Admin</title>
      <link
        rel="stylesheet"
        href="../../vendors/mdi/css/materialdesignicons.min.css"
      />
      <link rel="stylesheet" href="../../vendors/base/vendor.bundle.base.css" />
      <link rel="stylesheet" href="../../css/style.css" />
      <link rel="shortcut icon" href="../../images/favicon.png" />
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ height: "40px", width: "40px" }}
                    />
                  </div>
                  <h4>GHS Birth Certification</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <form className="pt-3">
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        id="exampleInputEmail1"
                        placeholder="Username"
                        name="username" onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        name="password" onChange={handleInputChange}
                      />
                    </div>
                    <div className="mt-3">
                      <button
                      onClick={login}
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      >
                        SIGN IN
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

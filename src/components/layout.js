import React, { useContext, createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import { BirthCertificate } from "../abi/abi";
import Web3 from "web3";
import "../../src/css/materialdesignicons.min.css";
import "../../src/css/vendor.bundle.base.css";
import "../../src/css/dataTables.bootstrap4.css";
import "../../src/css/style.css";
import "../../src/css/forms.css";
import logo from "../../src/images/child.png";
import Cookies from 'universal-cookie';

import Registration from "../components/Registration";
import IndexPage from "../components/IndexPage";

export default function Layout({children}) {
    const cookies = new Cookies();
    cookies.get('current_user')

    function NavItem({children, position_name}) {
        console.log(position_name);
        if( cookies.get('current_user').position == position_name){
            return children;
        }else{
            return (<></>)
        }
      }

  return (
    <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    />
    <div>
      <div className="container-scroller">
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="navbar-brand-wrapper d-flex justify-content-center">
            <div className="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
              <a className="navbar-brand brand-logo" href="index.html">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ height: "40px", width: "40px" }}
                />
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  GHS Certification
                </span>
              </a>
              <a
                className="navbar-brand brand-logo-mini"
                href="index.html"
              >
                <img src="images/logo-mini.svg" alt="logo" />
              </a>
              <button
                className="navbar-toggler navbar-toggler align-self-center"
                type="button"
                data-toggle="minimize"
              >
                <span className="mdi mdi-sort-variant" />
              </button>
            </div>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <ul className="navbar-nav mr-lg-4 w-100">
              <li className="nav-item nav-search d-none d-lg-block w-100">
       
              </li>
            </ul>
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item dropdown mr-1">
                <div
                  className="dropdown-menu dropdown-menu-right navbar-dropdown"
                  aria-labelledby="messageDropdown"
                >
                  <p className="mb-0 font-weight-normal float-left dropdown-header">
                    Messages
                  </p>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <img
                        src="images/faces/face4.jpg"
                        alt="image"
                        className="profile-pic"
                      />
                    </div>
                    <div className="item-content flex-grow">
                      <h6 className="ellipsis font-weight-normal">
                        David Grey
                      </h6>
                      <p className="font-weight-light small-text text-muted mb-0">
                        The meeting is cancelled
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <img
                        src="images/faces/face2.jpg"
                        alt="image"
                        className="profile-pic"
                      />
                    </div>
                    <div className="item-content flex-grow">
                      <h6 className="ellipsis font-weight-normal">
                        Tim Cook
                      </h6>
                      <p className="font-weight-light small-text text-muted mb-0">
                        New product launch
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <img
                        src="images/faces/face3.jpg"
                        alt="image"
                        className="profile-pic"
                      />
                    </div>
                    <div className="item-content flex-grow">
                      <h6 className="ellipsis font-weight-normal">
                        {" "}
                        Johnson
                      </h6>
                      <p className="font-weight-light small-text text-muted mb-0">
                        Upcoming board meeting
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown mr-4">
                <div
                  className="dropdown-menu dropdown-menu-right navbar-dropdown"
                  aria-labelledby="notificationDropdown"
                >
                  <p className="mb-0 font-weight-normal float-left dropdown-header">
                    Notifications
                  </p>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <div className="item-icon bg-success">
                        <i className="mdi mdi-information mx-0" />
                      </div>
                    </div>
                    <div className="item-content">
                      <h6 className="font-weight-normal">
                        Application Error
                      </h6>
                      <p className="font-weight-light small-text mb-0 text-muted">
                        Just now
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <div className="item-icon bg-warning">
                        <i className="mdi mdi-settings mx-0" />
                      </div>
                    </div>
                    <div className="item-content">
                      <h6 className="font-weight-normal">Settings</h6>
                      <p className="font-weight-light small-text mb-0 text-muted">
                        Private message
                      </p>
                    </div>
                  </a>
                  <a className="dropdown-item">
                    <div className="item-thumbnail">
                      <div className="item-icon bg-info">
                        <i className="mdi mdi-account-box mx-0" />
                      </div>
                    </div>
                    <div className="item-content">
                      <h6 className="font-weight-normal">
                        New user registration
                      </h6>
                      <p className="font-weight-light small-text mb-0 text-muted">
                        2 days ago
                      </p>
                    </div>
                  </a>
                </div>
              </li>
              <li className="nav-item">
 
                  <span className="nav-profile-name" style={{marginRight: 50, width: '90px'}}><em className="fas fa-user fa-fw"></em> { cookies.get('current_user').username}</span> 
                  <span style={{width: '90px'}}>
                  <Link to="login">
                    <i className="fas fa-sign-out-alt fa-fw text-primary" />
                    Logout
                  </Link>
                    </span>
              </li>
            </ul>
            <button
              className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
              type="button"
              data-toggle="offcanvas"
            >
              <span className="mdi mdi-menu" />
            </button>
          </div>
        </nav>
        {/* partial */}
        <div className="container-fluid page-body-wrapper">
          {/* partial:partials/_sidebar.html */}
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item">

                <NavItem position_name="GHS_CENTER">
                <Link className="nav-link" to="/index">
                  <i className="fas fa-h-square menu-icon" />
                  <span className="menu-title">Notifications</span>
                </Link>
                </NavItem>
              </li>
              <NavItem position_name="HOSPITAL">
              <li className="nav-item">
                <Link className="nav-link" to="/registration">
                  <i className="fas fa-certificate mdi-view-headline menu-icon" />
                  <span className="menu-title">Notification Form</span>
                </Link>
              </li>
              </NavItem>
              <NavItem position_name="HOSPITAL">
              <li className="nav-item">
              <Link className="nav-link" to="approved-certs">
              <i className="fas fa-box mdi-chart-pie menu-icon" />
                  <span className="menu-title">Registration Status</span>
                </Link>
              </li>
              </NavItem>

     
            </ul>
          </nav>
          {/* partial */}
          <div className="main-panel">
            <div className="content-wrapper">
                 {children}
            </div>
            <footer className="footer">
              <div className="d-sm-flex justify-content-center justify-content-sm-between"></div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}


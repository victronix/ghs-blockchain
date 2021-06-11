import React from "react";
import logo from "../../src/images/child.png";

function SideBar(){
    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="index.html">
              <i className="fas fa-h-square menu-icon" />
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="pages/forms/basic_elements.html"
            >
              <i className="fas fa-certificate mdi-view-headline menu-icon" />
              <span className="menu-title">Certificates</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="pages/charts/chartjs.html">
              <i className="fas fa-box mdi-chart-pie menu-icon" />
              <span className="menu-title">Approved Certificates</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="pages/tables/basic-table.html">
              <i className="fas fa-envelope-open-text mdi-grid-large menu-icon" />
              <span className="menu-title">Notifications</span>
            </a>
          </li>
        </ul>
      </nav>
    );
}

export default SideBar;
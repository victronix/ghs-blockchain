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

import Registration from "../components/Registration";
import IndexPage from "../components/IndexPage";
import Layout from "./layout";

export default function Index() {
  return (
    <Layout>
      <IndexPage />
    </Layout>
  );
}

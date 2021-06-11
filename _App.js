import React, { useEffect, useState } from "react";
import { BirthCertificate } from "./abi/abi";
import Web3 from "web3";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Registration from "./components/Registration";



const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0x2E041d3507815dE6a67FAb385E639bF856e5e962";
const storageContract = new web3.eth.Contract(
  BirthCertificate,
  contractAddress
);

function App() {
  const [cert, setBirthCert] = useState("");
  const [birthCertList, setBirthCertList] = useState([]);

  async function fetchData() {
    const certIdCount = await storageContract.methods.certIdCount().call();
    setBirthCertList([]);
    let _lists = [];
    for (let i = 0; i <= certIdCount; i++) {
      _lists.push(await storageContract.methods.certificates(i).call());
    }
    setBirthCertList(_lists);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const addBirthCert = async () => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    let createCertificate = await storageContract.methods
      .createCertificate(cert)
      .send({
        from: account,
      });
    setBirthCertList([
      ...birthCertList,
      // createCertificate.events.CertCreated.returnValues,
    ]);
  };

  const listItems = birthCertList.map((number) => (
    <li key={number.id}>{number.chld_firstname}</li>
  ));

  // return (
  //   <div className="App">
  //     <input onChange={(e) => setBirthCert(e.target.value)} />
  //     <button onClick={addBirthCert}>Save Task</button>
  //     <ul>{listItems}</ul>
  //   </div>
  // );
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home(){
  return <div>Home</div>;
}


export default App;

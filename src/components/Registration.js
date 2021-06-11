import React, { useEffect, useState } from "react";
import { BirthCertificate } from "../abi/abi";
import axios from "axios";
import swal from "sweetalert";
import Web3 from "web3";
import Layout from "../components/layout";
import Countries from "./_countries";

const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0x2E041d3507815dE6a67FAb385E639bF856e5e962";
const storageContract = new web3.eth.Contract(
  BirthCertificate,
  contractAddress
);

const Registration = () => {
  let _birthKeys = {
    chld_name: "",
    chld_gender: "",
    fth_name: "",
    fth_nationality: "",
    fth_occupation: "",
    fth_religion: "",
    moth_name: "",
    moth_nationality: "",
    when_born: "",
    where_born: "",
    infrm_name: "",
    infrm_nationality: "",
    infrm_relationship: ""
  };
  const [birthCert, setBirthCert] = useState({
    ..._birthKeys,
  });

  useEffect(() => {}, []);

  function hasEmptyFields(object) {
    let has_empty = false;
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if (!element) {
          has_empty = true;
        }
      }
    }
    return has_empty;
  }

  const addBirthCert = async (e) => {
    e.preventDefault();

    for (const key in birthCert) {
      if (birthCert.hasOwnProperty.call(birthCert, key)) {
        const cert = birthCert[key];
        if (!cert) {
          var text_node = document.createElement("span");
          text_node.classList.add("error");
          text_node.innerHTML = "This field is required";
          var node = document.getElementsByName(key)[0];
          node.parentNode.appendChild(text_node);
        }
      }
    }

    if (hasEmptyFields(birthCert)) {
      return;
    }

    let _timestamp = Date.now().toString();
    let _birthCert = {
      ...birthCert,
      created_at: new Date().toISOString(),
    };
    const accounts = await window.ethereum.enable();
    const account = accounts[0];

    axios
      .post("http://localhost:3005/create-offshore", {
        registration: JSON.stringify(_birthCert),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    let createCertificate = await storageContract.methods
      .createCertificate(JSON.stringify(_birthCert), _timestamp)
      .send({
        from: account,
      });
    if (createCertificate.events.CertCreated.returnValues.id) {
      swal({
        title: "Birth Registration",
        text: "Registration successful",
        icon: "success",
      }).then(() => {
        console.log(1212);
        window.location.reload();
      });
    }
  };

  function handleBirthChange(event) {
    var node = document.getElementsByName(event.target.name)[0];
    let _node = node.parentNode.querySelectorAll(".error")[0];
    if (_node) {
      node.parentNode.removeChild(_node);
    }
    setBirthCert({
      ...birthCert,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <Layout>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.16.6/dist/sweetalert2.all.min.js"></script>
      <div className="col-md-11">
        <div className="mr-md-3 mr-xl-5">
          <h2>Birth Notification</h2>
          <hr />
        </div>
        <div className="card">
          <div className="card-body">
            <div style={style.headerTop}>
              <form>
                <h5>CHILD INFORMATION</h5>
                <hr />
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="control-label">Child Name</label>
                      <input
                        name="chld_name"
                        onChange={handleBirthChange}
                        type="input"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="control-label">Sex</label>
                      <select
                        name="chld_gender"
                        onChange={handleBirthChange}
                        className="form-control"
                      >
                        <option selected disabled>
                          --- Select an option ---
                        </option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <h5>FATHER INFORMATION</h5>
                <hr />
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="control-label">Father's Name</label>
                      <input
                        name="fth_name"
                        onChange={handleBirthChange}
                        type="input"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="control-label">Nationality</label>
                      <select
                        name="fth_nationality"
                        onChange={handleBirthChange}
                        type="input"
                        className="form-control"
                      >
                        <Countries />
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label">Occupation</label>
                      <input
                        name="fth_occupation"
                        onChange={handleBirthChange}
                        type="input"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="control-label">Religion</label>
                      <input
                        name="fth_religion"
                        onChange={handleBirthChange}
                        type="input"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <h5>MOTHER INFORMATION</h5>
                <hr />
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label className="control-label">Mother's Name</label>
                      <input
                        name="moth_name"
                        onChange={handleBirthChange}
                        type="input"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="control-label">Nationality</label>
                      <select
                        name="moth_nationality"
                        onChange={handleBirthChange}
                        type="input"
                        className="form-control"
                      >
                        <Countries />
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <h5>
                  WHEN BORN{" "}
                  <span style={style.whenBorn}>(Write address in full)</span>
                </h5>
                <hr />
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <input
                        name="when_born"
                        onChange={handleBirthChange}
                        type="date"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <h5>WHERE BORN</h5>
                <hr />
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <textarea
                        name="where_born"
                        onChange={handleBirthChange}
                        className="form-control"
                        cols="10"
                        rows="5"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <h5>
                  INFORMANT{" "}
                  <span style={style.whenBorn}>
                    (Name in full. Relationship to the child, if any)
                  </span>
                </h5>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label">Fullname</label>
                      <input
                        name="infrm_name"
                        onChange={handleBirthChange}
                        type="input"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="control-label">Nationality</label>
                      <select
                        name="infrm_nationality"
                        onChange={handleBirthChange}
                        type="input"
                        className="form-control"
                      >
                        <Countries />
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label className="control-label">Relationship</label>
                      <input
                        name="infrm_relationship"
                        onChange={handleBirthChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <button
                        onClick={addBirthCert}
                        className="btn btn-primary"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const style = {
  headerTop: {
    marginTop: "50px",
  },
  whenBorn: {
    fontSize: "12px",
  },
};

export default Registration;

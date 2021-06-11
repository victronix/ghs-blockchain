import React, { useEffect, useState } from "react";
import { BirthCertificate } from "../abi/abi";
import { Modal, Button, Form } from "react-bootstrap";
import Web3 from "web3";
import swal from "sweetalert";
import moment from "moment";

const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0x2E041d3507815dE6a67FAb385E639bF856e5e962";
const storageContract = new web3.eth.Contract(
  BirthCertificate,
  contractAddress
);

export default function IndexPage() {
  const [birthCertList, setBirthCertList] = useState([]);
  const [lastEntryDate, setLastEntryDate] = useState("");

  async function fetchData() {
    const certIdCount = await storageContract.methods.certIdCount().call();
    setBirthCertList([]);
    let _lists = [];
    for (let i = 0; i <= certIdCount; i++) {
      let _result = await storageContract.methods.certificates(i).call();
      if (_result.serialized_reg) {
        let _cert = JSON.parse(_result.serialized_reg);
        _cert["id"] = _result.id;
        _cert["timestamp"] = _result.timestamp;
        _cert["is_verified"] = _result.is_verified;
        _lists.push(_cert);
      }
    }
    if(_lists.length){
      if(_lists[_lists.length - 1].created_at){
        setLastEntryDate(moment(_lists[0].created_at).format('YYYY-MM-DD HH:mm:ss').toString())
      }
    }
    setBirthCertList(_lists);
  }

  useEffect(() => {
    fetchData();
    console.log(birthCertList);
  }, []);

  const [tmstamp, setTmstamp] = useState({
    tmstamp: "",
  });
  function handleInputChange(event) {
    setTmstamp({
      ...tmstamp,
      [event.target.name]: event.target.value,
    });
  }

  const [show, setShow] = useState(false);
  const [birthCertInfo, setBirthCertInfo] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (cert) => {
    setShow(true);
    setBirthCertInfo({
      ...birthCertInfo,
      ...cert,
    });
  };

  const attemptValidation = async () => {
    let _certByTmp = birthCertList.filter(
      (cert) => cert.timestamp == tmstamp.tmstamp.replace(/\s+/g, "")
    );
    if (!_certByTmp.length) {
      swal({
        title: "Birth Verification",
        text: "Provided timestamp cannot be verified",
        icon: "error",
      });
    } else {
      const accounts = await window.ethereum.enable();
      const account = accounts[0];
      let toggleValidate = await storageContract.methods
        .toggleValidate(parseInt(_certByTmp[0].id))
        .send({
          from: account,
        });
      if (toggleValidate.events.certVerified.returnValues.id) {
        swal({
          title: "Birth Certification",
          text: "Verification of birh registration successful",
          icon: "success",
        }).then(() => {
          console.log(1212);
          window.location.reload();
        });
      }
    }
  };

  return (
    <div>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10.16.6/dist/sweetalert2.all.min.js"></script>

      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verification Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-10">
              <div className="form-group">
                <label>Timestamp</label>
                <input
                  name="tmstamp"
                  onChange={handleInputChange}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <button onClick={attemptValidation} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-end flex-wrap">
              <div className="mr-md-3 mr-xl-5">
                <h2>Notifications Dashboard</h2>
                <p className="mb-md-0">
                  GHS notifications verifications and approvals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body dashboard-tabs p-0">
              <ul className="nav nav-tabs px-4" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="overview-tab"
                    data-toggle="tab"
                    href="#overview"
                    role="tab"
                    aria-controls="overview"
                    aria-selected="true"
                  >
                    Overview
                  </a>
                </li>
              </ul>
              <div className="tab-content py-0 px-0">
                <div
                  className="tab-pane fade show active"
                  id="overview"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                >
                  <div className="d-flex flex-wrap justify-content-xl-between">
                  <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                      <i className="fas fa-calendar mr-3 icon-lg text-info" />
                      <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">
                          Last Entry Date & Time
                        </small>
                        <h5 className="mr-2 mb-0">{lastEntryDate}</h5>
                      </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                      <i className="fas fa-users mr-3 icon-lg" />
                      <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">
                          Total Registrations
                        </small>
                        <h5 className="mr-2 mb-0">{birthCertList.length}</h5>
                      </div>
                    </div>
                    <div className="d-flex border-md-right flex-grow-1 align-items-center justify-content-center p-3 item">
                      <i className="fas fa-user mr-3 icon-lg text-success" />
                      <div className="d-flex flex-column justify-content-around">
                        <small className="mb-1 text-muted">
                          Total Approved
                        </small>
                        <h5 className="mr-2 mb-0"></h5>
                        {
                          birthCertList.filter(
                            (cert) => cert.is_verified == true
                          ).length
                        }
                      </div>
                    </div>
                    <div className="d-flex py-3 flex-grow-1 align-items-center justify-content-center p-3 item"></div>
                    <div className="d-flex py-3 flex-grow-1 align-items-center justify-content-center p-3 item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 stretch-card">
          <div className="card">
            <div className="card-body">
              <p className="card-title">Recent Registrations</p>
              <div className="table-responsive">
                <table id="recent-purchases-listing" className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Mother Name</th>
                      <th>Child Name</th>
                      <th>Institution</th>
                      <th>Issue Date</th>
                      <th>DOB</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {birthCertList.map((cert) => (
                      <tr key={cert.id}>
                        <td>{cert.id}</td>
                        <td>{cert.moth_name}</td>
                        <td>{cert.chld_name}</td>
                        <td>{cert.where_born}</td>
                        <td>{moment(cert.created_at).format('YYYY-MM-DD HH:mm').toString()}</td>
                        <td>{cert.when_born}</td>
                        <td>
                          {cert.is_verified != true ? (
                            <button
                              onClick={() => handleShow(cert)}
                              className="btn btn-sm btn-info"
                            >
                              Verify
                            </button>
                          ) : (
                            <span className="badge badge-success">VERIFIED</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

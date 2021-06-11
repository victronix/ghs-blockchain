import React, { useEffect, useState } from "react";
import { BirthCertificate } from "../abi/abi";
import Web3 from "web3";
import Layout from "./layout";
import { Modal, Button, Form } from "react-bootstrap";
import Cookies from 'universal-cookie';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import moment from "moment";


const web3 = new Web3(Web3.givenProvider);

const contractAddress = "0x2E041d3507815dE6a67FAb385E639bF856e5e962";
const storageContract = new web3.eth.Contract(
  BirthCertificate,
  contractAddress
);

export default function IndexPage() {
  const cookies = new Cookies();
  let current_user = cookies.get('current_user')
  const [birthCertList, setBirthCertList] = useState([]);

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
    setBirthCertList(_lists);
  }

  useEffect(() => {
    fetchData();
    console.log(birthCertList);
  }, []);

  const CertReport = () => {
    return (
      <table id="report_table" style={{ width: "100%", fontSize: "14px" }} border={1}>
      <tbody>
        <tr>
          <td style={{ padding: 10 }} colSpan={5}>
            Entry No.
            {birthCertInfo.id}
          </td>
          <td style={{ padding: 10 }} colSpan={10}>
            Registry
          </td>
        </tr>
        <tr>
          <td
            colSpan={3}
            rowSpan={2}
            style={{ width: "25%", padding: 10 }}
          >
            CHILDS's NAME
            <br />
            Name in full, Write first names first and surname last
          </td>
          <td
            style={{ padding: 10, width: "60%" }}
            colSpan={10}
            rowSpan={2}
          >
            {birthCertInfo.chld_name}
          </td>
          <td style={{ padding: 10 }} colSpan={2}>
            Sex
          </td>
        </tr>
        <tr>
          <td style={{ padding: 10 }} colSpan={2}>
            {birthCertInfo.chld_gender}
          </td>
        </tr>
        <tr>
          <td style={{ padding: 10 }} colSpan={3} rowSpan={4}>
            FATHER
          </td>
          <td colSpan={2} style={{ padding: 10, width: "10%" }}>
            Name
          </td>
          <td colSpan={10} style={{padding: 10}}>
            {birthCertInfo.fth_name}
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ padding: 10 }}>
            Occupation
          </td>
          <td colSpan={10} style={{ padding: 10 }}>
          {birthCertInfo.fth_occupation}
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ padding: 10 }}>
            Nationality
          </td>
          <td colSpan={10} style={{ padding: 10 }}>
          {birthCertInfo.fth_nationality}
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ padding: 10 }}>
            Religion
          </td>
          <td colSpan={10} style={{ padding: 10 }}>
          {birthCertInfo.fth_religion}
          </td>
        </tr>
        <tr>
          <td colSpan={3} rowSpan={2} style={{ padding: 10 }}>
            MOTHER
          </td>
          <td colSpan={2} style={{ padding: 10 }}>
            Maiden Name
          </td>
          <td colSpan={10} style={{ padding: 10 }}>
          {birthCertInfo.moth_name}
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{ padding: 10 }}>
          {birthCertInfo.moth_nationality}
          </td>
          <td colSpan={10} style={{ padding: 10 }}>
            GHANA
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ padding: 10 }}>
            When Born
          </td>
          <td colSpan={12} style={{ padding: 10 }}>
          {birthCertInfo.when_born}
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ padding: 20 }}>
            Where Born
            <br />
            (Write address in full)
          </td>
          <td colSpan={12} style={{ padding: 20 }}>
          {birthCertInfo.where_born}
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ padding: 10 }}>
            INFORMANT
          </td>
          <td colSpan={12} style={{ padding: 20 }}>
          {birthCertInfo.infrm_name}
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ padding: 10 }}>
            Date of Registration
          </td>
          <td colSpan={12} style={{ padding: 10 }}>
          {birthCertInfo.created_at}
          </td>
        </tr>
        <tr>
          <td colSpan={3} style={{ padding: 10 }}>
          Signature of Registrar
          </td>
          <td colSpan={12} style={{padding: 10}}>
            {current_user.username}
          </td>
        </tr>
      </tbody>
    </table>
    )
  }

  const print = () => {
    const divToDisplay = document.getElementById('report_table')
    html2canvas(divToDisplay).then(function(canvas) {
         const divImage = canvas.toDataURL("image/png");
         const pdf = new jsPDF();
        pdf.addImage(divImage, 'PNG', 0, 0);
        pdf.save(`cert_${birthCertInfo.timestamp}.pdf`);
    })
  };


  const [show, setShow] = useState(false);
  const [birthCertInfo, setBirthCertInfo] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (cert) => {
    setShow(true)
    setBirthCertInfo({
      ...birthCertInfo,
      ...cert
    })
  };

  const onLoginFormSubmit = (e) => {
    e.preventDefault();
    handleClose();
  };

  return (
    <Layout>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <button className="btn btn-sm btn-primary" style={{float: "right"}} onClick={print}>Download</button>
        </Modal.Header>
        <Modal.Body>
          <CertReport/>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="d-flex justify-content-between flex-wrap">
              <div className="d-flex align-items-end flex-wrap">
                <div className="mr-md-3 mr-xl-5">
                  <h2>All birth certificates</h2>
                  <p className="mb-md-0">Most recent brith registrations.</p>
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
                        <th>Timestamp</th>
                        <th>Mother Name</th>
                        <th>Child Name</th>
                        <th>Institution</th>
                        <th>Issue Date</th>
                        <th>DOB</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {birthCertList.map((cert) => (
                        <tr key={cert.id}>
                          <td>{cert.id}</td>
                          <td>{cert.timestamp}</td>
                          <td>{cert.moth_name}</td>
                          <td>{cert.chld_name}</td>
                          <td>{cert.where_born}</td>
                          <td>{moment(cert.created_at).format('YYYY-MM-DD HH:mm').toString()}</td>
                          <td>{cert.when_born}</td>
                          <td>
                            <span
                              className={
                                cert.is_verified
                                  ? "badge badge-success"
                                  : "badge badge-warning"
                              }
                            >
                              {cert.is_verified ? "APPROVED" : "PENDING"}
                            </span>{" "}
                          </td>
                          <td>
                            <button
                              onClick={() => handleShow(cert)}
                              className="btn btn-sm btn-info"
                            >
                              DOWNLOAD PDF
                            </button>
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
    </Layout>
  );
}

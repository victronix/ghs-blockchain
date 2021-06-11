pragma solidity ^0.5.0;

contract BirthCertificate {
  uint public certIdCount = 0;

  struct Certificate {
    uint id;
    string serialized_reg;
    bool is_verified;
    string timestamp;
  }

  mapping(uint => Certificate) public certificates;

  event CertCreated(
    uint id,
    string serialized_reg
    // string chld_lastname,
  );

    event certVerified(
    uint id,
    bool is_verified
  );

  constructor() public {
    // createCertificate('{"chld_lastname":"wooten"}');
  }

  function createCertificate(string memory _serialized_reg, string memory _timestamp) public {
    certIdCount ++;
    certificates[certIdCount] = Certificate(certIdCount, _serialized_reg, false, _timestamp);
    emit CertCreated(certIdCount, _serialized_reg);
  }

  function toggleValidate(uint _id) public {
    Certificate memory _cert = certificates[_id];
    _cert.is_verified = true;
    certificates[_id] = _cert;
    emit certVerified(_id, _cert.is_verified);
  }

}

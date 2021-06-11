var BrithCertificate = artifacts.require("./BirthCertificate.sol");

module.exports = function(deployer) {
  deployer.deploy(BrithCertificate);
};

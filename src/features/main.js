import React from "react";

function Main() {
  return (
    <>
        <h2 id="kategoribaslık">Dashboard</h2>

      <div className="kategoriler">
        <div className="kategori">
          <h3>All Birth Certificates</h3>
          <img src="https://i.hizliresim.com/aFpAJC.png" alt="" />
        </div>
        <div className="kategori">
          <h4>Total Male</h4>
          <img src="https://i.hizliresim.com/xGSA1N.png" alt="" />
        </div>
        <div className="kategori">
          <h4>Total Female</h4>
          <img src="https://i.hizliresim.com/FKef5E.png" alt="" />
        </div>
      </div>
      <div className="product">
        <div className="baslik">
          <h2>Latest registration</h2>
        </div>
      </div>
    </>
  );
}

export default Main;
